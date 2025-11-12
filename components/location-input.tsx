"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Clock } from "lucide-react"

interface LocationInputProps {
  location?: {
    address: string
    coordinates: { lat: number; lng: number }
  }
  onLocationSet: (location: { address: string; coordinates: { lat: number; lng: number } }) => void
  onBack: () => void
}

export function LocationInput({ location, onLocationSet, onBack }: LocationInputProps) {
  const [address, setAddress] = useState(location?.address || "")
  const [isLocating, setIsLocating] = useState(false)

  const handleCurrentLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          // Simulate reverse geocoding
          const mockAddress = "123 Electric Avenue, Tech City, TC 12345"
          setAddress(mockAddress)
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
          alert("Unable to get your location. Please enter address manually.")
        },
      )
    }
  }

  const handleSubmit = () => {
    if (address.trim()) {
      onLocationSet({
        address: address.trim(),
        coordinates: { lat: 37.7749, lng: -122.4194 }, // Mock coordinates
      })
    }
  }

  const suggestedLocations = [
    "123 Electric Avenue, Tech City, TC 12345",
    "456 Battery Street, Innovation District, ID 67890",
    "789 Charging Lane, Future Town, FT 11111",
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Delivery{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Location</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Where should we deliver your battery? We'll be there in 15 minutes or less.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="bg-transparent border-border hover:bg-card"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isLocating ? "Getting Location..." : "Use Current Location"}
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Locations</h3>
              <div className="space-y-2">
                {suggestedLocations.map((loc, index) => (
                  <button
                    key={index}
                    onClick={() => setAddress(loc)}
                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{loc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <Button variant="outline" onClick={onBack} className="bg-transparent border-border hover:bg-card">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!address.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
