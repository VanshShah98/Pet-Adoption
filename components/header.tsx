"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLoginClick = () => {
    router.push('/login')
  }

  const handleSignupClick = () => {
    router.push('/signup')
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/") // redirect to homepage after logout
  }

  const isActive = (path: string) => pathname === path

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-1.5">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">PawsHome</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["/", "/pets", "/adopt", "/lost-found", "/contact"].map((path, idx) => (
              <Link
                key={idx}
                href={path}
                className={`text-sm font-medium transition-colors ${isActive(path) ? "text-primary" : "text-gray-600 hover:text-primary"}`}
              >
                {path === "/" ? "Home" :
                 path === "/pets" ? "Available Pets" :
                 path === "/adopt" ? "Adoption Process" :
                 path === "/lost-found" ? "Lost & Found" : "Contact Us"}
              </Link>
            ))}
          </nav>

          {/* Desktop Search + Auth */}
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
              <button className="p-2 text-gray-600 hover:text-primary" onClick={() => setSearchOpen(true)}>
                <Search size={20} />
              </button>
            )}

            {/* Conditionally show buttons */}
            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-600 hover:text-primary">
              <Search size={20} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 hover:text-primary">
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
              {["/", "/pets", "/adopt", "/lost-found", "/contact"].map((path, idx) => (
                <Link
                  key={idx}
                  href={path}
                  className={`text-sm font-medium ${isActive(path) ? "text-primary" : "text-gray-600"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {path === "/" ? "Home" :
                   path === "/pets" ? "Available Pets" :
                   path === "/adopt" ? "Adoption Process" :
                   path === "/lost-found" ? "Lost & Found" : "Contact Us"}
                </Link>
              ))}
            </nav>
            {!isLoggedIn ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white mb-2"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button 
                  variant="default" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
