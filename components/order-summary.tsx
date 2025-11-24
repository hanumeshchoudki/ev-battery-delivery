"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Battery, CreditCard } from "lucide-react"
import type { OrderData } from "@/components/order-flow"
import { useRouter } from "next/navigation"
import { supabase, supabaseHelpers } from "@/lib/supabase"
import { useState } from "react"
import { toast } from "sonner"

interface OrderSummaryProps {
  orderData: OrderData
  onBack: () => void
}

export function OrderSummary({ orderData, onBack }: OrderSummaryProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    try {
      // Get the logged-in user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('Please log in to place an order')
        router.push('/auth/login')
        return
      }

      // Check if user exists in our users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()

      // If user doesn't exist in users table, create them
      if (!existingUser) {
        await supabase
          .from('users')
          .insert([{
            id: user.id,
            email: user.email,
            phone: user.user_metadata?.phone || null,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            user_type: 'customer',
            is_active: true,
            is_verified: true
          }])

        // Create customer profile
        await supabase
          .from('customer_profiles')
          .insert([{
            user_id: user.id,
            total_orders: 0,
            lifetime_value: 0,
            loyalty_points: 0
          }])
      }

      // Get or create a vehicle for this user
      let { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('owner_id', user.id)
        .eq('is_primary', true)
        .maybeSingle()

      if (!vehicle) {
        const { data: newVehicle, error: insertError } = await supabase
          .from('vehicles')
          .insert([{
            owner_id: user.id,
            owner_type: 'customer',
            make: 'EV',
            model: 'Default',
            battery_type: orderData.battery?.name || 'Lithium-ion',
            is_primary: true,
            is_active: true
          }])
          .select()
          .single()
        
        if (insertError) throw insertError
        vehicle = newVehicle
      }

      if (!vehicle) {
        throw new Error('Failed to create or retrieve vehicle')
      }

      // Generate order number
      const orderNumber = 'ORD-' + Date.now()

      // Determine service type based on delivery option
      const serviceType: 'instant' | 'scheduled' = 
        orderData.deliveryOption?.name === 'Instant Delivery' ? 'instant' : 'scheduled'

      // Prepare service location (PostGIS POINT format)
      const serviceLocation = orderData.location 
        ? `POINT(${orderData.location.coordinates.lng} ${orderData.location.coordinates.lat})`
        : 'POINT(0 0)'

      // Prepare order data for Supabase
      const orderPayload = {
        order_number: orderNumber,
        customer_id: user.id,
        vehicle_id: vehicle.id,
        service_type: serviceType,
        charge_level: '80%',
        service_address: orderData.location ? {
          address: orderData.location.address,
          lat: orderData.location.coordinates.lat,
          lng: orderData.location.coordinates.lng
        } : { address: 'Unknown', lat: 0, lng: 0 },
        service_location: serviceLocation,
        base_price: orderData.totalPrice,
        tax_amount: 0,
        total_price: orderData.totalPrice,
        status: 'pending' as const
      }

      // Save order to Supabase
      const { data: savedOrder, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single()

      if (orderError) throw orderError

      toast.success('Order placed successfully!')
      
      // Redirect to tracking page
      router.push(`/tracking/${savedOrder.id}`)

    } catch (error: any) {
      console.error('Failed to place order:', error)
      toast.error(error.message || 'Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Order{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
            Summary
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Review your order details before confirming
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-5 bg-card/50 backdrop-blur-sm border-border shadow-xl">
          <div className="space-y-4">
            {/* Battery Details */}
            {orderData.battery && (
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center uppercase tracking-wide">
                  <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center mr-2">
                    <Battery className="w-4 h-4 text-primary" />
                  </div>
                  Battery Pack
                </h3>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{orderData.battery.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {orderData.battery.capacity} • {orderData.battery.voltage}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-foreground">${orderData.battery.price}</div>
                </div>
              </div>
            )}

            {/* Delivery Location */}
            {orderData.location && (
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center uppercase tracking-wide">
                  <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center mr-2">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  Delivery Location
                </h3>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm text-foreground line-clamp-2">{orderData.location.address}</div>
                </div>
              </div>
            )}

            {/* Delivery Option */}
            {orderData.deliveryOption && (
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center uppercase tracking-wide">
                  <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center mr-2">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  Delivery Option
                </h3>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{orderData.deliveryOption.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ETA: {orderData.deliveryOption.time}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-foreground">${orderData.deliveryOption.price}</div>
                </div>
              </div>
            )}

            <Separator className="my-4" />

            {/* Total */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-bold text-lg">Total Amount</span>
                <span className="text-primary text-2xl font-bold">${orderData.totalPrice}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2 flex items-center uppercase tracking-wide">
                <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center mr-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                Payment Method
              </h3>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-foreground font-medium">•••• •••• •••• 4242</div>
                <div className="text-xs text-muted-foreground">Visa ending in 4242</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={onBack} 
                disabled={isLoading}
                className="bg-transparent border-border hover:bg-muted px-6 h-11"
              >
                ← Back
              </Button>
              <Button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl transition-all flex-1 h-11 font-semibold"
              >
                {isLoading ? "Placing Order..." : `⚡ Place Order - $${orderData.totalPrice}`}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
