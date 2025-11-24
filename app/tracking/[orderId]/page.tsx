"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Star, Clock, Battery, Zap, Car, Navigation, Shield, Home } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const LiveTrackingMap = dynamic(
  () => import('@/components/live-tracking-map').then(mod => mod.LiveTrackingMap),
  { ssr: false, loading: () => <div className="w-full h-80 bg-slate-700 rounded-lg animate-pulse flex items-center justify-center text-white">Loading map...</div> }
)

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
  const [providerLocation, setProviderLocation] = useState({ lat: 0, lng: 0 })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [eta, setEta] = useState(25)
  const [batteryLevel, setBatteryLevel] = useState(15)
  const [distance, setDistance] = useState(0)

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Generate random driver location within 2-10 km radius
  const generateRandomDriverLocation = (centerLat: number, centerLng: number) => {
    const radiusKm = 2 + Math.random() * 8 // 2-10 km
    const radiusMiles = radiusKm * 0.621371 // Convert to miles for distance calculation
    const radiusDegrees = radiusKm / 111 // Approximate conversion (1 degree ≈ 111 km)
    const angle = Math.random() * 2 * Math.PI
    
    return {
      lat: centerLat + radiusDegrees * Math.cos(angle),
      lng: centerLng + radiusDegrees * Math.sin(angle)
    }
  }

  useEffect(() => {
    // Load order from localStorage
    const storedOrder = localStorage.getItem("currentOrder")
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const userLoc = { lat: latitude, lng: longitude }
          setUserLocation(userLoc)
          
          // Generate random driver location around user
          const driverLoc = generateRandomDriverLocation(latitude, longitude)
          setProviderLocation(driverLoc)
          
          // Calculate initial distance and ETA
          const dist = calculateDistance(latitude, longitude, driverLoc.lat, driverLoc.lng)
          setDistance(dist)
          setEta(Math.max(5, Math.round(dist * 2.5))) // Assume 24 mph average speed
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("Unable to get your location. Using default location.")
          // Set default location if geolocation fails (Los Angeles)
          const defaultLoc = { lat: 34.0522, lng: -118.2437 }
          setUserLocation(defaultLoc)
          const driverLoc = generateRandomDriverLocation(defaultLoc.lat, defaultLoc.lng)
          setProviderLocation(driverLoc)
          const dist = calculateDistance(defaultLoc.lat, defaultLoc.lng, driverLoc.lat, driverLoc.lng)
          setDistance(dist)
          setEta(Math.max(5, Math.round(dist * 2.5)))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    } else {
      setLocationError("Geolocation is not supported by your browser.")
      const defaultLoc = { lat: 34.0522, lng: -118.2437 }
      setUserLocation(defaultLoc)
      const driverLoc = generateRandomDriverLocation(defaultLoc.lat, defaultLoc.lng)
      setProviderLocation(driverLoc)
      const dist = calculateDistance(defaultLoc.lat, defaultLoc.lng, driverLoc.lat, driverLoc.lng)
      setDistance(dist)
      setEta(Math.max(5, Math.round(dist * 2.5)))
    }

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate provider movement towards user and ETA updates
    const locationInterval = setInterval(() => {
      setProviderLocation((prev) => {
        if (!userLocation) return prev
        
        // Move driver slightly towards user
        const newLat = prev.lat + (userLocation.lat - prev.lat) * 0.02
        const newLng = prev.lng + (userLocation.lng - prev.lng) * 0.02
        
        const newDist = calculateDistance(userLocation.lat, userLocation.lng, newLat, newLng)
        setDistance(newDist)
        setEta(Math.max(1, Math.round(newDist * 2.5)))
        
        return { lat: newLat, lng: newLng }
      })
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(locationInterval)
    }
  }, [userLocation?.lat, userLocation?.lng])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tracking Your <span className="text-blue-400">EV Battery</span>
          </h1>
          <p className="text-slate-300">Order #{order.orderId}</p>
          <div className="text-slate-400 text-sm mt-2">Live Time: {formatTime(currentTime)}</div>
          {locationError && (
            <div className="text-yellow-400 text-sm mt-2 flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2" />
              {locationError}
            </div>
          )}
          {userLocation && (
            <div className="text-green-400 text-xs mt-2">
              📍 Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </div>
          )}
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

            {/* Real OpenStreetMap */}
            <LiveTrackingMap
              userLocation={userLocation}
              driverLocation={providerLocation}
              driverName={order.serviceProvider.name}
            />

            {/* ETA Info */}
            <div className="mt-4 flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-medium">ETA: {Math.round(eta)} minutes</span>
              </div>
              <div className="text-slate-300 text-sm">Distance: {distance.toFixed(1)} miles</div>
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
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
