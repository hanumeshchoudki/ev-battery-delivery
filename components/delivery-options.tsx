"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Zap, Clock, Star } from "lucide-react"
import type { DeliveryOption } from "@/components/order-flow"

const deliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    time: "15-20 minutes",
    price: 15,
    description: "Professional installation included with certified technician",
  },
  {
    id: "express",
    name: "Express Delivery",
    time: "8-12 minutes",
    price: 25,
    description: "Priority delivery with premium installation service",
  },
  {
    id: "instant",
    name: "Instant Delivery",
    time: "3-5 minutes",
    price: 45,
    description: "Emergency service with immediate response and expert installation",
  },
]

interface DeliveryOptionsProps {
  selectedOption?: DeliveryOption
  onSelect: (option: DeliveryOption) => void
  onBack: () => void
}

export function DeliveryOptions({ selectedOption, onSelect, onBack }: DeliveryOptionsProps) {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choose{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Delivery Speed
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select your preferred delivery time. All options include professional installation.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {deliveryOptions.map((option) => (
          <Card
            key={option.id}
            className={`p-6 bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:bg-card/70 cursor-pointer ${
              selectedOption?.id === option.id ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
            onClick={() => onSelect(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  {option.id === "standard" && <Truck className="w-6 h-6 text-primary" />}
                  {option.id === "express" && <Zap className="w-6 h-6 text-primary" />}
                  {option.id === "instant" && <Star className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{option.name}</h3>
                    {option.id === "express" && (
                      <Badge className="bg-secondary text-secondary-foreground">Popular</Badge>
                    )}
                    {option.id === "instant" && <Badge className="bg-primary text-primary-foreground">Fastest</Badge>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{option.time}</span>
                    </div>
                    <span>•</span>
                    <span>{option.description}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-foreground">${option.price}</div>
                <div className="text-sm text-muted-foreground">delivery fee</div>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex items-center justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="bg-transparent border-border hover:bg-card">
            Back
          </Button>
          <Button
            onClick={() => selectedOption && onSelect(selectedOption)}
            disabled={!selectedOption}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue to Summary
          </Button>
        </div>
      </div>
    </div>
  )
}
