"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatClient } from "./chat-client";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Community / Peer Forum",
    hi: "समुदाय / सहकर्मी मंच",
    kn: "ಸಮುದಾಯ / ಪೀರ್ ಫೋರಂ",
  },
  description: {
    en: "Collaborate with other farmers or get instant help from our AI assistant.",
    hi: "अन्य किसानों के साथ सहयोग करें या हमारे एआई सहायक से तुरंत सहायता प्राप्त करें।",
    kn: "ಇತರ ರೈತರೊಂದಿಗೆ ಸಹಕರಿಸಿ ಅಥವಾ ನಮ್ಮ AI ಸಹಾಯಕರಿಂದ ತ್ವರಿತ ಸಹಾಯ ಪಡೆಯಿರಿ.",
  },
};

export default function CommunityPage() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col h-[calc(100vh-5rem)]">
            <Card className="mb-4 shrink-0">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{t(translations.title)}</CardTitle>
                            <CardDescription>{t(translations.description)}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <ChatClient />
        </div>
    );
}
