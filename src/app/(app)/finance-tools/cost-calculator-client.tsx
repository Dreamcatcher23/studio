"use client";

import { useMemo } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";

const formSchema = z.object({
  landPrep: z.coerce.number().min(0).default(0),
  seeds: z.coerce.number().min(0).default(0),
  fertilizers: z.coerce.number().min(0).default(0),
  pesticides: z.coerce.number().min(0).default(0),
  irrigation: z.coerce.number().min(0).default(0),
  labor: z.coerce.number().min(0).default(0),
  otherCosts: z.coerce.number().min(0).default(0),
  expectedYield: z.coerce.number().min(0).default(0),
  marketPrice: z.coerce.number().min(0).default(0),
});

type FormData = z.infer<typeof formSchema>;

const translations = {
  title: { en: "Cost-Benefit Calculator", hi: "लागत-लाभ कैलकुलेटर", kn: "ವೆಚ್ಚ-ಲಾಭ ಕ್ಯಾಲ್ಕುಲೇಟರ್" },
  description: { en: "Enter your costs and expected revenue to see the estimated profit.", hi: "अनुमानित लाभ देखने के लिए अपनी लागत और अपेक्षित राजस्व दर्ज करें।", kn: "ಅಂದಾಜು ಲಾಭವನ್ನು ನೋಡಲು ನಿಮ್ಮ ವೆಚ್ಚಗಳು ಮತ್ತು ನಿರೀಕ್ಷಿತ ಆದಾಯವನ್ನು ನಮೂದಿಸಿ." },
  inputCosts: { en: "Input Costs (₹)", hi: "इनपुट लागत (₹)", kn: "ಇನ್ಪುಟ್ ವೆಚ್ಚಗಳು (₹)" },
  landPrep: { en: "Land Prep", hi: "भूमि तैयारी", kn: "ಭೂಮಿ ಸಿದ್ಧತೆ" },
  seeds: { en: "Seeds", hi: "बीज", kn: "ಬೀಜಗಳು" },
  fertilizers: { en: "Fertilizers", hi: "उर्वरक", kn: "ಗೊಬ್ಬರಗಳು" },
  pesticides: { en: "Pesticides", hi: "कीटनाशक", kn: "ಕೀಟನಾಶಕಗಳು" },
  irrigation: { en: "Irrigation", hi: "सिंचाई", kn: "ನೀರಾವರಿ" },
  labor: { en: "Labor", hi: "श्रम", kn: "ಕಾರ್ಮಿಕ" },
  otherCosts: { en: "Other Costs", hi: "अन्य लागतें", kn: "ಇತರ ವೆಚ್ಚಗಳು" },
  expectedRevenue: { en: "Expected Revenue", hi: "अपेक्षित राजस्व", kn: "ನಿರೀಕ್ಷಿತ ಆದಾಯ" },
  expectedYield: { en: "Expected Yield (Quintals)", hi: "अपेक्षित उपज (क्विंटल)", kn: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ (ಕ್ವಿಂಟಲ್)" },
  marketPrice: { en: "Market Price (₹ per Quintal)", hi: "बाजार मूल्य (₹ प्रति क्विंटल)", kn: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ (₹ ಪ್ರತಿ ಕ್ವಿಂಟಲ್‌ಗೆ)" },
  summaryTitle: { en: "Calculation Summary", hi: "गणना सारांश", kn: "ಲೆಕ್ಕಾಚಾರದ ಸಾರಾಂಶ" },
  totalInputCost: { en: "Total Input Cost", hi: "कुल इनपुट लागत", kn: "ಒಟ್ಟು ಇನ್ಪುಟ್ ವೆಚ್ಚ" },
  totalExpectedRevenue: { en: "Total Expected Revenue", hi: "कुल अपेक्षित राजस्व", kn: "ಒಟ್ಟು ನಿರೀಕ್ಷಿತ ಆದಾಯ" },
  netProfitLoss: { en: "Net Profit / Loss", hi: "शुद्ध लाभ/हानि", kn: "ನಿವ್ವಳ ಲಾಭ / ನಷ್ಟ" },
  disclaimer: { en: "This is an estimation. Actual results may vary.", hi: "यह एक अनुमान है। वास्तविक परिणाम भिन्न हो सकते हैं।", kn: "ಇದು ಒಂದು ಅಂದಾಜು. ನಿಜವಾದ ಫಲಿತಾಂಶಗಳು ಬದಲಾಗಬಹುದು." },
};

const fieldLabels = {
    landPrep: translations.landPrep,
    seeds: translations.seeds,
    fertilizers: translations.fertilizers,
    pesticides: translations.pesticides,
    irrigation: translations.irrigation,
    labor: translations.labor,
    otherCosts: translations.otherCosts,
};

export function CostCalculatorClient() {
  const { t } = useLanguage();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landPrep: 0,
      seeds: 0,
      fertilizers: 0,
      pesticides: 0,
      irrigation: 0,
      labor: 0,
      otherCosts: 0,
      expectedYield: 0,
      marketPrice: 0,
    },
  });

  const values = form.watch();

  const { totalCost, totalRevenue, netProfit } = useMemo(() => {
    const totalCost =
      values.landPrep +
      values.seeds +
      values.fertilizers +
      values.pesticides +
      values.irrigation +
      values.labor +
      values.otherCosts;
    const totalRevenue = values.expectedYield * values.marketPrice;
    const netProfit = totalRevenue - totalCost;
    return { totalCost, totalRevenue, netProfit };
  }, [values]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <Form {...form}>
          <form>
            <CardHeader>
              <CardTitle>{t(translations.title)}</CardTitle>
              <CardDescription>{t(translations.description)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t(translations.inputCosts)}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(Object.keys(form.getValues()) as Array<keyof FormData>).slice(0, 7).map((key) => (
                     <FormField
                        key={key}
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t(fieldLabels[key])}</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                  ))}
                </div>
              </div>
              <Separator/>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t(translations.expectedRevenue)}</h3>
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                        control={form.control}
                        name="expectedYield"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t(translations.expectedYield)}</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="marketPrice"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t(translations.marketPrice)}</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                </div>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
      
      <Card className="lg:col-span-1 h-fit sticky top-20">
        <CardHeader>
          <CardTitle>{t(translations.summaryTitle)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t(translations.totalInputCost)}</span>
            <span className="font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t(translations.totalExpectedRevenue)}</span>
            <span className="font-semibold">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">{t(translations.netProfitLoss)}</span>
            <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netProfit.toLocaleString('en-IN')}
            </span>
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">{t(translations.disclaimer)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
