import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Tent, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/textures/forest-pattern.png')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="reveal">
            <div className="flex items-center gap-2 mb-6">
              <Tent className="h-8 w-8 text-forest-400" />
              <span className="font-serif font-bold text-2xl text-white">OGCamping</span>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Premium camping services at Tri An Lake. Experience nature with comfort and expert support.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-forest-400 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-forest-400 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-forest-400 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl font-serif font-semibold text-white mb-6 border-b border-gray-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Services
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="reveal" style={{ animationDelay: "200ms" }}>
            <h3 className="text-xl font-serif font-semibold text-white mb-6 border-b border-gray-800 pb-2">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/weekend-escape"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Weekend Escape
                </Link>
              </li>
              <li>
                <Link
                  href="/services/family-adventure"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Family Adventure
                </Link>
              </li>
              <li>
                <Link
                  href="/services/group-expedition"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Group Expedition
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-packages"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Custom Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/services/equipment-rental"
                  className="text-gray-400 hover:text-forest-400 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Equipment Rental
                </Link>
              </li>
            </ul>
          </div>

          <div className="reveal" style={{ animationDelay: "300ms" }}>
            <h3 className="text-xl font-serif font-semibold text-white mb-6 border-b border-gray-800 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-forest-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">590 Cach Mang Thang 8, District 3, Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-forest-400" />
                <span className="text-gray-400">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-forest-400" />
                <span className="text-gray-400">info@ogcamping.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} OGCamping Private. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
