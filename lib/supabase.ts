import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your actual Supabase schema
export interface User {
  id: string
  email: string
  phone: string
  full_name: string
  avatar_url?: string
  user_type: 'customer' | 'provider' | 'admin' | 'business'
  created_at: string
  updated_at: string
  is_active: boolean
  is_verified: boolean
  last_login?: string
}

export interface Vehicle {
  id: string
  owner_id: string
  owner_type: 'customer' | 'business'
  make: string
  model: string
  year?: number
  color?: string
  registration_number?: string
  battery_type: string
  battery_capacity_kwh?: number
  charging_port_type?: string
  is_primary: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  provider_id?: string
  vehicle_id: string
  service_type: 'instant' | 'scheduled'
  scheduled_time?: string
  charge_level: string
  service_address: any // JSONB
  service_location?: any // GEOGRAPHY(POINT) - optional since we might not use PostGIS
  base_price: number
  surge_multiplier?: number
  discount_amount?: number
  tax_amount?: number
  total_price: number
  currency?: string
  status: 'pending' | 'searching_provider' | 'provider_assigned' | 'provider_en_route' | 'provider_arrived' | 'in_progress' | 'completed' | 'cancelled' | 'failed'
  placed_at?: string
  accepted_at?: string
  started_at?: string
  completed_at?: string
  cancelled_at?: string
  initial_battery_percent?: number
  final_battery_percent?: number
  actual_charge_time_minutes?: number
  before_photo_url?: string
  after_photo_url?: string
  payment_method?: string
  payment_status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  payment_id?: string
  customer_rating?: number
  customer_feedback?: string
  provider_rating?: number
  provider_feedback?: string
  cancelled_by?: string
  cancellation_reason?: string
  created_at?: string
  updated_at?: string
}

export interface ProviderProfile {
  id: string
  user_id: string
  vehicle_type: string
  vehicle_number: string
  vehicle_model?: string
  verification_status: 'pending' | 'approved' | 'rejected' | 'suspended'
  total_orders: number
  completed_orders: number
  average_rating: number
  total_earnings: number
  is_online: boolean
  service_areas?: string[]
  created_at: string
  updated_at: string
}

// Helper functions
export const supabaseHelpers = {
  // Create a new order
  async createOrder(orderData: {
    order_number: string
    customer_id: string
    vehicle_id: string
    service_type: 'instant' | 'scheduled'
    charge_level: string
    service_address: any
    base_price: number
    tax_amount?: number
    total_price: number
    status?: string
    scheduled_time?: string
  }) {
    // Extract lat/lng from service_address to create PostGIS point
    const lat = orderData.service_address?.lat || 0
    const lng = orderData.service_address?.lng || 0
    
    // Create PostGIS POINT using WKT format
    // Format: SRID=4326;POINT(lng lat) - Note: longitude comes first!
    const serviceLocationWKT = `SRID=4326;POINT(${lng} ${lat})`
    
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        service_location: serviceLocationWKT,
        status: orderData.status || 'pending',
        currency: 'INR'
      }])
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Get order by ID
  async getOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data as Order
  },

  // Get order by order number
  async getOrderByNumber(orderNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single()

    if (error) throw error
    return data as Order
  },

  // Get orders with detailed info (using the view)
  async getOrdersDetailed(filters?: { customer_id?: string; provider_id?: string; status?: string }) {
    let query = supabase.from('orders_detailed').select('*')

    if (filters?.customer_id) {
      query = query.eq('customer_id', filters.customer_id)
    }
    if (filters?.provider_id) {
      query = query.eq('provider_id', filters.provider_id)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    const { data, error } = await query.order('placed_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Assign provider to order
  async assignProviderToOrder(orderId: string, providerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        provider_id: providerId, 
        status: 'provider_assigned',
        accepted_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Get user by ID
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as User
  },

  // Get user by email
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) throw error
    return data as User
  },

  // Get user by phone
  async getUserByPhone(phone: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single()

    if (error) throw error
    return data as User
  },

  // Get user's vehicles
  async getUserVehicles(userId: string) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('owner_id', userId)
      .eq('is_active', true)
      .order('is_primary', { ascending: false })

    if (error) throw error
    return data as Vehicle[]
  },

  // Get vehicle by ID
  async getVehicle(vehicleId: string) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single()

    if (error) throw error
    return data as Vehicle
  },

  // Get available providers near location
  async getNearbyProviders(lat: number, lng: number, radiusKm: number = 10) {
    const { data, error } = await supabase
      .rpc('get_nearby_providers', {
        lat,
        lng,
        radius_km: radiusKm
      })

    if (error) throw error
    return data
  },

  // Get provider profile
  async getProviderProfile(userId: string) {
    const { data, error } = await supabase
      .from('provider_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data as ProviderProfile
  },

  // Update provider online status
  async updateProviderOnlineStatus(userId: string, isOnline: boolean) {
    const { data, error } = await supabase
      .from('provider_profiles')
      .update({ is_online: isOnline })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data as ProviderProfile
  }
}
