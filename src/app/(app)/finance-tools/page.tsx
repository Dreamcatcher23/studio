import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CostCalculatorClient } from "./cost-calculator-client";
import { Calculator } from "lucide-react";

export default function FinanceToolsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Calculator className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Financial / Cost-Benefit Tools</CardTitle>
              <CardDescription>A simple calculator to estimate costs vs. expected yield gains.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <CostCalculatorClient />
    </div>
  );
}
