import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample pets data
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
  {
    id: 3,
    name: "Charlie",
    breed: "Beagle",
    age: "3 years",
    description: "Curious and playful dog with a great sense of smell.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Dog",
  },
  {
    id: 4,
    name: "Bella",
    breed: "Maine Coon",
    age: "4 years",
    description: "Majestic and friendly cat who gets along with everyone.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Cat",
  },
  {
    id: 5,
    name: "Rocky",
    breed: "Bulldog",
    age: "2 years",
    description: "Laid-back and friendly dog who loves attention.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Dog",
  },
  {
    id: 6,
    name: "Coco",
    breed: "Cockatiel",
    age: "1 year",
    description: "Playful and social bird who loves to sing.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Bird",
  },
  {
    id: 7,
    name: "Oliver",
    breed: "Tabby Cat",
    age: "3 years",
    description: "Independent but affectionate cat who enjoys window watching.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Cat",
  },
  {
    id: 8,
    name: "Daisy",
    breed: "Labrador Retriever",
    age: "1 year",
    description: "Energetic and friendly dog who loves water and playing fetch.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Dog",
  },
  {
    id: 9,
    name: "Milo",
    breed: "Rabbit",
    age: "2 years",
    description: "Gentle and curious rabbit who enjoys being petted.",
    image: "/placeholder.svg?height=300&width=400",
    type: "Other",
  },
]

export function PetGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
            <Badge className="absolute top-2 right-2 bg-primary/90">{pet.type}</Badge>
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
              <Link href={`/pets/${pet.id}`}>Adopt Me</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

