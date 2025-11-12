"use client"

import { useEffect, useState } from "react"
import { Battery, Users, Truck, Zap } from "lucide-react"

const stats = [
  { icon: Battery, label: "Batteries Delivered", target: 15420, suffix: "+" },
  { icon: Users, label: "Happy Customers", target: 8750, suffix: "+" },
  { icon: Truck, label: "Cities Covered", target: 45, suffix: "" },
  { icon: Zap, label: "Avg Delivery Time", target: 15, suffix: " min" },
]

export function DynamicStats() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("dynamic-stats")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev]
          if (newCounts[index] < stat.target) {
            newCounts[index] = Math.min(newCounts[index] + Math.ceil(stat.target / 100), stat.target)
          }
          return newCounts
        })
      }, 50)
    })

    return () => intervals.forEach(clearInterval)
  }, [isVisible])

  return (
    <section id="dynamic-stats" className="py-20 bg-gradient-to-r from-background via-card/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group hover-glow rounded-lg p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-electric-pulse">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground text-glow mb-2">
                  {counts[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
