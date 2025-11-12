"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Star, Clock, Battery, Zap, Car, Navigation, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import { BackgroundAds } from "@/components/background-ads"

interface ServiceProvider {
  name: string
  phone: string
  vehicle: string
  rating: number
  image: string
  location: { lat: number; lng: number }
}

interface TrackingOrder {
  orderId: string
  battery: any
  location: any
  deliveryOption: any
  totalPrice: number
  status: string
  estimatedArrival: string
  serviceProvider: ServiceProvider
}

export default function TrackingPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<TrackingOrder | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [providerLocation, setProviderLocation] = useState({ lat: 37.7749, lng: -122.4194 })
  const [eta, setEta] = useState(25)
  const [batteryLevel, setBatteryLevel] = useState(15)

  useEffect(() => {
    // Load order from localStorage
    const storedOrder = localStorage.getItem("currentOrder")
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate provider movement and ETA updates
    const locationInterval = setInterval(() => {
      setProviderLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))
      setEta((prev) => Math.max(1, prev - Math.random() * 2))
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(locationInterval)
    }
  }, [])

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link href="/order">
            <Button className="bg-blue-600 hover:bg-blue-700">Place New Order</Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <BackgroundAds />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tracking Your <span className="text-blue-400">EV Battery</span>
          </h1>
          <p className="text-slate-300">Order #{order.orderId}</p>
          <div className="text-slate-400 text-sm mt-2">Live Time: {formatTime(currentTime)}</div>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Battery className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Current Battery: {batteryLevel}%</span>
            <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-1000"
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map Section */}
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-blue-400" />
              Live Tracking
            </h2>

            {/* Simulated Map */}
            <div className="relative bg-slate-700 rounded-lg h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>

              {/* Map Grid */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="border-b border-slate-600" style={{ height: "10%" }}></div>
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute border-r border-slate-600 h-full"
                    style={{ left: `${i * 10}%`, width: "1px" }}
                  ></div>
                ))}
              </div>

              {/* Your Location */}
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50">
                <div className="absolute -top-8 -left-6 text-xs text-white bg-green-600 px-2 py-1 rounded whitespace-nowrap">
                  Your Location
                </div>
              </div>

              {/* Service Provider Location */}
              <div
                className="absolute w-6 h-6 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50 transition-all duration-3000"
                style={{
                  left: `${40 + Math.sin(Date.now() / 1000) * 10}%`,
                  top: `${30 + Math.cos(Date.now() / 1000) * 10}%`,
                }}
              >
                <Car className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                <div className="absolute -top-8 -left-8 text-xs text-white bg-blue-600 px-2 py-1 rounded whitespace-nowrap">
                  {order.serviceProvider.name}
                </div>
              </div>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 60% 40% Q 70% 60% 80% 80%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* ETA Info */}
            <div className="mt-4 flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-medium">ETA: {Math.round(eta)} minutes</span>
              </div>
              <div className="text-slate-300 text-sm">Distance: {(eta * 0.5).toFixed(1)} miles</div>
            </div>
          </Card>

          {/* Order Details & Service Provider */}
          <div className="space-y-6">
            {/* Service Provider Card */}
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your Service Provider</h2>

              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src="/electric-service-vehicle-with------charge-branding.jpg"
                    alt={order.serviceProvider.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{order.serviceProvider.name}</h3>
                  <div className="flex items-center text-yellow-400 mb-1">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm">{order.serviceProvider.rating} (2,847 reviews)</span>
                  </div>
                  <p className="text-slate-300 text-sm">{order.serviceProvider.vehicle}</p>
                  <div className="flex items-center text-green-400 text-xs mt-1">
                    <Shield className="w-3 h-3 mr-1" />
                    <span>Verified & Insured</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>

            {/* Order Status */}
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Status</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-white">Order Confirmed</span>
                  <span className="text-slate-400 text-sm ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-white">Service Provider Assigned</span>
                  <span className="text-slate-400 text-sm ml-auto">1 min ago</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white">En Route to Your Location</span>
                  <span className="text-blue-400 text-sm ml-auto">Now</span>
                </div>
                <div className="flex items-center opacity-50">
                  <div className="w-3 h-3 bg-slate-500 rounded-full mr-3"></div>
                  <span className="text-slate-400">Battery Installation</span>
                </div>
                <div className="flex items-center opacity-50">
                  <div className="w-3 h-3 bg-slate-500 rounded-full mr-3"></div>
                  <span className="text-slate-400">Service Complete</span>
                </div>
              </div>
            </Card>

            {/* Order Details */}
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Details</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Battery className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white">{order.battery?.name}</span>
                  </div>
                  <span className="text-slate-300">${order.battery?.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-white">{order.deliveryOption?.name}</span>
                  </div>
                  <span className="text-slate-300">${order.deliveryOption?.price}</span>
                </div>

                <div className="border-t border-slate-600 pt-3 mt-3">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-blue-400">${order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  )
}
