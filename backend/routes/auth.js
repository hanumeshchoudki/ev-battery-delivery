/**
 * Authentication Routes
 * Handles user signup, login, and token management
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// =====================================================
// POST /api/auth/signup
// Register a new user
// =====================================================
router.post('/signup', async (req, res) => {
  try {
    const { username, password, name, phone, email, role = 'user' } = req.body;

    // Validation
    if (!username || !password || !name) {
      return res.status(400).json({ 
        error: 'Username, password, and name are required' 
      });
    }

    // Validate role
    const validRoles = ['user', 'admin', 'agent'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        error: 'Invalid role. Must be: user, admin, or agent' 
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Username already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user in database
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          password_hash,
          name,
          phone,
          email,
          role
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Failed to create user',
        details: error.message 
      });
    }

    // If registering as agent, create delivery_agents entry
    if (role === 'agent' && req.body.vehicle_number) {
      const { error: agentError } = await supabase
        .from('delivery_agents')
        .insert([
          {
            user_id: newUser.id,
            vehicle_number: req.body.vehicle_number,
            vehicle_type: req.body.vehicle_type || 'motorcycle',
            active: true
          }
        ]);

      if (agentError) {
        console.error('Agent creation error:', agentError);
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        username: newUser.username,
        role: newUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Return user data (without password hash) and token
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        role: newUser.role,
        created_at: newUser.created_at
      },
      token
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
});

// =====================================================
// POST /api/auth/login
// Authenticate user and return JWT token
// =====================================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    // Find user by username
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ 
        error: 'Invalid username or password' 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid username or password' 
      });
    }

    // If user is an agent, fetch agent details
    let agentDetails = null;
    if (user.role === 'agent') {
      const { data: agent } = await supabase
        .from('delivery_agents')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      agentDetails = agent;
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Return user data and token
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        agentDetails: agentDetails
      },
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
});

// =====================================================
// GET /api/auth/me
// Get current user details (requires authentication)
// =====================================================
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, name, phone, email, role, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If agent, include agent details
    if (user.role === 'agent') {
      const { data: agent } = await supabase
        .from('delivery_agents')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      user.agentDetails = agent;
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// POST /api/auth/refresh
// Refresh JWT token (optional - for token renewal)
// =====================================================
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    // Generate new token with same payload
    const token = jwt.sign(
      { 
        userId: req.user.id, 
        username: req.user.username,
        role: req.user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      token
    });
  } catch (err) {
    console.error('Token refresh error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
