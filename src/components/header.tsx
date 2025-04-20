"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Heart, Search, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-1.5">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">PawsHome</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/pets"
              className={`text-sm font-medium transition-colors ${
                isActive("/pets") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              Available Pets
            </Link>
            <Link
              to="/adopt"
              className={`text-sm font-medium transition-colors ${
                isActive("/adopt") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              Adoption Process
            </Link>
            <Link
              to="/lost-found"
              className={`text-sm font-medium transition-colors ${
                isActive("/lost-found") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              Lost & Found
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive("/contact") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Search and Login */}
          <div className="hidden md:flex items-center space-x-4">
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search pets..."
                  className="pl-10 w-40 lg:w-60 h-9"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Login / Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input type="text" placeholder="Search pets..." className="pl-10 w-full h-9" autoFocus />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link
                to="/"
                className={`text-sm font-medium ${isActive("/") ? "text-primary" : "text-gray-600"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/pets"
                className={`text-sm font-medium ${isActive("/pets") ? "text-primary" : "text-gray-600"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Available Pets
              </Link>
              <Link
                to="/adopt"
                className={`text-sm font-medium ${isActive("/adopt") ? "text-primary" : "text-gray-600"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Adoption Process
              </Link>
              <Link
                to="/lost-found"
                className={`text-sm font-medium ${isActive("/lost-found") ? "text-primary" : "text-gray-600"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Lost & Found
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "text-gray-600"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
              Login / Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

