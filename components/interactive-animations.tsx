"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

export function InteractiveAnimations() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Interactive cursor trail */}
      <div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-blue-400/30 blur-sm transition-all duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(1.5)",
        }}
      />

      {/* Floating electric particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Sparkles
              className="w-4 h-4 text-blue-400/40 animate-pulse"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* Electric circuit lines */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="electric" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Animated circuit paths */}
          <path
            d="M0,100 Q200,50 400,100 T800,100"
            stroke="url(#electric)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            strokeDasharray="10,5"
          />
          <path
            d="M100,0 Q150,200 200,400 T300,800"
            stroke="url(#electric)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            strokeDasharray="15,10"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M800,200 Q600,300 400,200 T0,200"
            stroke="url(#electric)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            strokeDasharray="8,12"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Pulsing energy nodes */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[
          { top: "20%", left: "10%" },
          { top: "60%", right: "15%" },
          { bottom: "30%", left: "20%" },
          { top: "40%", right: "30%" },
        ].map((position, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-400 rounded-full animate-electric-pulse"
            style={{
              ...position,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Matrix-style falling code */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-matrix-rain"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="mb-2">
                {Math.random().toString(36).substr(2, 1)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
