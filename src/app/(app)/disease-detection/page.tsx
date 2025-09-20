"use client";

import { DiseaseDetectionClient } from './disease-detection-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const translations = {
  title: {
    en: 'Crop Disease Detection',
    hi: 'फसल रोग पहचान',
    kn: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
  },
  description: {
    en: 'Upload a clear image of an affected crop leaf or plant, and provide a short description for analysis.',
    hi: 'प्रभावित फसल के पत्ते या पौधे की एक स्पष्ट छवि अपलोड करें, और विश्लेषण के लिए एक संक्षिप्त विवरण प्रदान करें।',
    kn: 'ಬಾಧಿತ ಬೆಳೆ ಎಲೆ ಅಥವಾ ಸಸ್ಯದ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಸಣ್ಣ ವಿವರಣೆಯನ್ನು ಒದಗಿಸಿ.',
  },
};

export default function DiseaseDetectionPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <TestTube2 className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{t(translations.title)}</CardTitle>
                            <CardDescription>{t(translations.description)}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <DiseaseDetectionClient />
        </div>
    )
}
