import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { LostPetForm } from "../../components/lost-pet-form"
import { LostPetGrid } from "../../components/lost-pet-grid"

export default function LostFoundPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Lost & Found Pets</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help reunite lost pets with their families. Check our database of lost pets or report a pet you've lost or
          found.
        </p>
      </div>

      <Tabs defaultValue="lost" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lost">Lost Pets</TabsTrigger>
          <TabsTrigger value="report">Report a Lost Pet</TabsTrigger>
        </TabsList>
        <TabsContent value="lost" className="mt-6">
          <LostPetGrid />
        </TabsContent>
        <TabsContent value="report" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <LostPetForm />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

