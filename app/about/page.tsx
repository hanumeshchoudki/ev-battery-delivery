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
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="group relative overflow-hidden rounded-3xl bg-white p-10 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To accelerate India's transition to electric mobility by providing reliable, convenient, and
                    affordable on-demand charging services that eliminate range anxiety and make EV ownership
                    effortless.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl bg-white p-10 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To become India's leading on-demand EV charging platform, creating a sustainable future where
                    electric vehicles are the preferred choice for transportation across the country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Impact</h2>
            <p className="text-center text-white/90 mb-16 text-lg">Making a difference in India's EV ecosystem</p>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-3">50,000+</div>
                  <p className="text-white/90 font-medium">Vehicles Charged</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-3">1,200+</div>
                  <p className="text-white/90 font-medium">Active Drivers</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-3">25+</div>
                  <p className="text-white/90 font-medium">Cities Covered</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-3">99.8%</div>
                  <p className="text-white/90 font-medium">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Our Core Values</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <Shield className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">Safety First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every charging service follows strict safety protocols with certified technicians and premium quality equipment.
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <Users className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer Centric</h3>
                <p className="text-gray-600 leading-relaxed">
                  We put our customers first with transparent pricing, reliable service, and 24/7 dedicated support.
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <Battery className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation Driven</h3>
                <p className="text-gray-600 leading-relaxed">
                  Continuously improving our technology and services to make EV charging more efficient and accessible.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
