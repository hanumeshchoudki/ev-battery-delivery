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
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Battery Pack</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect battery for your electric vehicle from our premium collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {batteries.map((battery) => (
          <Card
            key={battery.id}
            className={`p-6 bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:bg-card/70 cursor-pointer ${
              selectedBattery?.id === battery.id ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
            onClick={() => onSelect(battery)}
          >
            <div className="relative mb-6">
              <img
                src={battery.image || "/placeholder.svg"}
                alt={battery.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              {battery.id === "premium" && (
                <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">Most Popular</Badge>
              )}
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">{battery.name}</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
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

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Features:</h4>
              <div className="flex flex-wrap gap-2">
                {battery.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-foreground">${battery.price}</span>
                <span className="text-sm text-muted-foreground ml-1">+ delivery</span>
              </div>
              <Button
                className={`${
                  selectedBattery?.id === battery.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                }`}
              >
                {selectedBattery?.id === battery.id ? "Selected" : "Select"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
