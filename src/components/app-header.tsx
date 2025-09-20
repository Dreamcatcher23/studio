"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const currentPage = navLinks.find((link) => link.href === pathname);
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "kn", name: "ಕನ್ನಡ" },
  ];

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <h1 className="text-xl font-semibold">{currentPage?.label || 'Krishi Sahayak'}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2 rounded-full border bg-muted p-1">
        {languages.map((lang) => (
            <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "ghost"}
                size="sm"
                className={cn("rounded-full", language === lang.code ? "bg-primary text-primary-foreground" : "")}
                onClick={() => setLanguage(lang.code)}
            >
                {lang.name}
            </Button>
        ))}
      </div>
    </header>
  );
}
