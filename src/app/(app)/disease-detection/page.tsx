import { DiseaseDetectionClient } from './disease-detection-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube2 } from 'lucide-react';

export default function DiseaseDetectionPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <TestTube2 className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Crop Disease Detection</CardTitle>
                            <CardDescription>Upload a clear image of an affected crop leaf or plant, and provide a short description for analysis.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <DiseaseDetectionClient />
        </div>
    )
}
