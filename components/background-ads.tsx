"use client"

import { useState, useEffect } from "react"
import { X, Zap, Battery, Truck, Gift, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const ads = [
  {
    id: 1,
    title: "Tesla Model S Battery",
    subtitle: "Premium Long Range - 400 miles",
    discount: "30% OFF",
    icon: Battery,
    color: "from-blue-500 to-cyan-500",
    image: "/tesla-battery-pack.jpg",
  },
  {
    id: 2,
    title: "Fast Charging Service",
    subtitle: "15-Min Installation by Experts",
    discount: "FREE Setup",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    image: "/charging-service.jpg",
  },
  {
    id: 3,
    title: "Express Delivery",
    subtitle: "Same Day Service Available",
    discount: "50% OFF",
    icon: Truck,
    color: "from-purple-500 to-pink-500",
    image: "/delivery-truck-ev.jpg",
  },
  {
    id: 4,
    title: "New Customer Bonus",
    subtitle: "First Order Special Deal",
    discount: "FREE Battery",
    icon: Gift,
    color: "from-orange-500 to-red-500",
    image: "/realistic-ev-charging-station.jpg",
  },
  {
    id: 5,
    title: "Premium Service Areas",
    subtitle: "Now serving 50+ cities",
    discount: "24/7 Support",
    icon: MapPin,
    color: "from-indigo-500 to-purple-500",
    image: "/realistic-ev-charging-station.jpg",
  },
  {
    id: 6,
    title: "Top Rated Technicians",
    subtitle: "4.9★ Average Rating",
    discount: "Certified Pros",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    image: "/charging-service.jpg",
  },
]

export function BackgroundAds() {
  const [currentAd, setCurrentAd] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState({ bottom: 4, left: 4 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length)
      setPosition({
        bottom: Math.random() > 0.5 ? 4 : ("auto" as any),
        left: Math.random() > 0.5 ? 4 : ("auto" as any),
        top: Math.random() > 0.5 ? 4 : ("auto" as any),
        right: Math.random() > 0.5 ? 4 : ("auto" as any),
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const ad = ads[currentAd]
  const Icon = ad.icon

  return (
    <>
      {/* Main floating ad */}
      <div
        className="fixed z-40 animate-slide-in-left transition-all duration-1000"
        style={{
          bottom: position.bottom !== "auto" ? `${position.bottom}rem` : "auto",
          left: position.left !== "auto" ? `${position.left}rem` : "auto",
          top: position.top !== "auto" ? `${position.top}rem` : "auto",
          right: position.right !== "auto" ? `${position.right}rem` : "auto",
        }}
      >
        <div className={`bg-gradient-to-r ${ad.color} p-[1px] rounded-lg animate-pulse-glow shadow-2xl`}>
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg overflow-hidden min-w-[300px] max-w-[320px]">
            {/* Ad Image */}
            <div className="relative h-24 overflow-hidden">
              <img src={ad.image || "/placeholder.svg"} alt={ad.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            {/* Ad Content */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-white">{ad.title}</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">{ad.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-400">{ad.discount}</span>
                <Button size="sm" className="text-xs px-4 py-1 bg-blue-600 hover:bg-blue-700">
                  Claim Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary banner ads */}
      <div className="fixed top-4 right-4 z-30">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-[1px] rounded-lg animate-pulse">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-center min-w-[200px]">
            <div className="text-xs text-green-400 font-semibold">LIVE OFFER</div>
            <div className="text-white text-sm font-medium">Free Installation</div>
            <div className="text-xs text-slate-300">Limited Time</div>
          </div>
        </div>
      </div>

      {/* Bottom banner */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600 p-2">
        <div className="container mx-auto flex items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-4">
            <Zap className="w-4 h-4" />
            <span>🔥 Flash Sale: 40% OFF Premium Batteries - Ends in 2:45:30</span>
          </div>
          <Button size="sm" variant="secondary" className="text-xs">
            Shop Now
          </Button>
        </div>
      </div>
    </>
  )
}
