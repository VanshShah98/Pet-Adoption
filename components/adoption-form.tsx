"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { adoptionAPI } from "@/lib/api"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "Please select a state." }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code." }),
  petInterest: z.string().min(1, { message: "Please select a pet." }),
  housingType: z.string().min(1, { message: "Please select your housing type." }),
  hasYard: z.string().min(1, { message: "Please indicate if you have a yard." }),
  hasOtherPets: z.string().min(1, { message: "Please indicate if you have other pets." }),
  hasChildren: z.string().min(1, { message: "Please indicate if you have children." }),
  experience: z.string().min(1, { message: "Please select your experience level." }),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface AdoptionFormProps {
  petId: string
  petName: string
}

export function AdoptionForm({ petId, petName }: AdoptionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  // Check for authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please log in to submit an adoption request')
      router.push('/login')
    }
  }, [router])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      petInterest: petName,
      housingType: "",
      hasYard: "",
      hasOtherPets: "",
      hasChildren: "",
      experience: "",
      notes: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Check for authentication before submitting
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please log in to submit an adoption request')
        router.push('/login')
        return
      }

      setIsSubmitting(true)
      
      // Create adoption request object that matches the backend model
      const adoptionRequest = {
        notes: `Applicant Information:
First Name: ${data.firstName}
Last Name: ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}, ${data.city}, ${data.state} ${data.zipCode}
Housing Type: ${data.housingType}
Has Yard: ${data.hasYard}
Has Other Pets: ${data.hasOtherPets}
Has Children: ${data.hasChildren}
Experience Level: ${data.experience}
Additional Notes: ${data.notes}`
      }

      // Submit the adoption request with the petId
      await adoptionAPI.createAdoptionRequest(petId, adoptionRequest)
      
      setIsSubmitted(true)
      toast.success('Adoption request submitted successfully!')
      
      // Redirect to a success page or home page after a delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error: any) {
      console.error('Error submitting adoption request:', error)
      
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.')
        router.push('/login')
      } else if (error.message === 'Pet not found') {
        toast.error('Pet not found. Please try again with a valid pet.')
      } else if (error.message === 'Invalid request') {
        toast.error('Invalid request. Please check your information and try again.')
      } else {
        toast.error('Failed to submit adoption request. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for your interest in adoption. We've received your application and will review it shortly. You'll
          receive a confirmation email with next steps.
        </p>
        <Button asChild>
          <a href="/pets">Browse More Pets</a>
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Address</h2>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        {/* Add more states as needed */}
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Adoption Information</h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="petInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which pet are you interested in adopting?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="max">Max (Golden Retriever)</SelectItem>
                      <SelectItem value="luna">Luna (Siamese Cat)</SelectItem>
                      <SelectItem value="charlie">Charlie (Beagle)</SelectItem>
                      <SelectItem value="bella">Bella (Maine Coon)</SelectItem>
                      <SelectItem value="other">Other (Please specify in comments)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="housingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Housing Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select housing type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="hasYard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Do you have a yard?</FormLabel>
                      <FormDescription>This helps us match you with a pet that's good with kids.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasOtherPets"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Do you have other pets?</FormLabel>
                      <FormDescription>
                        This helps us match you with a pet that's compatible with your current pets.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hasChildren"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you have children?</FormLabel>
                    <FormDescription>This helps us match you with a pet that's good with kids.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pet Ownership Experience</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No experience</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="some" />
                        </FormControl>
                        <FormLabel className="font-normal">Some experience</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="experienced" />
                        </FormControl>
                        <FormLabel className="font-normal">Experienced</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about yourself and why you want to adopt this pet..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please note that submitting this application does not guarantee adoption approval.
                  Our team will review your application and contact you within 48 hours.
                </AlertDescription>
              </Alert>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Adoption Request"}
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Document Upload</h2>
          <p className="text-gray-600 mb-4">Please upload the following documents to complete your application:</p>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">ID Verification</p>
                      <p className="text-sm text-gray-500">Government-issued ID (Driver's License, Passport)</p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="id-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-md hover:bg-primary/20 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm font-medium">Upload</span>
                      </div>
                    </Label>
                    <Input id="id-upload" type="file" className="hidden" onChange={handleFileUpload} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Proof of Address</p>
                      <p className="text-sm text-gray-500">Utility bill, lease agreement, or bank statement</p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-md hover:bg-primary/20 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm font-medium">Upload</span>
                      </div>
                    </Label>
                    <Input id="address-upload" type="file" className="hidden" onChange={handleFileUpload} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <p className="font-medium text-sm mb-2">Uploaded Files:</p>
              <ul className="space-y-1">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

