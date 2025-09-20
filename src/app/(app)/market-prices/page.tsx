"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketPricesClient } from "./market-prices-client";
import { mockMarketPrices } from "@/lib/mock-data";
import { LineChart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Real-time Market Prices",
    hi: "वास्तविक समय बाजार मूल्य",
    kn: "ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
  },
  description: {
    en: "Current market prices for various crops based on simulated data. Use search and filters to find what you need.",
    hi: "सिम्युलेटेड डेटा के आधार पर विभिन्न फसलों के वर्तमान बाजार मूल्य। आपको जो चाहिए उसे खोजने के लिए खोज और फ़िल्टर का उपयोग करें।",
    kn: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಡೇಟಾವನ್ನು ಆಧರಿಸಿ ವಿವಿಧ ಬೆಳೆಗಳಿಗೆ ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು. ನಿಮಗೆ ಬೇಕಾದುದನ್ನು ಹುಡುಕಲು ಹುಡುಕಾಟ ಮತ್ತು ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಬಳಸಿ.",
  },
};

export default function MarketPricesPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <LineChart className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{t(translations.title)}</CardTitle>
                            <CardDescription>{t(translations.description)}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <MarketPricesClient prices={mockMarketPrices} />
        </div>
    );
}
