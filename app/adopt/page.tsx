import { AdoptionFormWrapper } from "@/components/adoption-form-wrapper"

export default function AdoptPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Adoption Request</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete the form below to start the adoption process. We'll review your application and get back to you
          within 48 hours.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <AdoptionFormWrapper />
      </div>
    </main>
  )
}

