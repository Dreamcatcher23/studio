"use client";

import { useState } from "react";
import type { MarketPrice } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Bookmark, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MarketPricesClientProps {
  prices: MarketPrice[];
}

export function MarketPricesClient({ prices }: MarketPricesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const filteredPrices = prices.filter(
    (price) =>
      price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  return (
    <Card>
        <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by crop or market..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead className="hidden md:table-cell">Market</TableHead>
                    <TableHead className="hidden sm:table-cell">State</TableHead>
                    <TableHead>Price (per quintal)</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPrices.length > 0 ? (
                        filteredPrices.map((price) => (
                        <TableRow key={price.id}>
                            <TableCell>
                                <div className="font-medium">{price.crop}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{price.market}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{price.market}</TableCell>
                            <TableCell className="hidden sm:table-cell">{price.state}</TableCell>
                            <TableCell>₹{price.price.toLocaleString('en-IN')}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => toggleBookmark(price.id)} >
                                    <Bookmark className={`h-4 w-4 ${bookmarked.has(price.id) ? 'fill-accent text-accent' : ''}`} />
                                    <span className="sr-only">Bookmark</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No prices found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
      </CardContent>
    </Card>
  );
}
