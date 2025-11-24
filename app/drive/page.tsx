import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { DollarSign, Car, TrendingUp, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function DrivePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Become a Charging Provider
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Turn your vehicle and time into income. Join our network of certified charging providers and earn on your schedule.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                  <Link href="/auth/signup">Start Earning Today</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                  <Link href="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings Potential */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Unlimited Earning Potential</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">₹500+</div>
                <div className="text-gray-600">Per Charge</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">Flexible</div>
                <div className="text-gray-600">Set Your Hours</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">Weekly</div>
                <div className="text-gray-600">Payouts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section id="learn-more" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">What You Need to Get Started</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Car className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vehicle with Charging Equipment</h3>
                <p className="text-gray-600">Own or lease a vehicle equipped with mobile EV charging capabilities</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Valid Documentation</h3>
                <p className="text-gray-600">Driver's license, vehicle registration, and insurance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Background Check</h3>
                <p className="text-gray-600">Pass a simple background verification for customer safety</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Availability</h3>
                <p className="text-gray-600">Work when you want - full-time, part-time, or on weekends</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Provider Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <DollarSign className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Competitive Earnings</h3>
                <p className="text-gray-600">Earn more than traditional delivery or ride-sharing services</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growing Market</h3>
                <p className="text-gray-600">Tap into the rapidly expanding EV market</p>
              </div>
              <div className="text-center">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
                <p className="text-gray-600">Protected while on active service</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sign Up & Get Verified</h3>
                  <p className="text-gray-600">Complete the application and verification process</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Go Online</h3>
                  <p className="text-gray-600">Turn on the app when you're ready to accept charging requests</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accept Requests</h3>
                  <p className="text-gray-600">Get notified of nearby charging requests and choose which ones to accept</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Provide Service & Get Paid</h3>
                  <p className="text-gray-600">Charge the customer's vehicle and receive payment instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our growing network of charging providers and start earning today.
              </p>
              <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                <Link href="/auth/signup">Apply Now</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">No signup fees • Free training provided</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
