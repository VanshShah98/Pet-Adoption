"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Menu,
  X,
  Heart,
  FileText,
  Home,
  Check,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PetAdoptionHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentLostPetIndex, setCurrentLostPetIndex] = useState(0)

  // Sample featured pets data
  const featuredPets = [
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      age: "2 years",
      description: "Friendly and energetic dog who loves to play fetch.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Siamese Cat",
      age: "1 year",
      description: "Gentle and affectionate cat who loves to cuddle.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle",
      age: "3 years",
      description: "Curious and playful dog with a great sense of smell.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      name: "Bella",
      breed: "Maine Coon",
      age: "4 years",
      description: "Majestic and friendly cat who gets along with everyone.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  // Sample lost pets data
  const lostPets = [
    {
      id: 1,
      name: "Rocky",
      lastSeen: "Downtown, Main Street",
      date: "June 15, 2025",
      description: "Brown and white Shih Tzu with a red collar.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Mittens",
      lastSeen: "Oak Park",
      date: "June 18, 2025",
      description: "Black cat with white paws and a blue collar with bell.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Buddy",
      lastSeen: "Riverside Apartments",
      date: "June 20, 2025",
      description: "Tan Labrador with a green collar and name tag.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      pet: "Max",
      text: "Adopting Max was the best decision we ever made. He's brought so much joy to our family!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      pet: "Luna",
      text: "The adoption process was smooth and the staff was incredibly helpful. Luna has been the perfect addition to our home.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      pet: "Charlie",
      text: "We can't imagine our lives without Charlie now. Thank you for helping us find our perfect companion!",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Carousel navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const nextLostPet = () => {
    setCurrentLostPetIndex((prev) => (prev === lostPets.length - 1 ? 0 : prev + 1))
  }

  const prevLostPet = () => {
    setCurrentLostPetIndex((prev) => (prev === 0 ? lostPets.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-1.5">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-primary">PawsHome</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-primary font-medium">
                Home
              </Link>
              <Link href="/pets" className="text-gray-600 hover:text-primary transition-colors">
                Available Pets
              </Link>
              <Link href="/process" className="text-gray-600 hover:text-primary transition-colors">
                Adoption Process
              </Link>
              <Link href="/lost-found" className="text-gray-600 hover:text-primary transition-colors">
                Lost & Found
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Search and Login (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input type="text" placeholder="Search pets..." className="pl-10 w-40 lg:w-60 h-9" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Login / Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4 mb-4">
                <Link href="/" className="text-primary font-medium">
                  Home
                </Link>
                <Link href="/pets" className="text-gray-600">
                  Available Pets
                </Link>
                <Link href="/process" className="text-gray-600">
                  Adoption Process
                </Link>
                <Link href="/lost-found" className="text-gray-600">
                  Lost & Found
                </Link>
                <Link href="/contact" className="text-gray-600">
                  Contact Us
                </Link>
              </nav>
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input type="text" placeholder="Search pets..." className="pl-10 w-full h-9" />
                </div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Login / Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Happy adopted pet with owner"
              fill
              className="object-cover brightness-[0.85]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Find Your Perfect Companion Today!
                  </h1>
                  <p className="text-lg md:text-xl mb-8">Adopt, Don't Shop – Give a pet a loving home.</p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Browse Pets
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Pets Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Featured Pets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These adorable companions are waiting for their forever homes. Each one has a unique personality and
                lots of love to give.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-xl">{pet.name}</h3>
                      <Badge variant="outline">{pet.age}</Badge>
                    </div>
                    <p className="text-gray-500 text-sm">{pet.breed}</p>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-gray-600 text-sm">{pet.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Adopt Me</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Pets
              </Button>
            </div>
          </div>
        </section>

        {/* Adoption Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Adoption Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've made adopting a pet simple and straightforward. Follow these steps to bring your new companion
                home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">1. Browse Pets</h3>
                <p className="text-gray-600">
                  Explore our available pets and find your perfect match based on your lifestyle and preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">2. Submit Request</h3>
                <p className="text-gray-600">
                  Fill out our adoption application form with your information and the pet you're interested in.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">3. Upload Documents</h3>
                <p className="text-gray-600">
                  Provide the necessary documentation and complete the verification process.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">4. Bring Pet Home</h3>
                <p className="text-gray-600">
                  Once approved, schedule a time to meet your new companion and welcome them to their forever home.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button className="bg-primary hover:bg-primary/90 text-white">Start Adoption Process</Button>
            </div>
          </div>
        </section>

        {/* Lost & Found Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Lost & Found Pets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Help reunite lost pets with their families. Check our database of lost pets or report a pet you've
                found.
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentLostPetIndex * 100}%)` }}
                >
                  {lostPets.map((pet) => (
                    <div key={pet.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 relative h-48 md:h-auto">
                            <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <Badge className="mb-2 bg-amber-100 text-amber-800 hover:bg-amber-100">Lost Pet</Badge>
                            <h3 className="font-bold text-xl mb-2">{pet.name}</h3>
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Last Seen:</span> {pet.lastSeen}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Date:</span> {pet.date}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Description:</span> {pet.description}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              I've Seen This Pet
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md"
                onClick={prevLostPet}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md"
                onClick={nextLostPet}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {lostPets.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentLostPetIndex === index ? "bg-primary" : "bg-gray-300"}`}
                  onClick={() => setCurrentLostPetIndex(index)}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" className="mr-4 border-primary text-primary hover:bg-primary hover:text-white">
                View All Lost Pets
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">Report a Lost Pet</Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Happy Adoption Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from families who have found their perfect companions through our adoption services.
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <div className="flex justify-center mb-6">
                          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">with {testimonial.pet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentTestimonialIndex === index ? "bg-primary" : "bg-gray-300"}`}
                  onClick={() => setCurrentTestimonialIndex(index)}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Share Your Story
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </Link>
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
                  <Link href="/process" className="text-gray-400 hover:text-white transition-colors">
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
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pet Care Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-400">123 Adoption Lane, Pet City</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-400">(555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-400">info@pawshome.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 PawsHome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

