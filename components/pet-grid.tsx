"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { petsAPI } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

// Define the Pet type
interface Pet {
  _id: string
  name: string
  breed: string
  age: number
  description: string
  imageUrl: string
  type: string
  gender: string
  vaccinated: boolean
  isAdopted: boolean
  addedBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export function PetGrid() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true)
        const response = await petsAPI.getAllPets()
        setPets(response.data || [])
      } catch (err) {
        console.error("Error fetching pets:", err)
        setError("Failed to load pets. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pb-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No pets available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {pets.map((pet) => (
        <Card key={pet._id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image 
              src={pet.imageUrl || "/placeholder.svg"} 
              alt={pet.name} 
              fill 
              className="object-cover" 
            />
            <Badge className="absolute top-2 right-2 bg-primary/90">{pet.type}</Badge>
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">{pet.name}</h3>
              <Badge variant="outline">{pet.age} years</Badge>
            </div>
            <p className="text-gray-500 text-sm">{pet.breed}</p>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-gray-600 text-sm">{pet.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/adopt?petId=${pet._id}&petName=${encodeURIComponent(pet.name)}`}>
                Adopt Me
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

