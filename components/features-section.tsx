import { Card } from "@/components/ui/card"
import { Shield, Clock, MapPin, CreditCard, Smartphone, Recycle } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Lightning Fast Delivery",
    description: "Get your EV battery delivered in under 15 minutes with our advanced logistics network.",
  },
  {
    icon: Shield,
    title: "Premium Quality Guaranteed",
    description: "All batteries are tested, certified, and come with comprehensive warranty coverage.",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Track your delivery driver in real-time and get precise arrival estimates.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    description: "Pay per use, subscribe monthly, or choose our eco-friendly battery rental plans.",
  },
  {
    icon: Smartphone,
    title: "Smart App Integration",
    description: "Seamlessly integrated mobile app with one-tap ordering and battery monitoring.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Solutions",
    description: "Sustainable battery recycling program and carbon-neutral delivery fleet.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Revolutionary EV{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Battery Service
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Experience the future of electric vehicle charging with our cutting-edge battery delivery platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
