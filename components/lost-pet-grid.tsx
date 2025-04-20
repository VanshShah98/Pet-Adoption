import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"

// Sample lost pets data
const lostPets = [
  {
    id: 1,
    name: "Rocky",
    type: "Dog",
    breed: "Shih Tzu",
    lastSeen: "Downtown, Main Street",
    date: "June 15, 2025",
    description: "Brown and white with a red collar. Very friendly and responds to his name.",
    image: "/placeholder.svg?height=200&width=300",
    status: "lost",
  },
  {
    id: 2,
    name: "Mittens",
    type: "Cat",
    breed: "Domestic Shorthair",
    lastSeen: "Oak Park",
    date: "June 18, 2025",
    description: "Black cat with white paws and a blue collar with bell. Shy around strangers.",
    image: "/placeholder.svg?height=200&width=300",
    status: "lost",
  },
  {
    id: 3,
    name: "Unknown",
    type: "Dog",
    breed: "Labrador",
    lastSeen: "Riverside Apartments",
    date: "June 20, 2025",
    description: "Tan Labrador with a green collar and name tag. Very friendly and well-behaved.",
    image: "/placeholder.svg?height=200&width=300",
    status: "found",
  },
  {
    id: 4,
    name: "Whiskers",
    type: "Cat",
    breed: "Tabby",
    lastSeen: "Maple Street",
    date: "June 22, 2025",
    description: "Orange tabby with a white chest. No collar but is microchipped.",
    image: "/placeholder.svg?height=200&width=300",
    status: "lost",
  },
  {
    id: 5,
    name: "Unknown",
    type: "Bird",
    breed: "Cockatiel",
    lastSeen: "Cedar Avenue",
    date: "June 23, 2025",
    description: "Yellow and gray cockatiel. Very vocal and can whistle a tune.",
    image: "/placeholder.svg?height=200&width=300",
    status: "found",
  },
  {
    id: 6,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    lastSeen: "Hillside Park",
    date: "June 24, 2025",
    description: "Tri-color beagle with a blue collar. Responds to his name and is very food-motivated.",
    image: "/placeholder.svg?height=200&width=300",
    status: "lost",
  },
]

export function LostPetGrid() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Reports</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
            Lost
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
            Found
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lostPets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      pet.status === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {pet.status === "lost" ? "Lost" : "Found"}
                  </Badge>
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="font-bold text-xl mb-2">
                    {pet.name === "Unknown" ? `${pet.breed} (${pet.type})` : pet.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {pet.name !== "Unknown" && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Breed:</span> {pet.breed}
                      </p>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="font-medium mr-1">Last Seen:</span> {pet.lastSeen}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="font-medium mr-1">Date:</span> {pet.date}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{pet.description}</p>
                  </div>
                  <Button size="sm" variant={pet.status === "lost" ? "default" : "secondary"}>
                    {pet.status === "lost" ? "I've Seen This Pet" : "Contact Finder"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

