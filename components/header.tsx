"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-check"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { user, logout } = useAuth()

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <header className="w-full z-50 bg-white border-b border-gray-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
                {/* Battery body */}
                <rect
                  x="8"
                  y="12"
                  width="20"
                  height="16"
                  rx="3"
                  fill="url(#batteryGradient)"
                  stroke="#fff"
                  strokeWidth="1"
                />
                {/* Battery tip */}
                <rect x="28" y="16" width="4" height="8" rx="2" fill="url(#batteryGradient)" />
                {/* Lightning bolt */}
                <path
                  d="M16 8 L12 20 L18 20 L14 32 L24 16 L18 16 L22 8 Z"
                  fill="url(#lightningGradient)"
                  stroke="#fff"
                  strokeWidth="0.5"
                />
                {/* Energy particles */}
                <circle cx="32" cy="10" r="2" fill="#10b981" className="animate-ping" />
                <circle cx="6" cy="30" r="1.5" fill="#f59e0b" className="animate-pulse" />
                <circle cx="34" cy="32" r="1" fill="#ef4444" className="animate-bounce" />

                <defs>
                  <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Status indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border border-white animate-pulse shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
                ನಮ್ಮ Charge
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-widest -mt-1">POWER ON DEMAND</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("ride")}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                Ride <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === "ride" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/ride" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Book a Ride
                  </Link>
                  <Link href="/ride#pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pricing
                  </Link>
                  <Link href="/ride#requirements" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Requirements
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("drive")}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                Drive <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === "drive" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/drive" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Become a Driver
                  </Link>
                  <Link href="/drive#requirements" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Driver Requirements
                  </Link>
                  <Link href="/drive#earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Earnings
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("business")}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                Business <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === "business" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Business Solutions
                  </Link>
                  <Link href="/business#fleet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Fleet Management
                  </Link>
                  <Link href="/business#pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Enterprise Pricing
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-600 hover:text-black transition-colors hover:underline">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/help">
              <Button variant="ghost" className="text-black hover:bg-gray-100 transition-all hover:scale-105">
                Help
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-black hover:bg-gray-100 transition-all hover:scale-105"
                  onClick={logout}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-black hover:bg-gray-100 transition-all hover:scale-105">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 transition-all hover:scale-105 hover:shadow-lg">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <div className="space-y-2">
                <Link href="/ride" className="block text-gray-600 hover:text-black transition-colors py-2">
                  Ride - Book a Ride
                </Link>
                <Link
                  href="/ride#pricing"
                  className="block text-sm text-gray-500 hover:text-gray-700 transition-colors pl-4"
                >
                  Pricing
                </Link>
              </div>

              <div className="space-y-2">
                <Link href="/drive" className="block text-gray-600 hover:text-black transition-colors py-2">
                  Drive - Become a Driver
                </Link>
                <Link
                  href="/drive#requirements"
                  className="block text-sm text-gray-500 hover:text-gray-700 transition-colors pl-4"
                >
                  Requirements
                </Link>
              </div>

              <div className="space-y-2">
                <Link href="/business" className="block text-gray-600 hover:text-black transition-colors py-2">
                  Business Solutions
                </Link>
                <Link
                  href="/business#fleet"
                  className="block text-sm text-gray-500 hover:text-gray-700 transition-colors pl-4"
                >
                  Fleet Management
                </Link>
              </div>

              <Link href="/about" className="text-gray-600 hover:text-black transition-colors py-2">
                About
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link href="/help">
                  <Button variant="ghost" className="text-black hover:bg-gray-100 justify-start w-full">
                    Help
                  </Button>
                </Link>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{user.name}</span>
                    </div>
                    <Button variant="ghost" className="text-black hover:bg-gray-100" onClick={logout}>
                      Log out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="text-black hover:bg-gray-100">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {activeDropdown && <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />}
    </header>
  )
}
