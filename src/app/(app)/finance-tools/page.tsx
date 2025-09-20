"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CostCalculatorClient } from "./cost-calculator-client";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Financial / Cost-Benefit Tools",
    hi: "वित्तीय / लागत-लाभ उपकरण",
    kn: "ಹಣಕಾಸು / ವೆಚ್ಚ-ಲಾಭ ಪರಿಕರಗಳು",
  },
  description: {
    en: "A simple calculator to estimate costs vs. expected yield gains.",
    hi: "लागत बनाम अपेक्षित उपज लाभ का अनुमान लगाने के लिए एक सरल कैलकुलेटर।",
    kn: "ವೆಚ್ಚಗಳು ಮತ್ತು ನಿರೀಕ್ಷಿತ ಇಳುವರಿ ಲಾಭಗಳನ್ನು ಅಂದಾಜು ಮಾಡಲು ಒಂದು ಸರಳ ಕ್ಯಾಲ್ಕುಲೇಟರ್.",
  },
};

export default function FinanceToolsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Calculator className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{t(translations.title)}</CardTitle>
              <CardDescription>{t(translations.description)}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <CostCalculatorClient />
    </div>
  );
}
