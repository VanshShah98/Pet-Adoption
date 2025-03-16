import { Search, FileText, Check, Home } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export function AdoptionProcess() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Adoption Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've made adopting a pet simple and straightforward. Follow these steps to bring your new companion home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">1. Browse Pets</h3>
            <p className="text-gray-600">
              Explore our available pets and find your perfect match based on your lifestyle and preferences.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">2. Submit Request</h3>
            <p className="text-gray-600">
              Fill out our adoption application form with your information and the pet you're interested in.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">3. Upload Documents</h3>
            <p className="text-gray-600">Provide the necessary documentation and complete the verification process.</p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">4. Bring Pet Home</h3>
            <p className="text-gray-600">
              Once approved, schedule a time to meet your new companion and welcome them to their forever home.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link to="/adopt">Start Adoption Process</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

