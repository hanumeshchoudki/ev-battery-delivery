"use client"

import { useEffect, useState } from "react"
import { Battery, Zap, Truck, Leaf } from "lucide-react"

const floatingIcons = [Battery, Zap, Truck, Leaf]

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      Icon: any
      x: number
      y: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: floatingIcons[Math.floor(Math.random() * floatingIcons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        const Icon = element.Icon
        return (
          <div
            key={element.id}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )
      })}
    </div>
  )
}
