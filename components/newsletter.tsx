import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive updates on new pets, adoption events, and pet care tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Your email address" className="flex-grow" />
            <Button className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

