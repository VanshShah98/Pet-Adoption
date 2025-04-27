import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FeaturedPets } from "../components/featured-pets"
import { AdoptionProcess } from "../components/adoption-process"
import { Testimonials } from "../components/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[500px] max-h-[700px] w-full">
          <img
            src="/placeholder.svg?height=700&width=1400"
            alt="Happy adopted pet with owner"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Find Your Perfect Companion Today!</h1>
                <p className="text-lg md:text-xl mb-8">Adopt, Don't Shop – Give a pet a loving home.</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link to="/pets">Browse Pets</Link>
                </Button>
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white ml-4">
                  <Link to="/admin/login">Admin Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <FeaturedPets />

      {/* Adoption Process Section */}
      <AdoptionProcess />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  )
}

