/**
 * Delivery Agent Routes
 * Endpoints for delivery agents to manage their orders
 */

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { authenticateToken, requireAgent } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// =====================================================
// GET /api/agents
// Get all available delivery agents (for admin assignment)
// =====================================================
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { active } = req.query;

    let query = supabase
      .from('delivery_agents')
      .select(`
        *,
        user:users!delivery_agents_user_id_fkey(id, name, phone, email)
      `)
      .order('created_at', { ascending: false });

    if (active !== undefined) {
      query = query.eq('active', active === 'true');
    }

    const { data: agents, error } = await query;

    if (error) {
      console.error('Error fetching agents:', error);
      return res.status(500).json({ error: 'Failed to fetch agents' });
    }

    // Get order counts for each agent
    const agentsWithStats = await Promise.all(
      agents.map(async (agent) => {
        const { count: totalOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('assigned_to', agent.id);

        const { count: activeOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('assigned_to', agent.id)
          .in('status', ['assigned', 'en_route']);

        return {
          ...agent,
          stats: {
            totalOrders: totalOrders || 0,
            activeOrders: activeOrders || 0
          }
        };
      })
    );

    res.json({
      success: true,
      count: agentsWithStats.length,
      agents: agentsWithStats
    });

  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// POST /api/agents/create
// Create a new delivery agent (admin only)
// =====================================================
router.post('/create', authenticateToken, async (req, res) => {
  try {
    // Only admins can create agents
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Only admins can create delivery agents' 
      });
    }

    const {
      username,
      password,
      name,
      phone,
      email,
      vehicle_number,
      vehicle_type = 'motorcycle'
    } = req.body;

    // Validation
    if (!username || !password || !name || !vehicle_number) {
      return res.status(400).json({
        error: 'Username, password, name, and vehicle_number are required'
      });
    }

    // Check if username exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user account
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([
        {
          username,
          password_hash,
          name,
          phone,
          email,
          role: 'agent'
        }
      ])
      .select()
      .single();

    if (userError) {
      console.error('User creation error:', userError);
      return res.status(500).json({ error: 'Failed to create agent user' });
    }

    // Create delivery agent profile
    const { data: agent, error: agentError } = await supabase
      .from('delivery_agents')
      .insert([
        {
          user_id: newUser.id,
          vehicle_number,
          vehicle_type,
          active: true
        }
      ])
      .select()
      .single();

    if (agentError) {
      // Rollback user creation if agent creation fails
      await supabase.from('users').delete().eq('id', newUser.id);
      console.error('Agent creation error:', agentError);
      return res.status(500).json({ error: 'Failed to create delivery agent' });
    }

    res.status(201).json({
      success: true,
      message: 'Delivery agent created successfully',
      agent: {
        ...agent,
        user: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email
        }
      }
    });

  } catch (err) {
    console.error('Agent creation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/agents/my-orders
// Get orders assigned to the authenticated agent
// =====================================================
router.get('/my-orders', authenticateToken, requireAgent, async (req, res) => {
  try {
    const { status } = req.query;

    // Get agent ID for current user
    const { data: agent } = await supabase
      .from('delivery_agents')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!agent) {
      return res.status(404).json({ error: 'Agent profile not found' });
    }

    let query = supabase
      .from('orders')
      .select(`
        *,
        user:users!orders_user_id_fkey(id, name, phone)
      `)
      .eq('assigned_to', agent.id)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching agent orders:', error);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    res.json({
      success: true,
      count: orders.length,
      orders: orders || []
    });

  } catch (err) {
    console.error('Error fetching agent orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// PUT /api/agents/location
// Update agent's current location
// =====================================================
router.put('/location', authenticateToken, requireAgent, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      });
    }

    // Update agent location
    const { data: agent, error } = await supabase
      .from('delivery_agents')
      .update({
        current_latitude: parseFloat(latitude),
        current_longitude: parseFloat(longitude)
      })
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      console.error('Location update error:', error);
      return res.status(500).json({ error: 'Failed to update location' });
    }

    res.json({
      success: true,
      message: 'Location updated successfully',
      agent
    });

  } catch (err) {
    console.error('Location update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// PUT /api/agents/status
// Toggle agent active/inactive status
// =====================================================
router.put('/status', authenticateToken, requireAgent, async (req, res) => {
  try {
    const { active } = req.body;

    if (typeof active !== 'boolean') {
      return res.status(400).json({ error: 'active must be a boolean' });
    }

    const { data: agent, error } = await supabase
      .from('delivery_agents')
      .update({ active })
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update status' });
    }

    res.json({
      success: true,
      message: `Agent is now ${active ? 'active' : 'inactive'}`,
      agent
    });

  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/agents/stats
// Get agent statistics
// =====================================================
router.get('/stats', authenticateToken, requireAgent, async (req, res) => {
  try {
    // Get agent ID
    const { data: agent } = await supabase
      .from('delivery_agents')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!agent) {
      return res.status(404).json({ error: 'Agent profile not found' });
    }

    // Total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('assigned_to', agent.id);

    // Completed orders
    const { count: completedOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('assigned_to', agent.id)
      .eq('status', 'delivered');

    // Active orders
    const { count: activeOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('assigned_to', agent.id)
      .in('status', ['assigned', 'en_route']);

    // Total earnings
    const { data: earnings } = await supabase
      .from('orders')
      .select('amount')
      .eq('assigned_to', agent.id)
      .eq('status', 'delivered');

    const totalEarnings = earnings?.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0) || 0;

    res.json({
      success: true,
      stats: {
        totalOrders: totalOrders || 0,
        completedOrders: completedOrders || 0,
        activeOrders: activeOrders || 0,
        totalEarnings
      }
    });

  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
