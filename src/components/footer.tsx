import Link from "next/link"; 

import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary rounded-full p-1.5">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">PawsHome</span>
            </div>
            <p className="text-gray-400 mb-4">Connecting loving homes with pets in need since 2010.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pets" className="text-gray-400 hover:text-white transition-colors">
                  Available Pets
                </Link>
              </li>
              <li>
                <Link href="/adopt" className="text-gray-400 hover:text-white transition-colors">
                  Adoption Process
                </Link>
              </li>
              <li>
                <Link href="/lost-found" className="text-gray-400 hover:text-white transition-colors">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pet Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on available pets and adoption events.
            </p>
            <div className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-gray-700 border-gray-600 text-white" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">123 Adoption Lane, Pet City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">info@pawshome.com</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} PawsHome. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

