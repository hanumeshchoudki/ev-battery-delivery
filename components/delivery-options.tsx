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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Choose{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
            Delivery Speed
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          All options include professional installation
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {deliveryOptions.map((option) => (
          <Card
            key={option.id}
            className={`group p-4 bg-card/50 backdrop-blur-sm border transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selectedOption?.id === option.id 
                ? "border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/20" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelect(option)}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  {option.id === "standard" && <Truck className="w-6 h-6 text-primary" />}
                  {option.id === "express" && <Zap className="w-6 h-6 text-primary" />}
                  {option.id === "instant" && <Star className="w-6 h-6 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-0.5">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{option.name}</h3>
                    {option.id === "express" && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md text-xs">
                        ⭐ Popular
                      </Badge>
                    )}
                    {option.id === "instant" && (
                      <Badge className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground border-0 shadow-md text-xs">
                        ⚡ Fastest
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{option.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-foreground">${option.price}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">fee</div>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex items-center gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="bg-transparent border-border hover:bg-muted px-6 h-11"
          >
            ← Back
          </Button>
          <Button
            onClick={() => selectedOption && onSelect(selectedOption)}
            disabled={!selectedOption}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl transition-all disabled:opacity-50 flex-1 h-11 font-semibold"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  )
}
