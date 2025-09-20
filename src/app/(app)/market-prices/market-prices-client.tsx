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
import { useLanguage } from "@/contexts/language-context";

interface MarketPricesClientProps {
  prices: MarketPrice[];
}

const translations = {
  searchPlaceholder: {
    en: "Search by crop or market...",
    hi: "फसल या बाजार द्वारा खोजें...",
    kn: "ಬೆಳೆ ಅಥವಾ ಮಾರುಕಟ್ಟೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
  },
  crop: {
    en: "Crop",
    hi: "फसल",
    kn: "ಬೆಳೆ",
  },
  market: {
    en: "Market",
    hi: "बाजार",
    kn: "ಮಾರುಕಟ್ಟೆ",
  },
  state: {
    en: "State",
    hi: "राज्य",
    kn: "ರಾಜ್ಯ",
  },
  price: {
    en: "Price (per quintal)",
    hi: "मूल्य (प्रति क्विंटल)",
    kn: "ಬೆಲೆ (ಪ್ರತಿ ಕ್ವಿಂಟಲ್‌ಗೆ)",
  },
  action: {
    en: "Action",
    hi: "कार्रवाई",
    kn: "ಕ್ರಿಯೆ",
  },
  bookmark: {
    en: "Bookmark",
    hi: "बुकमार्क",
    kn: "ಬುಕ್‌ಮಾರ್ಕ್",
  },
  noPrices: {
    en: "No prices found.",
    hi: "कोई मूल्य नहीं मिला।",
    kn: "ಯಾವುದೇ ಬೆಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
  },
};

export function MarketPricesClient({ prices }: MarketPricesClientProps) {
  const { t } = useLanguage();
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
                        placeholder={t(translations.searchPlaceholder)}
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
                    <TableHead>{t(translations.crop)}</TableHead>
                    <TableHead className="hidden md:table-cell">{t(translations.market)}</TableHead>
                    <TableHead className="hidden sm:table-cell">{t(translations.state)}</TableHead>
                    <TableHead>{t(translations.price)}</TableHead>
                    <TableHead className="text-right">{t(translations.action)}</TableHead>
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
                                    <span className="sr-only">{t(translations.bookmark)}</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                {t(translations.noPrices)}
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
