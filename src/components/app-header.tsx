"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";

export function AppHeader() {
  const pathname = usePathname();
  const currentPage = navLinks.find((link) => link.href === pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <h1 className="text-xl font-semibold">{currentPage?.label || 'Krishi Sahayak'}</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>हिन्दी (Hindi)</DropdownMenuItem>
            <DropdownMenuItem>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
