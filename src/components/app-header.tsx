"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";

type Language = 'en' | 'hi' | 'kn';

export function AppHeader() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  
  const currentPage = navLinks.find((link) => link.href === pathname);
  const currentPageLabel = currentPage ? t(currentPage.label) : 'Krishi Sahayak';

  const languages: { code: Language; name: string }[] = [
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
        <h1 className="text-xl font-semibold">{currentPageLabel}</h1>
      </div>

      <div className="ml-auto flex items-center">
        <Tabs value={language} onValueChange={(value) => setLanguage(value as Language)} className="w-full">
          <TabsList>
            {languages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code}>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
