"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample pet data
const pets = [
  {
    id: 1,
    name: "Buddy",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic dog who loves to play fetch.",
    status: "Available",
    type: "Dog",
  },
  {
    id: 2,
    name: "Whiskers",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Siamese",
    age: "3 years",
    description: "Calm and affectionate cat who enjoys lounging in sunny spots.",
    status: "Available",
    type: "Cat",
  },
  {
    id: 3,
    name: "Max",
    image: "/placeholder.svg?height=300&width=400",
    breed: "German Shepherd",
    age: "1 year",
    description: "Intelligent and loyal dog, great with families.",
    status: "Adopted",
    type: "Dog",
  },
  {
    id: 4,
    name: "Luna",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Maine Coon",
    age: "4 years",
    description: "Gentle giant who loves to cuddle and play.",
    status: "Available",
    type: "Cat",
  },
  {
    id: 5,
    name: "Charlie",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Beagle",
    age: "2 years",
    description: "Curious and friendly dog with a great sense of smell.",
    status: "Available",
    type: "Dog",
  },
  {
    id: 6,
    name: "Tweety",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Canary",
    age: "1 year",
    description: "Cheerful bird with beautiful singing voice.",
    status: "Available",
    type: "Bird",
  },
  {
    id: 7,
    name: "Rocky",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Bulldog",
    age: "3 years",
    description: "Laid-back and friendly dog who loves attention.",
    status: "Available",
    type: "Dog",
  },
  {
    id: 8,
    name: "Mittens",
    image: "/placeholder.svg?height=300&width=400",
    breed: "Ragdoll",
    age: "2 years",
    description: "Docile and affectionate cat who loves to be held.",
    status: "Adopted",
    type: "Cat",
  },
]

export default function PetAdoptionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter pets based on search query and active category
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || pet.type === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-primary rounded-full p-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M10 16c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A4.02 4.02 0 0 0 4 10c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.88-.29-1.7-.78-2.36l.93-1.12A5.98 5.98 0 0 1 14 10c0 3.31-2.69 6-6 6z" />
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0a2.5 2.5 0 0 1-5 0v0A2.5 2.5 0 0 1 9.5 2z" />
                <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0a2.5 2.5 0 0 1-5 0v0A2.5 2.5 0 0 1 14.5 2z" />
                <path d="M19.5 2A2.5 2.5 0 0 1 22 4.5v0a2.5 2.5 0 0 1-5 0v0A2.5 2.5 0 0 1 19.5 2z" />
                <path d="M19.5 7A2.5 2.5 0 0 1 22 9.5v0a2.5 2.5 0 0 1-5 0v0A2.5 2.5 0 0 1 19.5 7z" />
                <path d="M19.5 12a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-5 0v0a2.5 2.5 0 0 1 2.5-2.5z" />
                <path d="M14.5 17a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-5 0v0a2.5 2.5 0 0 1 2.5-2.5z" />
                <path d="M9.5 17a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-5 0v0a2.5 2.5 0 0 1 2.5-2.5z" />
                <path d="M4.5 12a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-5 0v0a2.5 2.5 0 0 1 2.5-2.5z" />
                <path d="M4.5 7A2.5 2.5 0 0 1 7 9.5v0a2.5 2.5 0 0 1-5 0v0A2.5 2.5 0 0 1 4.5 7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-primary">PetPals</h1>
          </div>
          <nav className="flex space-x-6">
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-primary font-medium">
              Adopt
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">Available Pets for Adoption</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect companion! Browse our selection of loving pets looking for their forever homes.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by name or breed..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-4 md:grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Dog">Dogs</TabsTrigger>
              <TabsTrigger value="Cat">Cats</TabsTrigger>
              <TabsTrigger value="Bird">Birds</TabsTrigger>
              <TabsTrigger value="Other" className="hidden md:block">
                Other
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No pets found matching your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      pet.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pet.status}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {pet.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Breed:</span> {pet.breed}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Age:</span> {pet.age}
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{pet.description}</p>
                  <Button
                    className="w-full"
                    variant={pet.status === "Available" ? "default" : "secondary"}
                    disabled={pet.status !== "Available"}
                    asChild
                  >
                    {pet.status === "Available" ? (
                      <Link href={`/adopt?petId=${pet.id}&petName=${encodeURIComponent(pet.name)}`}>
                        Adopt Me
                      </Link>
                    ) : (
                      "Already Adopted"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 PetPals Adoption Center. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

