"use client"

import { useSearchParams } from "next/navigation"
import { AdoptionForm } from "./adoption-form"

export function AdoptionFormWrapper() {
  const searchParams = useSearchParams()

  // Fetch petId and petName from search params
  const petId = searchParams?.get('petId') ?? null
  const petName = searchParams?.get('petName') ?? null

  // If petId or petName are missing, show an error message
  if (!petId || !petName) {
    return (
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Invalid Request</h1>
        <p className="text-gray-600">
          Please select a pet to adopt from our available pets page.
        </p>
      </div>
    )
  }

  // Return the AdoptionForm component, passing petId and petName as props
  return <AdoptionForm petId={petId} petName={petName} />
}
