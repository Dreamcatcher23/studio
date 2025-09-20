"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SoilHealthClient } from "./soil-health-client";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Soil Health & Nutrient Advisory",
    hi: "मृदा स्वास्थ्य और पोषक तत्व सलाह",
    kn: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಪೋಷಕಾಂಶ ಸಲಹೆ",
  },
  description: {
    en: "Get fertilizer and nutrient advice based on your soil test data.",
    hi: "अपने मृदा परीक्षण डेटा के आधार पर उर्वरक और पोषक तत्वों की सलाह प्राप्त करें।",
    kn: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ಡೇಟಾವನ್ನು ಆಧರಿಸಿ ಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಸಲಹೆ ಪಡೆಯಿರಿ.",
  },
};

export default function SoilHealthPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{t(translations.title)}</CardTitle>
              <CardDescription>{t(translations.description)}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <SoilHealthClient />
    </div>
  );
}
