import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchemesClient } from "./schemes-client";
import { mockSchemes } from "@/lib/mock-data";
import { Landmark } from "lucide-react";

export default function SchemesPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Landmark className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Government Schemes</CardTitle>
                            <CardDescription>A searchable database of government schemes and policies related to farming.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <SchemesClient schemes={mockSchemes} />
        </div>
    );
}
