"use client";

import { useFormState, useFormStatus } from "react-dom";
import { communityChatbotAssistance } from "@/ai/flows/community-chatbot-assistance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatState = {
  messages: Message[];
  error: string | null;
};

const initialState: ChatState = {
  messages: [
    {
      role: "assistant",
      content: "Hello! I am your AI farming assistant. How can I help you today?",
    },
  ],
  error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="icon" disabled={pending} className="shrink-0">
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">Send</span>
        </Button>
    );
}

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>(initialState.messages);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const formAction = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    formRef.current?.reset();
    
    try {
      const result = await communityChatbotAssistance({ query });
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, an error occurred: ${e.message}` }]);
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
                        <span>Thinking...</span>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <form ref={formRef} action={formAction} className="flex items-center gap-2 border-t pt-4">
          <Input
            name="query"
            placeholder="Ask a question..."
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
