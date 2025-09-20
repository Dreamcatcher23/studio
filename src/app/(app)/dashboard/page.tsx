import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navLinks } from "@/lib/nav-links";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const featureLinks = navLinks.filter(link => link.href !== '/dashboard');

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Farmer!</h1>
        <p className="text-muted-foreground">
          Your AI-powered assistant for modern agriculture. Here's what you can do:
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featureLinks.map((link) => (
          <Link href={link.href} key={link.href} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {link.label}
                </CardTitle>
                <link.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
              </CardHeader>
              <CardContent className="relative">
                <p className="text-sm text-muted-foreground pr-6">Explore {link.label.toLowerCase()}</p>
                <ArrowRight className="absolute bottom-1 right-2 h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
