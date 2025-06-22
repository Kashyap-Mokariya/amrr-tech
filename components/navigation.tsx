"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            Items Manager
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/view-items"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/view-items" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              View Items
            </Link>
            <Link
              href="/add-items"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/add-items" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Add Items
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
