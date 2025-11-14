/**
 * Authentication Context
 * Manages user authentication state across the application
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, getCurrentUser } from './api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  name: string;
  phone?: string;
  email?: string;
  role: 'user' | 'admin' | 'agent';
  agentDetails?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAgent: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = getCurrentUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      setUser(response.user);
      
      // Redirect based on role
      if (response.user.role === 'admin') {
        router.push('/admin');
      } else if (response.user.role === 'agent') {
        router.push('/agent/dashboard');
      } else {
        router.push('/order');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await authAPI.signup(userData);
      setUser(response.user);
      
      // Redirect based on role
      if (response.user.role === 'admin') {
        router.push('/admin');
      } else if (response.user.role === 'agent') {
        router.push('/agent/dashboard');
      } else {
        router.push('/order');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    authAPI.logout();
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent',
    isUser: user?.role === 'user',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: 'user' | 'admin' | 'agent'
) {
  return function ProtectedRoute(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/auth/login');
        } else if (requiredRole && user.role !== requiredRole) {
          router.push('/');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user || (requiredRole && user.role !== requiredRole)) {
      return null;
    }

    return <Component {...props} />;
  };
}
