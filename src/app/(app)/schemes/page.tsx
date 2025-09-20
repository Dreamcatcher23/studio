"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchemesClient } from "./schemes-client";
import { mockSchemes } from "@/lib/mock-data";
import { Landmark } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Government Schemes",
    hi: "सरकारी योजनाएं",
    kn: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
  },
  description: {
    en: "A searchable database of government schemes and policies related to farming.",
    hi: "खेती से संबंधित सरकारी योजनाओं और नीतियों का एक खोजने योग्य डेटाबेस।",
    kn: "ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ನೀತಿಗಳ ಹುಡುಕಬಹುದಾದ ಡೇಟಾಬೇಸ್.",
  },
};

export default function SchemesPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Landmark className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{t(translations.title)}</CardTitle>
                            <CardDescription>{t(translations.description)}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <SchemesClient schemes={mockSchemes} />
        </div>
    );
}
