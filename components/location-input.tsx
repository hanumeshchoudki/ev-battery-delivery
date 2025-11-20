"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Clock, Loader2 } from "lucide-react"
import { searchAddress, getCurrentLocationWithAddress, type GeocodingResult } from "@/lib/geocoding"

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
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    setIsSearching(true)
    try {
      const results = await searchAddress(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleCurrentLocation = async () => {
    setIsLocating(true)
    try {
      const locationData = await getCurrentLocationWithAddress()
      setAddress(locationData.address)
      setSearchResults([])
      
      // Auto-submit with the current location
      onLocationSet(locationData)
    } catch (error) {
      console.error('Geolocation error:', error)
      alert("Unable to get your location. Please enter address manually or check your browser permissions.")
    } finally {
      setIsLocating(false)
    }
  }

  const handleSubmit = async () => {
    if (address.trim()) {
      // Try to geocode the manually entered address
      try {
        const results = await searchAddress(address.trim())
        if (results.length > 0) {
          const firstResult = results[0]
          onLocationSet({
            address: firstResult.display_name,
            coordinates: { lat: parseFloat(firstResult.lat), lng: parseFloat(firstResult.lon) },
          })
        } else {
          // No results found, use as-is with fallback coordinates
          onLocationSet({
            address: address.trim(),
            coordinates: { lat: 37.7749, lng: -122.4194 }, // San Francisco as fallback
          })
        }
      } catch (error) {
        console.error('Geocoding error:', error)
        // On error, still allow submission with fallback coordinates
        onLocationSet({
          address: address.trim(),
          coordinates: { lat: 37.7749, lng: -122.4194 },
        })
      }
    }
  }

  const handleAddressChange = (value: string) => {
    setAddress(value)
    if (value.length >= 3) {
      handleSearch(value)
    } else {
      setSearchResults([])
    }
  }

  const selectSearchResult = (result: GeocodingResult) => {
    setAddress(result.display_name)
    setSearchResults([])
    onLocationSet({
      address: result.display_name,
      coordinates: { lat: parseFloat(result.lat), lng: parseFloat(result.lon) },
    })
  }

  const suggestedLocations = [
    "San Francisco, California, USA",
    "Los Angeles, California, USA",
    "New York, New York, USA",
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Delivery{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
            Location
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          We'll be there in 15 minutes or less
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <Card className="p-5 bg-card/50 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-shadow">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Delivery Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  type="text"
                  placeholder="Enter your address or city"
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className="pl-10 pr-10 bg-background border-border h-11 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl max-h-64 overflow-y-auto backdrop-blur-sm">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => selectSearchResult(result)}
                      className="w-full text-left p-4 hover:bg-primary/10 transition-all duration-200 border-b border-border/50 last:border-b-0 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors leading-relaxed">
                          {result.display_name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center py-2">
              <Button
                variant="outline"
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/30 hover:border-primary/50 hover:shadow-lg transition-all text-foreground h-10 px-4 text-sm"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Use Current Location
                  </>
                )}
              </Button>
            </div>

            <div>
              <h3 className="text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Quick Search</h3>
              <div className="space-y-2">
                {suggestedLocations.map((loc, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddressChange(loc)}
                    className="w-full text-left p-2.5 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-primary/10 hover:to-blue-600/10 transition-all duration-200 text-xs text-muted-foreground hover:text-foreground border border-transparent hover:border-primary/20 group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Clock className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-medium">{loc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={onBack} 
                className="bg-transparent border-border hover:bg-muted px-6 h-11"
              >
                ← Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!address.trim()}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl transition-all flex-1 h-11 font-semibold"
              >
                Continue →
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
