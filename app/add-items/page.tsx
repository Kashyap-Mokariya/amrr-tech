"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Upload, X, ImageIcon, Plus, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

const ITEM_TYPES = ["Shirt", "Pant", "Shoes", "Sports Gear", "Accessories", "Electronics", "Books", "Other"]

export default function AddItemsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [additionalImageUrl, setAdditionalImageUrl] = useState("")
  const [showCoverPreview, setShowCoverPreview] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          description: formData.description,
          cover_image: formData.coverImage || "/placeholder.svg?height=300&width=300",
          additional_images: formData.additionalImages.length > 0 ? formData.additionalImages : null,
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          name: "",
          type: "",
          description: "",
          coverImage: "",
          additionalImages: [],
        })
        setCoverImageUrl("")
        setAdditionalImageUrl("")
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } else {
        throw new Error("Failed to add item")
      }
    } catch (error) {
      console.error("Error adding item:", error)
      toast.error("Failed to add item", {
        description: "Please check your connection and try again.",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCoverImageUrl = useCallback((url: string) => {
    setCoverImageUrl(url)
    setFormData((prev) => ({ ...prev, coverImage: url }))
    if (url) {
      toast.success("Cover image URL added!", {
        description: "Your cover image preview is now available.",
      })
    }
  }, [])

  const addAdditionalImage = useCallback(() => {
    if (additionalImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, additionalImageUrl.trim()],
      }))
      setAdditionalImageUrl("")
      toast.success("Additional image added!", {
        description: `Image ${formData.additionalImages.length + 1} has been added successfully.`,
      })
    }
  }, [additionalImageUrl, formData.additionalImages.length])

  const removeAdditionalImage = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }))
    toast.info("Image removed", {
      description: "The additional image has been removed from your item.",
    })
  }, [])

  const isValidImageUrl = useCallback((url: string) => {
    return url && (url.startsWith("http") || url.startsWith("/"))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 shadow-md">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Add New Item
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create a stunning showcase for your item with detailed information and beautiful imagery
            </p>
          </div>

          {/* Success Alert */}
          {showSuccess && (
            <div className="mb-8">
              <Alert className="border-green-200 bg-green-50 shadow-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  🎉 Item successfully added to your collection!
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="shadow-md border bg-white">
              <CardHeader className="bg-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  Item Details
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Provide comprehensive information about your item
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                        Item Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter a descriptive item name"
                        required
                        className="h-12 border-2 border-gray-200"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                        Item Type *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                        required
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200">
                          <SelectValue placeholder="Select item category" />
                        </SelectTrigger>
                        <SelectContent>
                          {ITEM_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                        Item Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your item in detail - features, condition, specifications..."
                        rows={4}
                        className="border-2 border-gray-200 resize-none"
                      />
                    </div>
                  </div>

                  {/* Cover Image Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-700">Cover Image URL</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCoverPreview(!showCoverPreview)}
                        className="text-blue-600"
                      >
                        {showCoverPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showCoverPreview ? "Hide" : "Show"} Preview
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        value={coverImageUrl}
                        onChange={(e) => handleCoverImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="h-12 border-2 border-gray-200"
                      />
                      {isValidImageUrl(coverImageUrl) && showCoverPreview && (
                        <div>
                          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                            <Image
                              src={coverImageUrl || "/placeholder.svg"}
                              alt="Cover preview"
                              fill
                              className="object-cover"
                              onError={() =>
                                toast.error("Invalid image URL", { description: "Please check the URL and try again." })
                              }
                              priority={false}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Images Section */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700">Additional Images</Label>
                    <div className="flex gap-2">
                      <Input
                        value={additionalImageUrl}
                        onChange={(e) => setAdditionalImageUrl(e.target.value)}
                        placeholder="https://example.com/additional-image.jpg"
                        className="h-12 border-2 border-gray-200"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAdditionalImage())}
                      />
                      <Button
                        type="button"
                        onClick={addAdditionalImage}
                        disabled={!additionalImageUrl.trim()}
                        className="h-12 px-6 bg-blue-500"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Additional Images Preview */}
                    {formData.additionalImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {formData.additionalImages.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50"
                          >
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={`Additional image ${index + 1}`}
                              fill
                              className="object-cover"
                              loading="lazy"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute top-2 right-2 shadow-md"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Image {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-14 text-lg font-semibold bg-blue-500 shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Adding Item...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Add Item
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/view-items")}
                      className="h-14 px-8 border-2"
                    >
                      View Items
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="shadow-md border bg-white">
                <CardHeader className="bg-indigo-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription className="text-indigo-100">See how your item will appear</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Preview Cover Image */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                      {formData.coverImage ? (
                        <Image
                          src={formData.coverImage || "/placeholder.svg"}
                          alt="Item preview"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Cover image preview</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preview Details */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">{formData.name || "Item Name"}</h3>
                      {formData.type && (
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {formData.type}
                        </div>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {formData.description || "Item description will appear here..."}
                      </p>
                      {formData.additionalImages.length > 0 && (
                        <div className="text-sm text-gray-500">
                          +{formData.additionalImages.length} additional image
                          {formData.additionalImages.length !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="shadow-md border bg-amber-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Image Tips
                  </h4>
                  <ul className="text-sm text-amber-700 space-y-2">
                    <li>• Use high-quality images (at least 800x800px)</li>
                    <li>• Ensure URLs are publicly accessible</li>
                    <li>• Supported formats: JPG, PNG, WebP</li>
                    <li>• Multiple angles show your item better</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}