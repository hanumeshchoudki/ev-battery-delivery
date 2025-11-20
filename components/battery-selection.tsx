"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Battery, Zap, Clock, Shield } from "lucide-react"
import type { BatteryType } from "@/components/order-flow"

const batteries: BatteryType[] = [
  {
    id: "standard",
    name: "ನಮ್ಮ Charge Standard 60kWh",
    capacity: "60 kWh",
    voltage: "400V",
    price: 89,
    estimatedRange: "250 miles",
    image: "/electric-car-battery-pack.jpg",
    features: ["Fast Charging", "2 Year Warranty", "Eco-Friendly"],
  },
  {
    id: "premium",
    name: "ನಮ್ಮ Charge Premium 80kWh",
    capacity: "80 kWh",
    voltage: "800V",
    price: 129,
    estimatedRange: "350 miles",
    image: "/premium-electric-car-battery-pack.jpg",
    features: ["Ultra-Fast Charging", "3 Year Warranty", "Advanced BMS", "Temperature Control"],
  },
  {
    id: "pro",
    name: "ನಮ್ಮ Charge Pro 100kWh",
    capacity: "100 kWh",
    voltage: "800V",
    price: 179,
    estimatedRange: "450 miles",
    image: "/professional-electric-car-battery-pack.jpg",
    features: ["Lightning Charging", "5 Year Warranty", "AI Optimization", "Wireless Monitoring"],
  },
]

interface BatterySelectionProps {
  selectedBattery?: BatteryType
  onSelect: (battery: BatteryType) => void
}

export function BatterySelection({ selectedBattery, onSelect }: BatterySelectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
            Battery Pack
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Select the perfect battery for your electric vehicle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batteries.map((battery) => (
          <Card
            key={battery.id}
            className={`group p-4 bg-card/50 backdrop-blur-sm border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] ${
              selectedBattery?.id === battery.id 
                ? "border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/20" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelect(battery)}
          >
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={battery.image || "/placeholder.svg"}
                alt={battery.name}
                className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {battery.id === "premium" && (
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                  ⭐ Most Popular
                </Badge>
              )}
            </div>

            <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-1">
              {battery.name}
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-3 bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{battery.capacity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{battery.voltage}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{battery.estimatedRange}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Certified</span>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Features:</h4>
              <div className="flex flex-wrap gap-1.5">
                {battery.features.slice(0, 2).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs py-0.5">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">${battery.price}</div>
                <span className="text-xs text-muted-foreground">+ delivery</span>
              </div>
              <Button
                className={`transition-all text-sm h-9 ${
                  selectedBattery?.id === battery.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg"
                }`}
              >
                {selectedBattery?.id === battery.id ? "✓ Selected" : "Select"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
