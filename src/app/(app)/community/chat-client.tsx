"use client";

import { useFormStatus } from "react-dom";
import { communityChatbotAssistance } from "@/ai/flows/community-chatbot-assistance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Bot, User, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/language-context";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const translations = {
  initialMessage: {
    en: "Hello! I am your AI farming assistant. How can I help you today?",
    hi: "नमस्ते! मैं आपका एआई खेती सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  },
  submitError: {
    en: "Sorry, an error occurred:",
    hi: "क्षमा करें, एक त्रुटि हुई:",
    kn: "ಕ್ಷಮಿಸಿ, ದೋಷವೊಂದು ಸಂಭವಿಸಿದೆ:",
  },
  thinking: {
    en: "Thinking...",
    hi: "सोच रहा हूँ...",
    kn: "ಆಲೋಚಿಸುತ್ತಿದ್ದೇನೆ...",
  },
  placeholder: {
    en: "Ask a question...",
    hi: "एक प्रश्न पूछें...",
    kn: "ಒಂದು ಪ್ರಶ್ನೆ ಕೇಳಿ...",
  },
  send: {
    en: "Send",
    hi: "भेजें",
    kn: "ಕಳುಹಿಸು",
  }
};

function SubmitButton() {
    const { pending } = useFormStatus();
    const { t } = useLanguage();
    return (
        <Button type="submit" size="icon" disabled={pending} className="shrink-0">
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">{t(translations.send)}</span>
        </Button>
    );
}

export function ChatClient() {
  const { t, language } = useLanguage();
  
  const initialMessages = useMemo<Message[]>(() => [
    {
      role: "assistant",
      content: t(translations.initialMessage),
    },
  ], [language, t]);

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset to initial message when language changes
    setMessages(initialMessages);
  }, [initialMessages]);

  const formAction = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    formRef.current?.reset();
    
    try {
      const result = await communityChatbotAssistance({ query, language });
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `${t(translations.submitError)} ${e.message}` }]);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <Card className="flex-1 flex flex-col h-full">
      <CardContent className="flex-1 flex flex-col p-4 gap-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {useFormStatus().pending && (
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                        <AvatarFallback>
                        <Bot className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        <span>{t(translations.thinking)}</span>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <form ref={formRef} action={formAction} className="flex items-center gap-2 border-t pt-4">
          <Input
            name="query"
            placeholder={t(translations.placeholder)}
            autoComplete="off"
            className="flex-1"
            required
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
