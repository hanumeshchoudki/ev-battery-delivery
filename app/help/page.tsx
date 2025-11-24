import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle, HelpCircle, FileText, Shield } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">How Can We Help?</h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to common questions or get in touch with our support team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Get Support</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <a href="tel:+918001234567" className="text-blue-600 hover:underline">
                  +91 800 123 4567
                </a>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Response within 24 hours</p>
                <a href="mailto:support@nammacharge.com" className="text-blue-600 hover:underline">
                  support@nammacharge.com
                </a>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Instant assistance</p>
                <Button variant="link" className="text-blue-600">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  How does ನಮ್ಮ Charge work?
                </h3>
                <p className="text-gray-600 ml-7">
                  Simply request a charge through our app, and a certified provider will come to your location with mobile charging equipment. You can track their arrival and charging progress in real-time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  How much does it cost?
                </h3>
                <p className="text-gray-600 ml-7">
                  Pricing varies based on the charge level you select and your location. You'll see the exact price before confirming your order. Typical charges range from ₹500-₹2000 depending on the battery capacity and charge level.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  How long does charging take?
                </h3>
                <p className="text-gray-600 ml-7">
                  Charging time depends on your battery capacity and the charge level selected. A typical 20-40% charge takes 15-30 minutes, while a 60-80% charge may take 45-60 minutes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  What areas do you serve?
                </h3>
                <p className="text-gray-600 ml-7">
                  We currently operate in major cities across India including Bangalore, Mumbai, Delhi, Hyderabad, and Chennai. We're expanding to more cities soon!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  Is it safe to charge my vehicle this way?
                </h3>
                <p className="text-gray-600 ml-7">
                  Absolutely! All our providers are certified professionals using approved charging equipment. We follow all safety standards and protocols to ensure your vehicle is charged safely.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  Can I schedule a charge in advance?
                </h3>
                <p className="text-gray-600 ml-7">
                  Yes! You can schedule a charge up to 7 days in advance. This is perfect for regular charging needs or when you know you'll need a charge at a specific time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 ml-7">
                  We accept all major credit/debit cards, UPI, digital wallets, and net banking. Payment is securely processed through our app.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  What if I need to cancel my order?
                </h3>
                <p className="text-gray-600 ml-7">
                  You can cancel your order anytime before the provider arrives. If cancelled after the provider has been dispatched, a small cancellation fee may apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Guide</h3>
                <p className="text-gray-600 mb-4">Step-by-step instructions</p>
                <Button asChild variant="link" className="text-blue-600">
                  <Link href="/guide">View Guide</Link>
                </Button>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safety Guidelines</h3>
                <p className="text-gray-600 mb-4">Important safety information</p>
                <Button asChild variant="link" className="text-blue-600">
                  <Link href="/safety">Learn More</Link>
                </Button>
              </div>
              <div className="text-center">
                <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
                <p className="text-gray-600 mb-4">Browse all help articles</p>
                <Button asChild variant="link" className="text-blue-600">
                  <Link href="/kb">Browse Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our support team is here to help you 24/7
              </p>
              <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg">
                <Link href="mailto:support@nammacharge.com">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
