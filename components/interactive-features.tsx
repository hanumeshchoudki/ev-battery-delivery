"use client"

import { useState } from "react"
import { Battery, Truck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Battery,
    title: "Premium EV Batteries",
    description: "High-capacity lithium-ion batteries with 5-year warranty",
    image: "/tesla-battery-pack.jpg",
    details: ["500+ mile range", "Fast charging compatible", "Eco-friendly materials"],
  },
  {
    icon: Truck,
    title: "Lightning Fast Delivery",
    description: "15-minute average delivery time across all major cities",
    image: "/delivery-truck-ev.jpg",
    details: ["GPS tracking", "Professional installation", "24/7 availability"],
  },
  {
    icon: Zap,
    title: "Instant Charging",
    description: "Professional on-site charging and installation service",
    image: "/charging-service.jpg",
    details: ["Certified technicians", "Safety guaranteed", "Multiple payment options"],
  },
]

export function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-glow">Revolutionary EV Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of electric vehicle maintenance with our cutting-edge services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-primary/10 border-primary animate-electric-pulse"
                      : "bg-card/50 border-border hover:border-primary/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        activeFeature === index ? "bg-primary/20" : "bg-muted/50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${activeFeature === index ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      {activeFeature === index && (
                        <div className="space-y-2 animate-fade-in-up">
                          {feature.details.map((detail, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm text-foreground">{detail}</span>
                            </div>
                          ))}
                          <Button size="sm" className="mt-4">
                            Learn More
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="w-full h-full bg-muted/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    {(() => {
                      const Icon = features[activeFeature].icon
                      return <Icon className="w-12 h-12 text-primary" />
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{features[activeFeature].title}</h3>
                  <p className="text-muted-foreground">Click features to explore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
