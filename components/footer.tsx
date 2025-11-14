import { Zap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 w-fit">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                ನಮ್ಮ Charge
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Revolutionary EV battery delivery platform providing instant, reliable, and eco-friendly charging
              solutions for the electric future.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/order" className="text-gray-600 hover:text-black transition-colors">
                  Battery Delivery
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-600 hover:text-black transition-colors">
                  Installation Service
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-600 hover:text-black transition-colors">
                  Battery Rental
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-600 hover:text-black transition-colors">
                  Maintenance Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/drive" className="text-gray-600 hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm">© 2025 ನಮ್ಮ Charge. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/help" className="text-gray-600 hover:text-black text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-black text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-black text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
