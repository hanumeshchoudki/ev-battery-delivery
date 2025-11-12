"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Battery, Globe, Heart, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                ನಮ್ಮ Charge
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're revolutionizing EV charging in India by bringing professional charging services directly to your
              location. Founded in Bangalore, we're committed to making electric mobility accessible and convenient for
              everyone.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    To accelerate India's transition to electric mobility by providing reliable, convenient, and
                    affordable on-demand charging services that eliminate range anxiety and make EV ownership
                    effortless.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader className="text-center">
                  <Globe className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    To become India's leading on-demand EV charging platform, creating a sustainable future where
                    electric vehicles are the preferred choice for transportation across the country.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">50,000+</div>
                <p className="text-gray-600">Vehicles Charged</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">1,200+</div>
                <p className="text-gray-600">Active Drivers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">99.8%</div>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Safety First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every charging service follows strict safety protocols with certified technicians and quality
                    equipment.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Customer Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We put our customers first, providing transparent pricing, reliable service, and 24/7 support.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Battery className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Continuously improving our technology and services to make EV charging more efficient and
                    accessible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">RK</span>
                  </div>
                  <CardTitle>Rajesh Kumar</CardTitle>
                  <p className="text-gray-600">CEO & Founder</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Former Tesla engineer with 15+ years in EV technology and sustainable transportation.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">PS</span>
                  </div>
                  <CardTitle>Priya Sharma</CardTitle>
                  <p className="text-gray-600">CTO</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Tech veteran from Flipkart and Ola, specializing in scalable mobile platforms and logistics.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AM</span>
                  </div>
                  <CardTitle>Arjun Menon</CardTitle>
                  <p className="text-gray-600">COO</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Operations expert from Swiggy with deep experience in on-demand service delivery at scale.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Best EV Startup 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Economic Times Startup Awards</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Green Innovation Award</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Karnataka Government</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Top 50 Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">YourStory Tech30</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Customer Choice Award</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">India Mobile Congress</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of India's electric mobility revolution. Whether as a customer, driver, or partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg rounded-full bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
