"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Clock, DollarSign, Shield, Truck, Users } from "lucide-react"

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                ನಮ್ಮ Charge
              </span>{" "}
              for Business
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Fleet charging solutions for businesses. Keep your electric vehicles powered and productive.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full">
              Get Business Quote
            </Button>
          </div>
        </section>

        {/* Business Solutions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Business Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Fleet Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Delivery fleets</li>
                    <li>• Taxi/cab services</li>
                    <li>• Corporate vehicles</li>
                    <li>• Logistics companies</li>
                    <li>• E-commerce delivery</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Building className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Corporate Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Employee vehicle charging</li>
                    <li>• Office parking lots</li>
                    <li>• Company car fleets</li>
                    <li>• Executive vehicles</li>
                    <li>• Business partnerships</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Service Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Hotels & resorts</li>
                    <li>• Shopping malls</li>
                    <li>• Restaurants</li>
                    <li>• Event venues</li>
                    <li>• Service centers</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Business Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Business Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Shield className="w-12 h-12 text-orange-500 mb-4" />
                  <CardTitle>Documentation Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Business registration certificate</li>
                    <li>• GST registration number</li>
                    <li>• Company PAN card</li>
                    <li>• Authorized signatory details</li>
                    <li>• Fleet vehicle registration</li>
                    <li>• Insurance certificates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Clock className="w-12 h-12 text-orange-500 mb-4" />
                  <CardTitle>Service Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Minimum 5 vehicles for fleet pricing</li>
                    <li>• Dedicated account manager</li>
                    <li>• Priority service scheduling</li>
                    <li>• 24/7 emergency support</li>
                    <li>• Monthly billing cycles</li>
                    <li>• Service level agreements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Business Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <CardDescription>5-20 vehicles</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">₹250/service</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Standard charging</li>
                    <li>• Business hours support</li>
                    <li>• Monthly billing</li>
                    <li>• Basic reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-500 bg-orange-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <CardDescription>21-50 vehicles</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">₹200/service</div>
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm mt-2">Most Popular</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Priority charging</li>
                    <li>• 24/7 support</li>
                    <li>• Dedicated manager</li>
                    <li>• Advanced analytics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription>50+ vehicles</CardDescription>
                  <div className="text-3xl font-bold text-orange-600 mt-4">Custom</div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Custom pricing</li>
                    <li>• SLA guarantees</li>
                    <li>• API integration</li>
                    <li>• White-label options</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ನಮ್ಮ Charge for Business?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cost Effective</h3>
                <p className="text-gray-600 text-sm">Reduce operational costs with bulk pricing</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Time Saving</h3>
                <p className="text-gray-600 text-sm">On-site charging saves travel time</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Reliable Service</h3>
                <p className="text-gray-600 text-sm">Guaranteed service levels and support</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dedicated Support</h3>
                <p className="text-gray-600 text-sm">Personal account manager for your business</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Power Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">Get a custom quote for your fleet charging needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full">
                Request Quote
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg rounded-full bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
