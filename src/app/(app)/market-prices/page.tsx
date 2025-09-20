import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketPricesClient } from "./market-prices-client";
import { mockMarketPrices } from "@/lib/mock-data";
import { LineChart } from "lucide-react";

export default function MarketPricesPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <LineChart className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Real-time Market Prices</CardTitle>
                            <CardDescription>Current market prices for various crops based on simulated data. Use search and filters to find what you need.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <MarketPricesClient prices={mockMarketPrices} />
        </div>
    );
}
