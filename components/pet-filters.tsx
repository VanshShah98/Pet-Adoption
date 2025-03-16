"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function PetFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by name or breed..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Desktop Filters */}
          <div className="hidden md:flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pets</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Age</SelectItem>
                <SelectItem value="baby">Baby</SelectItem>
                <SelectItem value="young">Young</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="recent">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Filters Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden w-full flex items-center gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Pets</SheetTitle>
                <SheetDescription>Narrow down your search to find your perfect companion.</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Pet Type</h3>
                  <div className="space-y-2">
                    {["Dogs", "Cats", "Birds", "Small & Furry", "Other"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Age</h3>
                  <div className="space-y-2">
                    {["Baby", "Young", "Adult", "Senior"].map((age) => (
                      <div key={age} className="flex items-center space-x-2">
                        <Checkbox id={`age-${age}`} />
                        <Label htmlFor={`age-${age}`}>{age}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <div className="space-y-2">
                    {["Small", "Medium", "Large", "Extra Large"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox id={`size-${size}`} />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Distance</h3>
                    <span className="text-sm text-gray-500">25 miles</span>
                  </div>
                  <Slider defaultValue={[25]} max={100} step={5} />
                </div>
              </div>

              <SheetFooter>
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button className="w-full md:w-auto">Search</Button>
        </div>
      </div>
    </div>
  )
}

