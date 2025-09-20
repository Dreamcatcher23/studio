import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SoilHealthClient } from "./soil-health-client";
import { Leaf } from "lucide-react";

export default function SoilHealthPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Soil Health & Nutrient Advisory</CardTitle>
              <CardDescription>Get fertilizer and nutrient advice based on your soil test data.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <SoilHealthClient />
    </div>
  );
}
