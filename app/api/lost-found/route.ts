import { NextResponse } from "next/server"

// This would typically come from a database
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
  // More lost pets would be here
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") // "lost" or "found"
  const type = searchParams.get("type") // "Dog", "Cat", etc.

  let filteredPets = [...lostPets]

  // Apply filters
  if (status) {
    filteredPets = filteredPets.filter((pet) => pet.status === status)
  }

  if (type) {
    filteredPets = filteredPets.filter((pet) => pet.type.toLowerCase() === type.toLowerCase())
  }

  return NextResponse.json(filteredPets)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = [
      "petName",
      "petType",
      "color",
      "gender",
      "lastSeen",
      "lastSeenDate",
      "description",
      "contactName",
      "contactEmail",
      "contactPhone",
      "reportType",
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // In a real application, you would:
    // 1. Save the data to a database
    // 2. Process the image upload
    // 3. Send confirmation emails
    // 4. etc.

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Lost pet report submitted successfully",
      reportId: `LF-${Date.now()}`,
    })
  } catch (error) {
    console.error("Error processing lost pet report:", error)
    return NextResponse.json({ error: "Failed to process lost pet report" }, { status: 500 })
  }
}

