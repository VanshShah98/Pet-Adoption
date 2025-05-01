import { ContactForm } from "../../components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about adoption or want to get involved? We'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Our Information</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Address</h3>
                <p className="text-gray-600">
                  123 Adoption Lane
                  <br />
                  Pet City, PC 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p className="text-gray-600">info@pawshome.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 4pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h3 className="font-medium text-lg mb-2">Want to Help?</h3>
            <p className="text-gray-600 mb-4">
              We're always looking for volunteers and donations to help our furry friends!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:underline">
                Volunteer
              </a>
              <a href="#" className="text-primary hover:underline">
                Donate
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

