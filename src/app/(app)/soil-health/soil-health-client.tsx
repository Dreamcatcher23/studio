"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Info } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const formSchema = z.object({
  ph: z.coerce.number().min(0, "pH cannot be negative").max(14, "pH cannot be more than 14"),
  nitrogen: z.coerce.number().min(0, "Value cannot be negative"),
  phosphorus: z.coerce.number().min(0, "Value cannot be negative"),
  potassium: z.coerce.number().min(0, "Value cannot be negative"),
});

type FormData = z.infer<typeof formSchema>;

const translations = {
    title: { en: "Enter Soil Data", hi: "मिट्टी का डेटा दर्ज करें", kn: "ಮಣ್ಣಿನ ಡೇಟಾವನ್ನು ನಮೂದಿಸಿ" },
    description: { en: "Input your soil test results to get recommendations. Values are in kg/hectare.", hi: "सिफारिशें प्राप्त करने के लिए अपने मिट्टी परीक्षण के परिणाम इनपुट करें। मान किग्रा/हेक्टेयर में हैं।", kn: "ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳನ್ನು ಇನ್ಪುಟ್ ಮಾಡಿ. ಮೌಲ್ಯಗಳು ಕೆಜಿ/ಹೆಕ್ಟೇರ್‌ನಲ್ಲಿವೆ." },
    phLabel: { en: "Soil pH", hi: "मिट्टी का पीएच", kn: "ಮಣ್ಣಿನ pH" },
    nitrogenLabel: { en: "Nitrogen (N)", hi: "नाइट्रोजन (N)", kn: "ಸಾರಜನಕ (N)" },
    phosphorusLabel: { en: "Phosphorus (P)", hi: "फास्फोरस (P)", kn: "ರಂಜಕ (P)" },
    potassiumLabel: { en: "Potassium (K)", hi: "पोटेशियम (K)", kn: "ಪೊಟ್ಯಾಸಿಯಮ್ (K)" },
    getAdvice: { en: "Get Advice", hi: "सलाह प्राप्त करें", kn: "ಸಲಹೆ ಪಡೆಯಿರಿ" },
    advisoryTitle: { en: "Nutrient Advisory", hi: "पोषक तत्व सलाह", kn: "ಪೋಷಕಾಂಶ ಸಲಹೆ" },
    advisoryDescription: { en: "Recommendations based on your soil data will appear here.", hi: "आपके मिट्टी के डेटा के आधार पर सिफारिशें यहां दिखाई देंगी।", kn: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಡೇಟಾವನ್ನು ಆಧರಿಸಿದ ಶಿಫಾರಸುಗಳು ಇಲ್ಲಿ ಗೋಚರಿಸುತ್ತವೆ." },
    recommendations: { en: "Recommendations", hi: "सिफारिशें", kn: "ಶಿಫಾರಸುಗಳು" },
    prompt: { en: "Enter your soil data and click \"Get Advice\" to see recommendations.", hi: "सिफारिशें देखने के लिए अपना मिट्टी का डेटा दर्ज करें और \"सलाह प्राप्त करें\" पर क्लिक करें।", kn: "ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಮಣ್ಣಿನ ಡೇಟಾವನ್ನು ನಮೂದಿಸಿ ಮತ್ತು \"ಸಲಹೆ ಪಡೆಯಿರಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ." },

    // Advice strings
    adviceBase: { en: "Based on your inputs:\n\n", hi: "आपके इनपुट के आधार पर:\n\n", kn: "ನಿಮ್ಮ ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ಆಧರಿಸಿ:\n\n" },
    acidic: { en: "- Your soil is acidic. Consider applying lime to raise the pH.\n", hi: "- आपकी मिट्टी अम्लीय है। पीएच बढ़ाने के लिए चूना लगाने पर विचार करें।\n", kn: "- ನಿಮ್ಮ ಮಣ್ಣು ಆಮ್ಲೀಯವಾಗಿದೆ. pH ಹೆಚ್ಚಿಸಲು ಸುಣ್ಣವನ್ನು ಅನ್ವಯಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.\n" },
    alkaline: { en: "- Your soil is alkaline. Consider applying gypsum or elemental sulfur to lower the pH.\n", hi: "- आपकी मिट्टी क्षारीय है। पीएच कम करने के लिए जिप्सम या मौलिक सल्फर लगाने पर विचार करें।\n", kn: "- ನಿಮ್ಮ ಮಣ್ಣು ಕ್ಷಾರೀಯವಾಗಿದೆ. pH ಕಡಿಮೆ ಮಾಡಲು ಜಿಪ್ಸಮ್ ಅಥವಾ ಧಾತುರೂಪದ ಗಂಧಕವನ್ನು ಅನ್ವಯಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.\n" },
    goodPh: { en: "- Your soil pH is in a good range for most crops.\n", hi: "- आपकी मिट्टी का पीएच अधिकांश फसलों के लिए एक अच्छी सीमा में है।\n", kn: "- ನಿಮ್ಮ ಮಣ್ಣಿನ pH ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ ಉತ್ತಮ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ.\n" },
    lowN: { en: "- Nitrogen (N) level is low. Apply nitrogen-rich fertilizers like Urea or Ammonium Sulphate.\n", hi: "- नाइट्रोजन (N) का स्तर कम है। यूरिया या अमोनियम सल्फेट जैसे नाइट्रोजन युक्त उर्वरक डालें।\n", kn: "- ಸಾರಜನಕ (N) ಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ. ಯೂರಿಯಾ ಅಥವಾ ಅಮೋನಿಯಂ ಸಲ್ಫೇಟ್ ನಂತಹ ಸಾರಜನಕಯುಕ್ತ ಗೊಬ್ಬರಗಳನ್ನು ಅನ್ವಯಿಸಿ.\n" },
    lowP: { en: "- Phosphorus (P) level is low. Apply phosphatic fertilizers like DAP or Single Super Phosphate (SSP).\n", hi: "- फास्फोरस (P) का स्तर कम है। डीएपी या सिंगल सुपर फॉस्फेट (एसएसपी) जैसे फॉस्फेटिक उर्वरक डालें।\n", kn: "- ರಂಜಕ (P) ಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ. ಡಿಎಪಿ ಅಥವಾ ಸಿಂಗಲ್ ಸೂಪರ್ ಫಾಸ್ಫೇಟ್ (ಎಸ್‌ಎಸ್‌ಪಿ) ನಂತಹ ಫಾಸ್ಫೇಟಿಕ್ ಗೊಬ್ಬರಗಳನ್ನು ಅನ್ವಯಿಸಿ.\n" },
    lowK: { en: "- Potassium (K) level is low. Apply potassic fertilizers like Muriate of Potash (MOP).\n", hi: "- पोटेशियम (K) का स्तर कम है। म्यूरेट ऑफ पोटाश (MOP) जैसे पोटाश उर्वरक डालें।\n", kn: "- ಪೊಟ್ಯಾಸಿಯಮ್ (K) ಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ. ಮ್ಯೂರಿಯೇಟ್ ಆಫ್ ಪೊಟ್ಯಾಶ್ (MOP) ನಂತಹ ಪೊಟ್ಯಾಸಿಕ್ ಗೊಬ್ಬರಗಳನ್ನು ಅನ್ವಯಿಸಿ.\n" },
    adequateNutrients: { en: "- Nutrient levels appear adequate. Maintain good soil health with organic matter.", hi: "- पोषक तत्वों का स्तर पर्याप्त प्रतीत होता है। जैविक पदार्थ से मिट्टी का अच्छा स्वास्थ्य बनाए रखें।", kn: "- ಪೋಷಕಾಂಶಗಳ ಮಟ್ಟಗಳು ಸಮರ್ಪಕವಾಗಿ ಕಂಡುಬರುತ್ತವೆ. ಸಾವಯವ ಪದಾರ್ಥಗಳೊಂದಿಗೆ ಉತ್ತಮ ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ." },
};

export function SoilHealthClient() {
  const { t } = useLanguage();
  const [advice, setAdvice] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ph: 7.0,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
    },
  });

  function onSubmit(values: FormData) {
    let generatedAdvice = t(translations.adviceBase);
    
    // pH advice
    if (values.ph < 6.0) {
      generatedAdvice += t(translations.acidic);
    } else if (values.ph > 7.5) {
      generatedAdvice += t(translations.alkaline);
    } else {
      generatedAdvice += t(translations.goodPh);
    }

    // Nutrient advice
    if (values.nitrogen < 280) {
      generatedAdvice += t(translations.lowN);
    }
    if (values.phosphorus < 15) {
      generatedAdvice += t(translations.lowP);
    }
    if (values.potassium < 120) {
      generatedAdvice += t(translations.lowK);
    }

    if (values.nitrogen >= 280 && values.phosphorus >= 15 && values.potassium >= 120) {
        generatedAdvice += t(translations.adequateNutrients);
    }

    setAdvice(generatedAdvice);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{t(translations.title)}</CardTitle>
              <CardDescription>{t(translations.description)}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="ph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(translations.phLabel)}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nitrogen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(translations.nitrogenLabel)}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phosphorus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(translations.phosphorusLabel)}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="potassium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(translations.potassiumLabel)}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">
                <Sparkles className="mr-2 h-4 w-4" />
                {t(translations.getAdvice)}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t(translations.advisoryTitle)}</CardTitle>
          <CardDescription>{t(translations.advisoryDescription)}</CardDescription>
        </CardHeader>
        <CardContent>
          {advice ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>{t(translations.recommendations)}</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap">{advice}</AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-muted-foreground p-8">
              <p>{t(translations.prompt)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
