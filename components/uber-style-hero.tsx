"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"

const locationSuggestions = [
  "Times Square, New York, NY",
  "Central Park, New York, NY",
  "Brooklyn Bridge, New York, NY",
  "Empire State Building, New York, NY",
  "Wall Street, New York, NY",
]

export function UberStyleHero() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [serviceType, setServiceType] = useState("now")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleLocationChange = (value: string) => {
    setPickupLocation(value)
    setShowSuggestions(value.length > 0)
  }

  const selectSuggestion = (suggestion: string) => {
    setPickupLocation(suggestion)
    setShowSuggestions(false)
  }

  return (
    <section className="pt-16 pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-black leading-tight">
                Go anywhere with
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  ನಮ್ಮ Charge
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Request a battery charging service in minutes. Available 24/7 for your EV needs.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg max-w-md">
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter your location"
                    value={pickupLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={() => setShowSuggestions(pickupLocation.length > 0)}
                    className="pl-10 h-12 border-gray-300"
                  />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
                      {locationSuggestions
                        .filter((suggestion) => suggestion.toLowerCase().includes(pickupLocation.toLowerCase()))
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                              <span className="text-sm">{suggestion}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="now"
                      name="service-type"
                      value="now"
                      checked={serviceType === "now"}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <label htmlFor="now" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Now
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="schedule"
                      name="service-type"
                      value="schedule"
                      checked={serviceType === "schedule"}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <label htmlFor="schedule" className="text-sm font-medium text-gray-900 cursor-pointer flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Schedule
                    </label>
                  </div>
                </div>

                <Link href="/order" className="block">
                  <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg font-medium">
                    See prices
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:block">
            <div className="w-full h-96 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
              <svg className="w-64 h-64 opacity-20" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="4" className="text-orange-600" />
                <path d="M100 40 L100 160 M40 100 L160 100" stroke="currentColor" strokeWidth="4" className="text-red-600" />
                <circle cx="100" cy="100" r="20" fill="currentColor" className="text-pink-600" />
              </svg>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-800">⚡ Fast Charging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
