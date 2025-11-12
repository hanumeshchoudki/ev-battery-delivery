import { Card } from "@/components/ui/card"
import { Smartphone, MapPin, Truck, Battery } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Order via App",
    description: "Open the ನಮ್ಮ Charge app, select your battery type, and place your order with one tap.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Real-Time Matching",
    description: "Our AI instantly matches you with the nearest delivery driver carrying your battery type.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Fast Delivery",
    description: "Track your driver in real-time as they deliver your premium battery in under 15 minutes.",
  },
  {
    icon: Battery,
    step: "04",
    title: "Professional Installation",
    description: "Our certified technician installs and tests your new battery, ensuring optimal performance.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Get your EV powered up in four simple steps with our revolutionary delivery system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 group h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
