"use client";

import { useState, useMemo } from "react";
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
import { Separator } from "@/components/ui/separator";

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

export function CostCalculatorClient() {
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
              <CardTitle>Cost-Benefit Calculator</CardTitle>
              <CardDescription>Enter your costs and expected revenue to see the estimated profit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Input Costs (₹)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(form.getValues()).slice(0, 7).map((key) => (
                     <FormField
                        key={key}
                        control={form.control}
                        name={key as keyof FormData}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</FormLabel>
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
                <h3 className="text-lg font-semibold mb-2">Expected Revenue</h3>
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                        control={form.control}
                        name="expectedYield"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expected Yield (Quintals)</FormLabel>
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
                            <FormLabel>Market Price (₹ per Quintal)</FormLabel>
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
          <CardTitle>Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Input Cost</span>
            <span className="font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Expected Revenue</span>
            <span className="font-semibold">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Net Profit / Loss</span>
            <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netProfit.toLocaleString('en-IN')}
            </span>
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">This is an estimation. Actual results may vary.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
