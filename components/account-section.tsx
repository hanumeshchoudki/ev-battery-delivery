"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "./auth-check"
import { User, Clock, CreditCard, HeadphonesIcon } from "lucide-react"

export function AccountSection() {
  const { user, logout } = useAuth()

  if (user) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-black">Welcome back, {user.name}!</h2>
              <p className="text-lg text-gray-600">
                Manage your account, view past services, and access support resources.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Clock className="w-6 h-6 text-black mb-2" />
                  <h3 className="font-semibold text-black">Recent Services</h3>
                  <p className="text-sm text-gray-600">View your service history</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <CreditCard className="w-6 h-6 text-black mb-2" />
                  <h3 className="font-semibold text-black">Payment Methods</h3>
                  <p className="text-sm text-gray-600">Manage your payments</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <User className="w-6 h-6 text-black mb-2" />
                  <h3 className="font-semibold text-black">Profile Settings</h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <HeadphonesIcon className="w-6 h-6 text-black mb-2" />
                  <h3 className="font-semibold text-black">Support</h3>
                  <p className="text-sm text-gray-600">Get help when needed</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg">
                  View Account Details
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-black px-8 py-3 rounded-lg bg-transparent hover:bg-gray-50"
                  onClick={logout}
                >
                  Log out
                </Button>
              </div>
            </div>
            <div className="lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <video
                  className="w-full h-64 object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/ev-charging-thumbnail.jpg"
                >
                  <source src="/small-ev-promo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  LIVE
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">ನಮ್ಮ Charge in Action</h3>
                  <p className="text-white/90 text-sm">Fast EV battery delivery service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-black">Log in to see your account details</h2>
            <p className="text-lg text-gray-600">View past services, payment methods, support resources, and more.</p>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg">
                  Log in to your account
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  variant="outline"
                  className="border-gray-300 text-black px-8 py-3 rounded-lg bg-transparent hover:bg-gray-50"
                >
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:block">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video className="w-full h-80 object-cover rounded-lg" autoPlay muted loop playsInline>
                <source src="/ev-future-promo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Join the EV Revolution</h3>
                  <p className="text-lg mb-4">
                    Discover how ನಮ್ಮ Charge is transforming electric vehicle charging across Karnataka!
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
