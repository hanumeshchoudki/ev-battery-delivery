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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-all ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
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
