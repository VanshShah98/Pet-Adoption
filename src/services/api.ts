export interface Pet {
  id: number
  name: string
  breed: string
  age: string
  description: string
  image: string
  type: string
}

export interface LostPet {
  id: number
  name: string
  type: string
  breed: string
  lastSeen: string
  date: string
  description: string
  image: string
  status: "lost" | "found"
}

export interface AdoptionRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  petInterest: string
  housingType: string
  hasChildren: boolean
  hasPets: boolean
  experience: string
  reason: string
  agreeTerms: boolean
}

export interface LostPetReport {
  petName: string
  petType: string
  breed?: string
  color: string
  gender: string
  age?: string
  lastSeen: string
  lastSeenDate: string
  description: string
  contactName: string
  contactEmail: string
  contactPhone: string
  reportType: "lost" | "found"
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Sample data
const pets: Pet[] = [
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

const lostPets: LostPet[] = [
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

// API functions
export const getPets = async (filters?: { type?: string; age?: string; search?: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPets = [...pets]

  if (filters) {
    if (filters.type && filters.type !== "all") {
      filteredPets = filteredPets.filter((pet) => pet.type.toLowerCase() === filters.type?.toLowerCase())
    }

    if (filters.age && filters.age !== "all") {
      filteredPets = filteredPets.filter((pet) => pet.age.includes(filters.age || ""))
    }

    if (filters.search) {
      filteredPets = filteredPets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(filters.search?.toLowerCase() || "") ||
          pet.breed.toLowerCase().includes(filters.search?.toLowerCase() || ""),
      )
    }
  }

  return filteredPets
}

export const getPetById = async (id: number) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return pets.find((pet) => pet.id === id)
}

export const getLostPets = async (filters?: { status?: "lost" | "found"; type?: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPets = [...lostPets]

  if (filters) {
    if (filters.status) {
      filteredPets = filteredPets.filter((pet) => pet.status === filters.status)
    }

    if (filters.type) {
      filteredPets = filteredPets.filter((pet) => pet.type.toLowerCase() === filters.type?.toLowerCase())
    }
  }

  return filteredPets
}

export const submitAdoptionRequest = async (data: AdoptionRequest) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful submission
  return {
    success: true,
    message: "Adoption request submitted successfully",
    requestId: `ADO-${Date.now()}`,
  }
}

export const submitLostPetReport = async (data: LostPetReport) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful submission
  return {
    success: true,
    message: "Lost pet report submitted successfully",
    reportId: `LF-${Date.now()}`,
  }
}

export const submitContactMessage = async (data: ContactMessage) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulate successful submission
  return {
    success: true,
    message: "Message sent successfully",
  }
}

