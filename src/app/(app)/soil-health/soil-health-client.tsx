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
import { Sparkles, Info, TestTube, ChevronsRight } from "lucide-react";

const formSchema = z.object({
  ph: z.coerce.number().min(0, "pH cannot be negative").max(14, "pH cannot be more than 14"),
  nitrogen: z.coerce.number().min(0, "Value cannot be negative"),
  phosphorus: z.coerce.number().min(0, "Value cannot be negative"),
  potassium: z.coerce.number().min(0, "Value cannot be negative"),
});

type FormData = z.infer<typeof formSchema>;

export function SoilHealthClient() {
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
    let generatedAdvice = "Based on your inputs:\n\n";
    
    // pH advice
    if (values.ph < 6.0) {
      generatedAdvice += "- Your soil is acidic. Consider applying lime to raise the pH.\n";
    } else if (values.ph > 7.5) {
      generatedAdvice += "- Your soil is alkaline. Consider applying gypsum or elemental sulfur to lower the pH.\n";
    } else {
      generatedAdvice += "- Your soil pH is in a good range for most crops.\n";
    }

    // Nutrient advice
    if (values.nitrogen < 280) {
      generatedAdvice += "- Nitrogen (N) level is low. Apply nitrogen-rich fertilizers like Urea or Ammonium Sulphate.\n";
    }
    if (values.phosphorus < 15) {
      generatedAdvice += "- Phosphorus (P) level is low. Apply phosphatic fertilizers like DAP or Single Super Phosphate (SSP).\n";
    }
    if (values.potassium < 120) {
      generatedAdvice += "- Potassium (K) level is low. Apply potassic fertilizers like Muriate of Potash (MOP).\n";
    }

    if (values.nitrogen >= 280 && values.phosphorus >= 15 && values.potassium >= 120) {
        generatedAdvice += "- Nutrient levels appear adequate. Maintain good soil health with organic matter."
    }

    setAdvice(generatedAdvice);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Enter Soil Data</CardTitle>
              <CardDescription>Input your soil test results to get recommendations. Values are in kg/hectare.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="ph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil pH</FormLabel>
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
                    <FormLabel>Nitrogen (N)</FormLabel>
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
                    <FormLabel>Phosphorus (P)</FormLabel>
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
                    <FormLabel>Potassium (K)</FormLabel>
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
                Get Advice
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nutrient Advisory</CardTitle>
          <CardDescription>Recommendations based on your soil data will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {advice ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Recommendations</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap">{advice}</AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-muted-foreground p-8">
              <p>Enter your soil data and click "Get Advice" to see recommendations.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
