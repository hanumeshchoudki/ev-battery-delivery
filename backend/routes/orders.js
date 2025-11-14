/**
 * Order Routes
 * Handles battery recharge order operations
 */

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { authenticateToken, requireUser } = require('../middleware/auth');

// =====================================================
// POST /api/orders
// Create a new battery recharge order
// =====================================================
router.post('/', authenticateToken, requireUser, async (req, res) => {
  try {
    const {
      current_location,
      latitude,
      longitude,
      battery_type = 'standard',
      vehicle_model,
      charge_level = '0-20%',
      amount = 0
    } = req.body;

    // Validation
    if (!current_location || !latitude || !longitude) {
      return res.status(400).json({
        error: 'Location details (current_location, latitude, longitude) are required'
      });
    }

    // Create order
    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: req.user.id,
          current_location,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          battery_type,
          vehicle_model,
          charge_level,
          amount: parseFloat(amount),
          status: 'pending',
          payment_status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Order creation error:', error);
      return res.status(500).json({
        error: 'Failed to create order',
        details: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/orders/:id
// Get single order details
// =====================================================
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch order with related data
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        user:users!orders_user_id_fkey(id, name, phone, email),
        agent:delivery_agents!orders_assigned_to_fkey(
          id,
          vehicle_number,
          vehicle_type,
          current_latitude,
          current_longitude,
          user:users!delivery_agents_user_id_fkey(id, name, phone)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Authorization: Users can only see their own orders (admins can see all)
    if (req.user.role !== 'admin' && req.user.role !== 'agent' && order.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      success: true,
      order
    });

  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// GET /api/orders/user/:userId
// Get all orders for a specific user
// =====================================================
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Authorization: Users can only see their own orders
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        agent:delivery_agents!orders_assigned_to_fkey(
          id,
          vehicle_number,
          user:users!delivery_agents_user_id_fkey(name, phone)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    res.json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// PUT /api/orders/:id/status
// Update order status (for agents)
// =====================================================
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'assigned', 'en_route', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Fetch current order
    const { data: currentOrder } = await supabase
      .from('orders')
      .select('*, assigned_to')
      .eq('id', id)
      .single();

    if (!currentOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Authorization: Only admin or assigned agent can update status
    let canUpdate = req.user.role === 'admin';
    
    if (req.user.role === 'agent' && currentOrder.assigned_to) {
      // Check if this agent is assigned to the order
      const { data: agent } = await supabase
        .from('delivery_agents')
        .select('id')
        .eq('user_id', req.user.id)
        .eq('id', currentOrder.assigned_to)
        .single();
      
      canUpdate = !!agent;
    }

    if (!canUpdate) {
      return res.status(403).json({ 
        error: 'Only admins or assigned agents can update order status' 
      });
    }

    // Update order status
    const updateData = { status };
    
    // Set completed_at timestamp when delivered
    if (status === 'delivered') {
      updateData.completed_at = new Date().toISOString();
      updateData.payment_status = 'paid'; // Auto-complete payment
    }

    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: 'Failed to update order' });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });

  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// DELETE /api/orders/:id
// Cancel an order (user or admin only)
// =====================================================
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch order
    const { data: order } = await supabase
      .from('orders')
      .select('user_id, status')
      .eq('id', id)
      .single();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Authorization: Only order owner or admin can cancel
    if (req.user.role !== 'admin' && req.user.id !== order.user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Don't allow cancellation of delivered orders
    if (order.status === 'delivered') {
      return res.status(400).json({ 
        error: 'Cannot cancel a delivered order' 
      });
    }

    // Update status to cancelled instead of deleting
    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to cancel order' });
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });

  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
