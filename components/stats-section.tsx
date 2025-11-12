import { Card } from "@/components/ui/card"

const stats = [
  {
    number: "50K+",
    label: "Batteries Delivered",
    description: "Successfully powered EVs across the city",
  },
  {
    number: "12 min",
    label: "Average Delivery Time",
    description: "Fastest EV battery service in the market",
  },
  {
    number: "99.8%",
    label: "Customer Satisfaction",
    description: "Rated excellent by our users",
  },
  {
    number: "24/7",
    label: "Service Availability",
    description: "Round-the-clock battery delivery support",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Join the electric revolution with proven results and exceptional service quality
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 text-center group"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
