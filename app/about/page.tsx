import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About PawsHome</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about our mission to find loving homes for pets in need.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At PawsHome, we believe every pet deserves a loving home. Our mission is to connect abandoned and homeless
            pets with caring families who will provide them with the love and care they deserve.
          </p>
          <p className="text-gray-600 mb-4">
            Founded in 2010, we've helped over 5,000 pets find their forever homes. We work closely with local shelters
            and rescue organizations to ensure that no pet is left behind.
          </p>
          <p className="text-gray-600">
            We're committed to promoting responsible pet ownership through education and support, ensuring that both
            pets and their new families thrive together.
          </p>
        </div>
        <div className="relative h-80 md:h-96">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Happy pets at our shelter"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Compassion</h3>
            <p className="text-gray-600">
              We treat every animal with kindness and respect, ensuring their well-being is our top priority.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Responsibility</h3>
            <p className="text-gray-600">
              We promote responsible pet ownership and carefully screen potential adopters.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-gray-600">
              We work with local communities to educate and raise awareness about animal welfare.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Transparency</h3>
            <p className="text-gray-600">
              We're open about our processes and how we use donations to help animals in need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Education</h3>
            <p className="text-gray-600">
              We believe in educating the public about proper pet care and animal welfare issues.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously seek new ways to improve our adoption process and animal care.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our dedicated team of staff and volunteers work tirelessly to care for our animals and find them loving homes.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="relative h-40 w-40 mx-auto mb-4">
                <Image
                  src={`/placeholder.svg?height=160&width=160&text=Team Member ${i}`}
                  alt={`Team member ${i}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold">Team Member {i}</h3>
              <p className="text-gray-600 text-sm">Position</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-8 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Whether you're looking to adopt, volunteer, or donate, there are many ways you can help our furry friends.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/pets">Adopt a Pet</Link>
          </Button>
          <Button variant="outline">Volunteer</Button>
          <Button variant="secondary">Donate</Button>
        </div>
      </div>
    </main>
  )
}

