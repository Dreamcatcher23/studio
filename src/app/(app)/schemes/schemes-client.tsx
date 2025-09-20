"use client";

import { useState } from "react";
import type { GovernmentScheme } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, FileText, CheckCircle, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";

interface SchemesClientProps {
  schemes: GovernmentScheme[];
}

const translations = {
  searchPlaceholder: {
    en: "Search for schemes...",
    hi: "योजनाओं के लिए खोजें...",
    kn: "ಯೋಜನೆಗಳಿಗಾಗಿ ಹುಡುಕಿ...",
  },
  deadline: {
    en: "Deadline",
    hi: "समयसीमा",
    kn: "ಗಡುವು",
  },
  eligibility: {
    en: "Eligibility",
    hi: "पात्रता",
    kn: "ಅರ್ಹತೆ",
  },
  documents: {
    en: "Documents Required",
    hi: "आवश्यक दस्तावेज़",
    kn: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು",
  },
  applyNow: {
    en: "Apply Now",
    hi: "अभी आवेदन करें",
    kn: "ಈಗಲೇ ಅನ್ವಯಿಸಿ",
  },
  noSchemes: {
    en: "No schemes found matching your search.",
    hi: "आपकी खोज से मेल खाने वाली कोई योजना नहीं मिली।",
    kn: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
  },
};

export function SchemesClient({ schemes }: SchemesClientProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={t(translations.searchPlaceholder)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
        </div>
        
        {filteredSchemes.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredSchemes.map((scheme) => (
                    <AccordionItem value={scheme.id} key={scheme.id} className="border bg-card rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                                <span className="font-semibold text-base">{scheme.name}</span>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-xs text-muted-foreground">{t(translations.deadline)}: {scheme.deadline !== 'N/A' ? new Date(scheme.deadline).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 space-y-4 text-muted-foreground">
                            <p>{scheme.description}</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h4 className="font-semibold flex items-center text-card-foreground"><CheckCircle className="h-4 w-4 mr-2 text-primary" />{t(translations.eligibility)}</h4>
                                    <p className="text-sm">{scheme.eligibility}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold flex items-center text-card-foreground"><FileText className="h-4 w-4 mr-2 text-primary" />{t(translations.documents)}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scheme.documents.map((doc, index) => (
                                            <Badge variant="secondary" key={index}>{doc}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                                <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                                    {t(translations.applyNow)}
                                    <ExternalLink className="h-4 w-4 ml-2" />
                                </a>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        ) : (
            <div className="text-center text-muted-foreground p-8 bg-card rounded-lg">
                {t(translations.noSchemes)}
            </div>
        )}
    </div>
  );
}
