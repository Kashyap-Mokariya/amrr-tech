"use client"

import Image from "next/image"
import type { Item } from "@/lib/db"

interface ItemCardProps {
  item: Item
  onClick: () => void
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div
      className="group cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={item.cover_image || "/placeholder.svg?height=300&width=300"}
          alt={item.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
      </div>
    </div>
  )
}
