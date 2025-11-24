import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Building2, Users, BarChart3, Shield, Headphones, Zap } from "lucide-react"
import Link from "next/link"

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                ನಮ್ಮ Charge for Business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Keep your fleet charged and running. Enterprise-grade EV charging solutions for businesses of all sizes.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Enterprise Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg border border-purple-100">
                <Building2 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fleet Management</h3>
                <p className="text-gray-600 mb-4">Manage charging for your entire fleet with centralized dashboard and reporting</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time fleet monitoring</li>
                  <li>• Scheduled charging services</li>
                  <li>• Priority provider matching</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg border border-purple-100">
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
                <p className="text-gray-600 mb-4">Make data-driven decisions with comprehensive analytics and reporting</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Usage analytics</li>
                  <li>• Cost optimization insights</li>
                  <li>• Custom reports</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg border border-purple-100">
                <Headphones className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                <p className="text-gray-600 mb-4">24/7 enterprise support with dedicated account management</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dedicated account manager</li>
                  <li>• Priority customer support</li>
                  <li>• Custom SLA agreements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Why Businesses Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Zap className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Minimize Downtime</h3>
                <p className="text-gray-600">Keep your fleet operational with on-demand charging services</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reduce Costs</h3>
                <p className="text-gray-600">Lower operating costs compared to traditional charging infrastructure</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compliance Ready</h3>
                <p className="text-gray-600">Meet sustainability goals and regulatory requirements</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Scalable Solution</h3>
                <p className="text-gray-600">Grow your fleet without worrying about charging infrastructure</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Building2 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Billing</h3>
                <p className="text-gray-600">Flexible payment terms and consolidated monthly billing</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Headphones className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock support for your business operations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">Business Plans</h2>
            <p className="text-center text-gray-600 mb-12">Choose the plan that fits your business needs</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="border-2 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-2">Standard</h3>
                <p className="text-gray-600 mb-4">For small fleets</p>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Up to 10 vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Email support</span>
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
              <div className="border-2 border-purple-600 rounded-lg p-8 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-gray-600 mb-4">For growing businesses</p>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Up to 50 vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
              <div className="border-2 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For large fleets</p>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Unlimited vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Custom analytics & API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Custom SLA</span>
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Power Your Fleet?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Contact our business team to discuss your specific needs and get a custom quote.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                  <Link href="mailto:business@nammacharge.com">Email Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
