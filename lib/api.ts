/**
 * API Service Layer
 * Centralized API calls to backend with authentication
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// =====================================================
// Authentication API
// =====================================================
export const authAPI = {
  /**
   * Sign up a new user
   */
  signup: async (userData: {
    username: string;
    password: string;
    name: string;
    phone?: string;
    email?: string;
    role?: 'user' | 'admin' | 'agent';
    vehicle_number?: string; // For agents
    vehicle_type?: string;
  }) => {
    const { data } = await api.post('/auth/signup', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Login user
   */
  login: async (username: string, password: string) => {
    const { data } = await api.post('/auth/login', { username, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Get current user info
   */
  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  /**
   * Refresh JWT token
   */
  refresh: async () => {
    const { data } = await api.post('/auth/refresh');
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  },
};

// =====================================================
// Order API
// =====================================================
export const orderAPI = {
  /**
   * Create a new battery recharge order
   */
  create: async (orderData: {
    current_location: string;
    latitude: number;
    longitude: number;
    battery_type?: string;
    vehicle_model?: string;
    charge_level?: string;
    amount?: number;
  }) => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  /**
   * Get order by ID
   */
  getById: async (orderId: string) => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  },

  /**
   * Get all orders for a user
   */
  getUserOrders: async (userId: string) => {
    const { data } = await api.get(`/orders/user/${userId}`);
    return data;
  },

  /**
   * Update order status
   */
  updateStatus: async (orderId: string, status: string) => {
    const { data } = await api.put(`/orders/${orderId}/status`, { status });
    return data;
  },

  /**
   * Cancel an order
   */
  cancel: async (orderId: string) => {
    const { data } = await api.delete(`/orders/${orderId}`);
    return data;
  },
};

// =====================================================
// Admin API
// =====================================================
export const adminAPI = {
  /**
   * Get all orders with filters
   */
  getOrders: async (filters?: {
    status?: string;
    user_id?: string;
    agent_id?: string;
    limit?: number;
    offset?: number;
  }) => {
    const { data } = await api.get('/admin/orders', { params: filters });
    return data;
  },

  /**
   * Assign delivery agent to an order
   */
  assignAgent: async (orderId: string, agentId: string) => {
    const { data } = await api.put(`/admin/orders/${orderId}/assign`, {
      agent_id: agentId,
    });
    return data;
  },

  /**
   * Get dashboard analytics
   */
  getAnalytics: async () => {
    const { data } = await api.get('/admin/analytics');
    return data;
  },

  /**
   * Get all users
   */
  getUsers: async (filters?: { role?: string; limit?: number; offset?: number }) => {
    const { data } = await api.get('/admin/users', { params: filters });
    return data;
  },

  /**
   * Delete a user
   */
  deleteUser: async (userId: string) => {
    const { data } = await api.delete(`/admin/users/${userId}`);
    return data;
  },
};

// =====================================================
// Agent API
// =====================================================
export const agentAPI = {
  /**
   * Get all available agents
   */
  getAll: async (filters?: { active?: boolean }) => {
    const { data } = await api.get('/agents', { params: filters });
    return data;
  },

  /**
   * Create a new delivery agent (admin only)
   */
  create: async (agentData: {
    username: string;
    password: string;
    name: string;
    phone?: string;
    email?: string;
    vehicle_number: string;
    vehicle_type?: string;
  }) => {
    const { data } = await api.post('/agents/create', agentData);
    return data;
  },

  /**
   * Get orders assigned to current agent
   */
  getMyOrders: async (filters?: { status?: string }) => {
    const { data } = await api.get('/agents/my-orders', { params: filters });
    return data;
  },

  /**
   * Update agent's current location
   */
  updateLocation: async (latitude: number, longitude: number) => {
    const { data } = await api.put('/agents/location', { latitude, longitude });
    return data;
  },

  /**
   * Toggle agent active/inactive status
   */
  updateStatus: async (active: boolean) => {
    const { data } = await api.put('/agents/status', { active });
    return data;
  },

  /**
   * Get agent statistics
   */
  getStats: async () => {
    const { data } = await api.get('/agents/stats');
    return data;
  },
};

// =====================================================
// Helper functions
// =====================================================

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Get auth token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Check if user has specific role
 */
export const hasRole = (role: string) => {
  const user = getCurrentUser();
  return user?.role === role;
};

export default api;
