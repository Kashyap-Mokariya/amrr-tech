import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Item {
  id: number
  name: string
  type: string
  description: string | null
  cover_image: string | null
  additional_images: string[] | null
  created_at: string
  updated_at: string
}

export async function getAllItems(): Promise<Item[]> {
  const items = await sql`
    SELECT * FROM items 
    ORDER BY created_at DESC
  `
  return items as Item[]
}

export async function getItemById(id: number): Promise<Item | null> {
  const items = await sql`
    SELECT * FROM items 
    WHERE id = ${id}
  `
  return (items[0] as Item) || null
}

export async function createItem(item: Omit<Item, "id" | "created_at" | "updated_at">): Promise<Item> {
  const result = await sql`
    INSERT INTO items (name, type, description, cover_image, additional_images)
    VALUES (${item.name}, ${item.type}, ${item.description}, ${item.cover_image}, ${item.additional_images})
    RETURNING *
  `
  return result[0] as Item
}
