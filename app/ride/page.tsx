"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Clock, MapPin, Shield } from "lucide-react"
import Link from "next/link"

export default function RidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get Your EV{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Charged</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              On-demand battery charging service for your electric vehicle. Professional technicians come to you.
            </p>
            <Link href="/order">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full">
                Book Charging Service
              </Button>
            </Link>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Service Requirements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Battery className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Vehicle Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Electric Cars</li>
                    <li>• Electric Bikes</li>
                    <li>• Electric Scooters</li>
                    <li>• E-Rickshaws</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Location Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Safe parking space</li>
                    <li>• Vehicle accessibility</li>
                    <li>• Clear address details</li>
                    <li>• Contact availability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Service Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 24/7 availability</li>
                    <li>• 30-90 min charging</li>
                    <li>• Emergency service</li>
                    <li>• Scheduled charging</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Safety Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Certified technicians</li>
                    <li>• Insurance coverage</li>
                    <li>• Safety protocols</li>
                    <li>• Quality guarantee</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Standard Charge</CardTitle>
                  <CardDescription>Up to 50% battery</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">₹299</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• 30-45 minutes</li>
                    <li>• Basic safety check</li>
                    <li>• Service guarantee</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-500 bg-orange-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Premium Charge</CardTitle>
                  <CardDescription>Up to 80% battery</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">₹499</div>
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm mt-2">Most Popular</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• 45-60 minutes</li>
                    <li>• Complete diagnostics</li>
                    <li>• Priority support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Full Charge</CardTitle>
                  <CardDescription>100% battery</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">₹699</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• 60-90 minutes</li>
                    <li>• Full system check</li>
                    <li>• Extended warranty</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Book Service</h3>
                <p className="text-gray-600 text-sm">Select your location and charging requirements</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Technician Assigned</h3>
                <p className="text-gray-600 text-sm">Certified professional heads to your location</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Safe Charging</h3>
                <p className="text-gray-600 text-sm">Professional charging with safety protocols</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Ready to Go</h3>
                <p className="text-gray-600 text-sm">Your vehicle is charged and ready</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
