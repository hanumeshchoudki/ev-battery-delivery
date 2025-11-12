"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Battery, CreditCard } from "lucide-react"
import type { OrderData } from "@/components/order-flow"
import { useRouter } from "next/navigation"

interface OrderSummaryProps {
  orderData: OrderData
  onBack: () => void
}

export function OrderSummary({ orderData, onBack }: OrderSummaryProps) {
  const router = useRouter()

  const handlePlaceOrder = () => {
    const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    const orderWithId = {
      ...orderData,
      orderId,
      status: "confirmed",
      estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      serviceProvider: {
        name: "Alex Rodriguez",
        phone: "+1 (555) 123-4567",
        vehicle: "Tesla Model Y Service",
        rating: 4.9,
        image: "/electric-service-vehicle-with-charging-equipment.jpg",
        location: { lat: 37.7749, lng: -122.4194 },
      },
    }

    localStorage.setItem("currentOrder", JSON.stringify(orderWithId))
    router.push(`/tracking/${orderId}`)
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Order{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Summary</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Review your order details before confirming your battery delivery
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <div className="space-y-6">
            {/* Battery Details */}
            {orderData.battery && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Battery className="w-5 h-5 mr-2 text-primary" />
                  Battery Pack
                </h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{orderData.battery.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {orderData.battery.capacity} • {orderData.battery.voltage} • {orderData.battery.estimatedRange}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {orderData.battery.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-foreground">${orderData.battery.price}</div>
                </div>
              </div>
            )}

            {/* Delivery Location */}
            {orderData.location && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Delivery Location
                </h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-foreground">{orderData.location.address}</div>
                </div>
              </div>
            )}

            {/* Delivery Option */}
            {orderData.deliveryOption && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Delivery Option
                </h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{orderData.deliveryOption.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Estimated arrival: {orderData.deliveryOption.time}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-foreground">${orderData.deliveryOption.price}</div>
                </div>
              </div>
            )}

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between text-xl font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${orderData.totalPrice}</span>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                Payment Method
              </h3>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-foreground">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Visa ending in 4242</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Button variant="outline" onClick={onBack} className="bg-transparent border-border hover:bg-card">
                Back
              </Button>
              <Button
                onClick={handlePlaceOrder}
                className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
              >
                Place Order - ${orderData.totalPrice}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
