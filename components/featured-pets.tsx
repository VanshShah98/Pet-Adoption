"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample featured pets data
const featuredPets = [
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d1",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic dog who loves to play fetch.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d2",
    name: "Luna",
    breed: "Siamese Cat",
    age: "1 year",
    description: "Gentle and affectionate cat who loves to cuddle.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d3",
    name: "Charlie",
    breed: "Beagle",
    age: "3 years",
    description: "Curious and playful dog with a great sense of smell.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d4",
    name: "Bella",
    breed: "Maine Coon",
    age: "4 years",
    description: "Majestic and friendly cat who gets along with everyone.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function FeaturedPets() {
  const [currentPage, setCurrentPage] = useState(0)
  const petsPerPage = 4
  const totalPages = Math.ceil(featuredPets.length / petsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const currentPets = featuredPets.slice(currentPage * petsPerPage, (currentPage + 1) * petsPerPage)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Featured Pets</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These adorable companions are waiting for their forever homes. Each one has a unique personality and lots of
            love to give.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPets.map((pet) => (
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
                <Button asChild className="w-full">
                  <Link href={`/adopt?petId=${pet.id}&petName=${encodeURIComponent(pet.name)}`}>
                    Adopt Me
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon" onClick={prevPage} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={i === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i)}
                className="w-8 h-8 p-0"
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={nextPage} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/pets">View All Pets</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

