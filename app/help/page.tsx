"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, Clock, Search, HelpCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              How can we{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help..."
                className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-orange-500"
              />
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Get Quick Help</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription>24/7 Support Available</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-orange-600 mb-2">1800-123-4567</p>
                  <p className="text-sm text-gray-600">Free from any phone</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Instant Support</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">Start Chat</Button>
                  <p className="text-sm text-gray-600 mt-2">Average response: 2 minutes</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Detailed Assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-800 mb-2">support@nammacharge.com</p>
                  <p className="text-sm text-gray-600">Response within 4 hours</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">How does ನಮ್ಮ Charge work?</AccordionTrigger>
                  <AccordionContent>
                    Simply book a charging service through our app or website, select your location and battery type,
                    and our certified technician will come to you with professional charging equipment. The process
                    typically takes 30-90 minutes depending on your charging requirements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">What types of vehicles do you support?</AccordionTrigger>
                  <AccordionContent>
                    We support all types of electric vehicles including cars, bikes, scooters, and e-rickshaws. Our
                    technicians carry universal charging equipment compatible with most EV models available in India.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">How much does the service cost?</AccordionTrigger>
                  <AccordionContent>
                    Our pricing starts from ₹299 for standard charging (up to 50% battery). Premium charging (up to 80%)
                    costs ₹499, and full charging (100%) is ₹699. Business customers get special bulk pricing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">Is the service available 24/7?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we provide 24/7 service availability. However, late-night services (11 PM - 6 AM) may have
                    limited technician availability and slightly higher pricing due to operational costs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">How can I track my service request?</AccordionTrigger>
                  <AccordionContent>
                    Once you book a service, you'll receive a tracking link via SMS and email. You can see your
                    technician's real-time location, estimated arrival time, and service status updates throughout the
                    process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">What if I'm not satisfied with the service?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 100% satisfaction guarantee. If you're not happy with our service, contact our support
                    team within 24 hours and we'll either re-service your vehicle for free or provide a full refund.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">Can I schedule a service in advance?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can schedule services up to 7 days in advance. This is particularly useful for regular
                    maintenance charging or when you know you'll need service at a specific time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left">Do you provide emergency charging services?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer emergency charging services for vehicles that have completely run out of battery.
                    Emergency services are prioritized and typically arrive within 30-45 minutes in major cities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
              <p className="text-center text-gray-600 mb-8">
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>We typically respond within 4 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                    <Input placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                    <Input placeholder="What can we help you with?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <Textarea placeholder="Please describe your issue or question in detail..." rows={5} />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Hours */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Support Hours</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-orange-500 mb-2" />
                    <CardTitle>Customer Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-semibold">24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday - Sunday:</span>
                        <span className="font-semibold">24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency Support:</span>
                        <span className="font-semibold">Always Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <HelpCircle className="w-8 h-8 text-orange-500 mb-2" />
                    <CardTitle>Technical Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Phone Support:</span>
                        <span className="font-semibold">6 AM - 11 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Live Chat:</span>
                        <span className="font-semibold">24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Support:</span>
                        <span className="font-semibold">24/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
