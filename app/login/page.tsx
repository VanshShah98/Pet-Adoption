"use client"

import { useRouter } from "next/navigation"
import Login from "@/components/Login"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <Login />
    </div>
  )
} 