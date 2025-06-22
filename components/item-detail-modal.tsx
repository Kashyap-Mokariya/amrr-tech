"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import type { Item } from "@/lib/db"

interface ItemDetailModalProps {
  item: Item | null
  isOpen: boolean
  onClose: () => void
}

export function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!item) return null

  const allImages = [item.cover_image, ...(item.additional_images || [])].filter(Boolean) as string[]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleEnquire = () => {
    // Show success toast instead of alert
    toast.success("Enquiry Sent!", {
      description: `Your enquiry for "${item.name}" has been sent successfully. We'll get back to you soon.`,
      duration: 4000,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              {allImages.length > 0 ? (
                <>
                  <Image
                    src={allImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`${item.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  {allImages.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">No image available</div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 capitalize">
                {item.type}
              </Badge>
              <h2 className="text-xl font-semibold mb-3">{item.name}</h2>
              {item.description && <p className="text-muted-foreground leading-relaxed">{item.description}</p>}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Added:</span> {new Date(item.created_at).toLocaleDateString()}
              </p>
              {item.updated_at !== item.created_at && (
                <p>
                  <span className="font-medium">Updated:</span> {new Date(item.updated_at).toLocaleDateString()}
                </p>
              )}
            </div>

            <Button onClick={handleEnquire} className="w-full" size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Enquire About This Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
