/**
 * Admin Routes
 * Admin-only endpoints for managing orders and agents
 */

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/orders', async (req, res) => {
  try {
    const { status, user_id, agent_id, limit = 100, offset = 0 } = req.query;

    let query = supabase
      .from('orders')
      .select(`
        *,
        user:users!orders_user_id_fkey(id, name, phone, email),
        agent:delivery_agents!orders_assigned_to_fkey(
          id,
          vehicle_number,
          vehicle_type,
          user:users!delivery_agents_user_id_fkey(id, name, phone)
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) query = query.eq('status', status);
    if (user_id) query = query.eq('user_id', user_id);
    if (agent_id) query = query.eq('assigned_to', agent_id);

    const { data: orders, error, count } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    res.json({
      success: true,
      count: count,
      orders: orders || []
    });

  } catch (err) {
    console.error('Admin orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// PUT /api/admin/orders/:id/assign
// Assign delivery agent to an order
// =====================================================
router.put('/orders/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { agent_id } = req.body;

    if (!agent_id) {
      return res.status(400).json({ error: 'agent_id is required' });
    }

    // Verify agent exists and is active
    const { data: agent, error: agentError } = await supabase
      .from('delivery_agents')
      .select('id, active')
      .eq('id', agent_id)
      .single();

    if (agentError || !agent) {
      return res.status(404).json({ error: 'Delivery agent not found' });
    }

    if (!agent.active) {
      return res.status(400).json({ error: 'Agent is not active' });
    }

    // Update order
    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({
        assigned_to: agent_id,
        status: 'assigned',
        assigned_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        agent:delivery_agents!orders_assigned_to_fkey(
          id,
          vehicle_number,
          user:users!delivery_agents_user_id_fkey(name, phone)
        )
      `)
      .single();

    if (error) {
      console.error('Error assigning agent:', error);
      return res.status(500).json({ error: 'Failed to assign agent' });
    }

    res.json({
      success: true,
      message: 'Agent assigned successfully',
      order: updatedOrder
    });

  } catch (err) {
    console.error('Agent assignment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/admin/analytics
// Get dashboard analytics
// =====================================================
router.get('/analytics', async (req, res) => {
  try {
    // Total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // Orders by status
    const { data: statusCounts } = await supabase
      .from('orders')
      .select('status')
      .then(({ data }) => {
        const counts = {};
        data?.forEach(order => {
          counts[order.status] = (counts[order.status] || 0) + 1;
        });
        return { data: counts };
      });

    // Total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'user');

    // Total agents
    const { count: totalAgents } = await supabase
      .from('delivery_agents')
      .select('*', { count: 'exact', head: true });

    // Active agents
    const { count: activeAgents } = await supabase
      .from('delivery_agents')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    // Revenue (sum of completed orders)
    const { data: revenueData } = await supabase
      .from('orders')
      .select('amount')
      .eq('status', 'delivered');

    const totalRevenue = revenueData?.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0) || 0;

    // Recent orders (last 10)
    const { data: recentOrders } = await supabase
      .from('orders')
      .select(`
        *,
        user:users!orders_user_id_fkey(name),
        agent:delivery_agents!orders_assigned_to_fkey(
          vehicle_number,
          user:users!delivery_agents_user_id_fkey(name)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    res.json({
      success: true,
      analytics: {
        totalOrders,
        totalUsers,
        totalAgents,
        activeAgents,
        totalRevenue,
        ordersByStatus: statusCounts || {},
        recentOrders: recentOrders || []
      }
    });

  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/admin/users
// Get all users with filters
// =====================================================
router.get('/users', async (req, res) => {
  try {
    const { role, limit = 100, offset = 0 } = req.query;

    let query = supabase
      .from('users')
      .select('id, username, name, phone, email, role, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (role) query = query.eq('role', role);

    const { data: users, error, count } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    res.json({
      success: true,
      count,
      users: users || []
    });

  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// DELETE /api/admin/users/:id
// Delete a user (soft delete by deactivating)
// =====================================================
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow deleting admin accounts
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', id)
      .single();

    if (user?.role === 'admin') {
      return res.status(403).json({ 
        error: 'Cannot delete admin accounts' 
      });
    }

    // Delete user (cascade will handle related records)
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
