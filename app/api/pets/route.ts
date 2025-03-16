import { NextResponse } from "next/server"

// This would typically come from a database
const pets = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic dog who loves to play fetch.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Dog",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Siamese Cat",
    age: "1 year",
    description: "Gentle and affectionate cat who loves to cuddle.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Cat",
  },
  // More pets would be here
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const age = searchParams.get("age")
  const search = searchParams.get("search")

  let filteredPets = [...pets]

  // Apply filters
  if (type && type !== "all") {
    filteredPets = filteredPets.filter((pet) => pet.type.toLowerCase() === type.toLowerCase())
  }

  if (age && age !== "all") {
    // This is a simplified example - in a real app, you'd have more sophisticated age filtering
    filteredPets = filteredPets.filter((pet) => pet.age.includes(age))
  }

  if (search) {
    filteredPets = filteredPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) || pet.breed.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json(filteredPets)
}

