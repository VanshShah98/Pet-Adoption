import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="default" size="sm" className="w-8 h-8 p-0">
          1
        </Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
          2
        </Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
          3
        </Button>
        <span className="mx-1">...</span>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
          8
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

