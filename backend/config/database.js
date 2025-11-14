/**
 * Supabase Database Configuration
 * Provides connection to PostgreSQL via Supabase client
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn('⚠️  WARNING: Missing Supabase environment variables. Database features will not work.');
  console.warn('⚠️  Please configure SUPABASE_URL and SUPABASE_KEY in backend/.env');
  // Don't throw error - allow server to start for demo purposes
}

// Create Supabase client with service role for backend operations
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_KEY
  ? createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null; // Allow null for demo mode

// Test database connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    return false;
  }
}

// Execute raw SQL queries (for complex operations)
async function executeQuery(query, params = []) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: query, 
      params 
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

module.exports = {
  supabase,
  testConnection,
  executeQuery
};
