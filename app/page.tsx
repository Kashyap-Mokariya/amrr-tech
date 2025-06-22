import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Eye, Database } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Items Manager</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Organize and manage your item collection with ease. Add new items, view your collection, and keep track of
          everything in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Items
            </CardTitle>
            <CardDescription>Add new items to your collection with detailed information and images.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground mb-6 space-y-2">
              <li>• Item name and type</li>
              <li>• Detailed descriptions</li>
              <li>• Cover and additional images</li>
              <li>• Instant success feedback</li>
            </ul>
            <Link href="/add-items">
              <Button className="w-full">Start Adding Items</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Items
            </CardTitle>
            <CardDescription>Browse your complete item collection with search and filter options.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground mb-6 space-y-2">
              <li>• Grid view with cover images</li>
              <li>• Search and filter functionality</li>
              <li>• Detailed item modal view</li>
              <li>• Image carousel and enquiry</li>
            </ul>
            <Link href="/view-items">
              <Button variant="outline" className="w-full">
                Browse Collection
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Database className="h-5 w-5" />
              Powered by Neon Database
            </CardTitle>
            <CardDescription>
              Your items are securely stored and managed with Neon's serverless PostgreSQL database, ensuring fast
              performance and reliable data persistence.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
