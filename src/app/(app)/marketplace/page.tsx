import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSuppliers } from "@/lib/mock-data";
import { Store, Star, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Store className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Input Marketplace / Supplier Directory</CardTitle>
              <CardDescription>Find local suppliers for seeds, fertilizers, pesticides, and tools.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSuppliers.map(supplier => (
          <Card key={supplier.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle>{supplier.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current"/>
                    <span>{supplier.rating.toFixed(1)}</span>
                  </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground pt-1">
                <MapPin className="w-4 h-4 mr-2"/>
                {supplier.location}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="font-semibold text-sm mb-2">Products:</p>
              <div className="flex flex-wrap gap-2">
                {supplier.products.map((product, index) => (
                  <Badge key={index} variant="outline">{product}</Badge>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t mt-auto">
              <a href={`tel:${supplier.contact}`} className="flex items-center text-sm text-primary font-medium">
                <Phone className="w-4 h-4 mr-2"/>
                <span>{supplier.contact}</span>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
