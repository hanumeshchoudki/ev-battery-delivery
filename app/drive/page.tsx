"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Clock, DollarSign, MapPin, Shield, Users } from "lucide-react"

export default function DrivePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Drive with{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                ನಮ್ಮ Charge
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our network of professional charging technicians. Earn money by providing on-demand EV charging
              services.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full">
              Start Driving
            </Button>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Driver Requirements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Legal Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Valid driving license</li>
                    <li>• Age 21+ years</li>
                    <li>• Clean driving record</li>
                    <li>• Background verification</li>
                    <li>• Aadhaar & PAN card</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Car className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Vehicle Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Service vehicle/bike</li>
                    <li>• Valid registration</li>
                    <li>• Insurance coverage</li>
                    <li>• Good condition</li>
                    <li>• Storage space for equipment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Skills & Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Basic electrical knowledge</li>
                    <li>• Customer service skills</li>
                    <li>• Safety training completion</li>
                    <li>• Mobile app proficiency</li>
                    <li>• Local area knowledge</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Earnings Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Earning Potential</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Per Service</CardTitle>
                  <div className="text-3xl font-bold text-green-600">₹150-350</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Earn per charging service completed</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Daily Earnings</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">₹1,500-3,000</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Average daily earnings for active drivers</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>Monthly Potential</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">₹45,000+</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Full-time drivers monthly earnings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Apply Online</h3>
                <p className="text-gray-600 text-sm">Submit your application with required documents</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Background Check</h3>
                <p className="text-gray-600 text-sm">We verify your documents and driving history</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Training Program</h3>
                <p className="text-gray-600 text-sm">Complete safety and technical training</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Start Earning</h3>
                <p className="text-gray-600 text-sm">Get approved and start accepting service requests</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of drivers already earning with ನಮ್ಮ Charge</p>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full">
              Apply Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
