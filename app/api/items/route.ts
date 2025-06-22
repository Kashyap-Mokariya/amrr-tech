import { type NextRequest, NextResponse } from "next/server"
import { getAllItems, createItem } from "@/lib/db"

export async function GET() {
  try {
    const items = await getAllItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching items:", error)
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, cover_image, additional_images } = body

    if (!name || !type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 })
    }

    const newItem = await createItem({
      name,
      type,
      description: description || null,
      cover_image: cover_image || null,
      additional_images: additional_images || null,
    })

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("Error creating item:", error)
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 })
  }
}
