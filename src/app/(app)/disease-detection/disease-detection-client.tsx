"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { analyzeCropImageForDisease, type AnalyzeCropImageForDiseaseOutput } from '@/ai/flows/analyze-crop-image-for-disease';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, Loader2, Sparkles, UploadCloud, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type FormState = {
    result: AnalyzeCropImageForDiseaseOutput | null;
    error: string | null;
};

const initialState: FormState = {
    result: null,
    error: null,
};

async function analyzeAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const photoDataUri = formData.get('photoDataUri') as string;
    const description = formData.get('description') as string;

    if (!photoDataUri || !description) {
        return { result: null, error: "Please provide both an image and a description." };
    }

    try {
        const result = await analyzeCropImageForDisease({ photoDataUri, description });
        return { result, error: null };
    } catch (e: any) {
        return { result: null, error: e.message || "An unknown error occurred." };
    }
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Crop
                </>
            )}
        </Button>
    );
}

export function DiseaseDetectionClient() {
    const [state, formAction] = useFormState(analyzeAction, initialState);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleReset = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <form action={formAction} onSubmit={(e) => { if (!preview) { e.preventDefault(); alert("Please upload an image."); }}}>
                <Card>
                    <CardHeader>
                        <CardTitle>Submit for Analysis</CardTitle>
                        <CardDescription>Fill in the details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="crop-image">Crop Image</Label>
                            <Input
                                id="photoDataUri-hidden"
                                name="photoDataUri"
                                type="hidden"
                                value={preview || ''}
                            />
                            {preview ? (
                                <div className="relative">
                                    <Image src={preview} alt="Crop preview" width={500} height={300} className="rounded-lg object-cover w-full aspect-video" />
                                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={handleReset}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Remove image</span>
                                    </Button>
                                </div>
                            ) : (
                                <label htmlFor="crop-image" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-card">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                    <Input id="crop-image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" ref={fileInputRef} required/>
                                </label>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="e.g., 'My tomato plant leaves have yellow spots and are wilting. This started 3 days ago.'"
                                required
                                rows={4}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </Card>
            </form>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis Result</CardTitle>
                        <CardDescription>AI-powered diagnosis and recommendations will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {useFormStatus().pending && !state.result && (
                            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="text-muted-foreground">The AI is analyzing your crop...<br/>This may take a moment.</p>
                            </div>
                        )}

                        {state.error && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Analysis Failed</AlertTitle>
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}
                        
                        {state.result && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Possible Diseases</h3>
                                    <div className="space-y-4">
                                        {state.result.diseaseIdentification.possibleDiseases.map((disease, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-medium">{disease}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {Math.round(state.result!.diseaseIdentification.confidenceLevels[index] * 100)}% confidence
                                                    </p>
                                                </div>
                                                <Progress value={state.result!.diseaseIdentification.confidenceLevels[index] * 100} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Recommendations</AlertTitle>
                                    <AlertDescription className="whitespace-pre-wrap">{state.result.recommendations}</AlertDescription>
                                </Alert>
                            </div>
                        )}

                        {!useFormStatus().pending && !state.result && !state.error && (
                            <div className="text-center text-muted-foreground p-8">
                                <p>Submit an image to begin analysis.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
