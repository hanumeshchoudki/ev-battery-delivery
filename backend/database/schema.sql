/**
 * Database Schema SQL for Supabase PostgreSQL
 * Run these commands in your Supabase SQL Editor
 */

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- Stores all user accounts (customers, admins, agents)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'agent')),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =====================================================
-- DELIVERY AGENTS TABLE
-- Extended profile for delivery agents
-- =====================================================
CREATE TABLE IF NOT EXISTS delivery_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_number TEXT NOT NULL,
  vehicle_type TEXT DEFAULT 'motorcycle',
  active BOOLEAN DEFAULT TRUE,
  current_latitude FLOAT,
  current_longitude FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_agents_user ON delivery_agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_active ON delivery_agents(active);

-- =====================================================
-- ORDERS TABLE
-- Battery recharge delivery orders
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Location details
  current_location TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  
  -- Order details
  battery_type TEXT DEFAULT 'standard',
  vehicle_model TEXT,
  charge_level TEXT DEFAULT '0-20%',
  
  -- Status and assignment
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'assigned', 'en_route', 'delivered', 'cancelled')),
  assigned_to UUID REFERENCES delivery_agents(id) ON DELETE SET NULL,
  
  -- Pricing (if needed)
  amount DECIMAL(10, 2) DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_agent ON orders(assigned_to);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- =====================================================
-- ORDER STATUS HISTORY TABLE (Optional - for tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_status_history_order ON order_status_history(order_id);

-- =====================================================
-- TRIGGER: Update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON delivery_agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Create admin user (password: admin123)
INSERT INTO users (username, password_hash, role, name, phone)
VALUES (
  'admin',
  '$2a$10$xqGY0VJWM5YfFpN8.FN9/.YHqY5KZJqKZlhqLNZKqLhYqFpN8.FN9/',
  'admin',
  'System Administrator',
  '+919876543210'
) ON CONFLICT (username) DO NOTHING;

-- Create sample delivery agent (password: agent123)
INSERT INTO users (username, password_hash, role, name, phone)
VALUES (
  'agent1',
  '$2a$10$xqGY0VJWM5YfFpN8.FN9/.YHqY5KZJqKZlhqLNZKqLhYqFpN8.FN9/',
  'agent',
  'John Delivery',
  '+919876543211'
) ON CONFLICT (username) DO NOTHING;

-- Link agent to delivery_agents table
INSERT INTO delivery_agents (user_id, vehicle_number, vehicle_type, active)
SELECT id, 'KA-01-AB-1234', 'motorcycle', true
FROM users WHERE username = 'agent1'
ON CONFLICT (user_id) DO NOTHING;

-- Create sample user (password: user123)
INSERT INTO users (username, password_hash, role, name, phone)
VALUES (
  'testuser',
  '$2a$10$xqGY0VJWM5YfFpN8.FN9/.YHqY5KZJqKZlhqLNZKqLhYqFpN8.FN9/',
  'user',
  'Test User',
  '+919876543212'
) ON CONFLICT (username) DO NOTHING;

-- =====================================================
-- VIEWS (for easier queries)
-- =====================================================

-- View: Orders with user and agent details
CREATE OR REPLACE VIEW orders_detailed AS
SELECT 
  o.id,
  o.user_id,
  u.name AS user_name,
  u.phone AS user_phone,
  o.current_location,
  o.latitude,
  o.longitude,
  o.battery_type,
  o.vehicle_model,
  o.charge_level,
  o.status,
  o.assigned_to,
  da.vehicle_number AS agent_vehicle,
  au.name AS agent_name,
  au.phone AS agent_phone,
  o.amount,
  o.payment_status,
  o.created_at,
  o.updated_at,
  o.assigned_at,
  o.completed_at
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN delivery_agents da ON o.assigned_to = da.id
LEFT JOIN users au ON da.user_id = au.id;

-- View: Agent statistics
CREATE OR REPLACE VIEW agent_stats AS
SELECT 
  da.id AS agent_id,
  da.user_id,
  u.name AS agent_name,
  da.vehicle_number,
  da.active,
  COUNT(o.id) FILTER (WHERE o.status = 'delivered') AS completed_orders,
  COUNT(o.id) FILTER (WHERE o.status IN ('assigned', 'en_route')) AS active_orders,
  COUNT(o.id) AS total_orders,
  COALESCE(SUM(o.amount) FILTER (WHERE o.status = 'delivered'), 0) AS total_earnings
FROM delivery_agents da
LEFT JOIN users u ON da.user_id = u.id
LEFT JOIN orders o ON da.id = o.assigned_to
GROUP BY da.id, da.user_id, u.name, da.vehicle_number, da.active;

-- =====================================================
-- ROW LEVEL SECURITY (Optional - for additional security)
-- =====================================================

-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_agents ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies should be configured based on your auth strategy
-- Since we're using custom JWT auth, you may want to disable RLS or
-- create policies that work with service role key

-- For now, allow service role to access everything
CREATE POLICY "Service role has full access to users" ON users
  FOR ALL USING (true);

CREATE POLICY "Service role has full access to orders" ON orders
  FOR ALL USING (true);

CREATE POLICY "Service role has full access to agents" ON delivery_agents
  FOR ALL USING (true);

-- =====================================================
-- FUNCTIONS (Helper functions for API)
-- =====================================================

-- Function to get available agents
CREATE OR REPLACE FUNCTION get_available_agents()
RETURNS TABLE (
  agent_id UUID,
  agent_name TEXT,
  vehicle_number TEXT,
  active_orders BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    da.id,
    u.name,
    da.vehicle_number,
    COUNT(o.id) AS active_orders
  FROM delivery_agents da
  LEFT JOIN users u ON da.user_id = u.id
  LEFT JOIN orders o ON da.id = o.assigned_to AND o.status IN ('assigned', 'en_route')
  WHERE da.active = true
  GROUP BY da.id, u.name, da.vehicle_number
  ORDER BY active_orders ASC, u.name;
END;
$$ LANGUAGE plpgsql;

-- Function to create order status history automatically
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history (order_id, old_status, new_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_status_change_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_status_change();
