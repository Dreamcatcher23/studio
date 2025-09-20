import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatClient } from "./chat-client";
import { Users } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-5rem)]">
            <Card className="mb-4 shrink-0">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Community / Peer Forum</CardTitle>
                            <CardDescription>Collaborate with other farmers or get instant help from our AI assistant.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <ChatClient />
        </div>
    );
}
