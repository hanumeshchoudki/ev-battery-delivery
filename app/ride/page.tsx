import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Battery, MapPin, Clock, Shield, Zap, CreditCard } from "lucide-react"
import Link from "next/link"

export default function RidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Get Charged On-Demand
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Never worry about running out of charge again. We bring the power to you, wherever you are.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                  <Link href="/order">Order Now</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Request Service</h3>
                <p className="text-gray-600">Enter your location and select your charging needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Provider Arrives</h3>
                <p className="text-gray-600">A certified provider arrives at your location with mobile charging equipment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Get Charged</h3>
                <p className="text-gray-600">Your vehicle is charged while you wait or go about your day</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose ನಮ್ಮ Charge?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast & Convenient</h3>
                <p className="text-gray-600">Get charged on-demand, exactly when and where you need it</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certified Providers</h3>
                <p className="text-gray-600">All our providers are trained and certified professionals</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CreditCard className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">Know exactly what you'll pay before you book</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <MapPin className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track in Real-Time</h3>
                <p className="text-gray-600">Monitor your provider's arrival and charging progress</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Battery className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multiple Charge Levels</h3>
                <p className="text-gray-600">Choose from quick top-ups to full charges</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Emergency Service</h3>
                <p className="text-gray-600">Stuck with a dead battery? We're here to help 24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Charged?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of satisfied customers who never worry about running out of charge.
              </p>
              <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                <Link href="/order">Book Your Charge Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
