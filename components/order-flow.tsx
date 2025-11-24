"use client"

import { useState } from "react"
import { BatterySelection } from "@/components/battery-selection"
import { LocationInput } from "@/components/location-input"
import { OrderSummary } from "@/components/order-summary"
import { DeliveryOptions } from "@/components/delivery-options"

export type BatteryType = {
  id: string
  name: string
  capacity: string
  voltage: string
  price: number
  estimatedRange: string
  image: string
  features: string[]
}

export type DeliveryOption = {
  id: string
  name: string
  time: string
  price: number
  description: string
}

export type OrderData = {
  battery?: BatteryType
  location?: {
    address: string
    coordinates: { lat: number; lng: number }
  }
  deliveryOption?: DeliveryOption
  totalPrice: number
}

const steps = ["Battery", "Location", "Delivery", "Summary"]

export function OrderFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [orderData, setOrderData] = useState<OrderData>({ totalPrice: 0 })

  const updateOrderData = (data: Partial<OrderData>) => {
    setOrderData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      index <= currentStep 
                        ? "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground shadow-lg shadow-primary/30" 
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  {index <= currentStep && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  )}
                </div>
                <span
                  className={`ml-2 text-xs font-semibold hidden sm:block ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="relative mx-3 sm:mx-4">
                    <div className="w-8 sm:w-16 h-0.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-500 ${
                          index < currentStep ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up">
          {currentStep === 0 && (
            <BatterySelection
              selectedBattery={orderData.battery}
              onSelect={(battery) => {
                updateOrderData({ battery, totalPrice: battery.price })
                nextStep()
              }}
            />
          )}

          {currentStep === 1 && (
            <LocationInput
              location={orderData.location}
              onLocationSet={(location) => {
                updateOrderData({ location })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === 2 && (
            <DeliveryOptions
              selectedOption={orderData.deliveryOption}
              onSelect={(deliveryOption) => {
                updateOrderData({
                  deliveryOption,
                  totalPrice: (orderData.battery?.price || 0) + deliveryOption.price,
                })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && <OrderSummary orderData={orderData} onBack={prevStep} />}
        </div>
      </div>
    </div>
  )
}
