import { PetFilters } from "../../components/pet-filters"
import { PetGrid } from "../../components/pet-grid"
import { Pagination } from "../../components/pagination"

export default function PetsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Available Pets</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our selection of loving pets looking for their forever homes. Use the filters to find your perfect
          match.
        </p>
      </div>

      <PetFilters />
      <PetGrid />
      <Pagination />
    </main>
  )
}

