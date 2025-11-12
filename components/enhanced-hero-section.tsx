"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Battery, ArrowRight, Play, Star, Users, Clock } from "lucide-react"
import Link from "next/link"

export function EnhancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(15)
  const [chargingAnimation, setChargingAnimation] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Simulate battery charging animation
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev >= 100) {
          setChargingAnimation(false)
          return 15
        }
        return prev + 1
      })
    }, 100)

    const chargingInterval = setInterval(() => {
      setChargingAnimation(true)
      setTimeout(() => setChargingAnimation(false), 5000)
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(chargingInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <div className="w-20 h-20 border border-blue-400 rotate-45 rounded-lg"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Status Badge */}
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover-glow animate-pulse-glow">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
              Live Service Available 24/7
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Power Your
                </span>
                <span
                  className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent animate-gradient text-glow animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  EV Journey
                </span>
                <span className="block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  On-Demand
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                Revolutionary battery delivery service that comes to you. Professional installation, premium batteries,
                and lightning-fast service for all EV models.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center space-x-8 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50K+</div>
                <div className="text-sm text-slate-400">Batteries Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">4.9★</div>
                <div className="text-sm text-slate-400">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">15min</div>
                <div className="text-sm text-slate-400">Avg Response</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              <Link href="/order">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg hover-glow animate-pulse-glow group"
                >
                  Order Battery Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-4 text-lg hover-glow group bg-transparent"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex items-center space-x-6 text-slate-400 animate-fade-in-up"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">Trusted by 10K+ drivers</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">24/7 Emergency Service</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Battery Visualization */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative">
              {/* Main Battery Visualization */}
              <div className="relative mx-auto w-80 h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-2 border-slate-600 overflow-hidden hover-glow">
                {/* Battery Level Indicator */}
                <div className="absolute inset-4 bg-slate-700 rounded-2xl overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-300 ${
                      chargingAnimation
                        ? "from-green-400 to-blue-400 animate-pulse-glow"
                        : batteryLevel < 30
                          ? "from-red-500 to-orange-500"
                          : "from-green-400 to-blue-400"
                    }`}
                    style={{ height: `${batteryLevel}%` }}
                  />

                  {/* Electric particles during charging */}
                  {chargingAnimation && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Battery Percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{batteryLevel}%</div>
                    <div className="text-sm text-slate-300">{chargingAnimation ? "Charging..." : "Current Level"}</div>
                  </div>
                </div>

                {/* Battery Terminal */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-4 bg-slate-600 rounded-t-lg"></div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-8 -left-8 animate-bounce-subtle">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 animate-bounce-subtle" style={{ animationDelay: "1s" }}>
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/30">
                  <Battery className="w-8 h-8 text-green-400" />
                </div>
              </div>

              {/* Charging Cable Animation */}
              {chargingAnimation && (
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-2 bg-yellow-400 rounded-full animate-pulse-glow"></div>
                  <div className="w-12 h-1 bg-yellow-400/60 rounded-full mt-1 animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Service Features */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm hover-glow">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-white font-medium">Fast Service</div>
                <div className="text-slate-400 text-sm">15-30 minutes</div>
              </div>

              <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm hover-glow">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-white font-medium">Premium Quality</div>
                <div className="text-slate-400 text-sm">OEM Standards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
