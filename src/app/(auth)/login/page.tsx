"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Sprout className="size-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Krishi Sahayak</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your farming dashboard
            </p>
          </div>
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Welcome back, farmer!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="/dashboard" className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="farmer@example.com"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="#"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://picsum.photos/seed/farm/1280/800"
          alt="Image of a lush green farm"
          data-ai-hint="farm field"
          width="1280"
          height="800"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute bottom-8 left-8 right-8 p-4 bg-background/50 backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-bold text-foreground">Smarter Farming, Brighter Future</h3>
            <p className="text-muted-foreground mt-2">Your AI-powered assistant for modern agriculture. Get insights, manage tasks, and connect with a community of innovators.</p>
        </div>
      </div>
    </div>
  );
}
