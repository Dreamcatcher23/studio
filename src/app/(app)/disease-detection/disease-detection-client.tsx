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
import { useLanguage } from '@/contexts/language-context';

type FormState = {
    result: AnalyzeCropImageForDiseaseOutput | null;
    error: string | null;
};

const initialState: FormState = {
    result: null,
    error: null,
};

const translations = {
  submitForAnalysis: { en: 'Submit for Analysis', hi: 'विश्लेषण के लिए भेजें', kn: 'ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಸಲ್ಲಿಸಿ' },
  fillDetails: { en: 'Fill in the details below.', hi: 'नीचे दिए गए विवरण भरें।', kn: 'ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' },
  cropImage: { en: 'Crop Image', hi: 'फसल की छवि', kn: 'ಬೆಳೆ ಚಿತ್ರ' },
  uploadMessage: { en: 'Click to upload or drag and drop', hi: 'अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें', kn: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಮಾಡಿ' },
  removeImage: { en: 'Remove image', hi: 'छवि हटाएँ', kn: 'ಚಿತ್ರವನ್ನು ತೆಗೆದುಹಾಕಿ' },
  description: { en: 'Description', hi: 'विवरण', kn: 'ವಿವರಣೆ' },
  descriptionPlaceholder: { en: "e.g., 'My tomato plant leaves have yellow spots and are wilting. This started 3 days ago.'", hi: "उदा., 'मेरे टमाटर के पौधे की पत्तियों पर पीले धब्बे हैं और वे मुरझा रही हैं। यह 3 दिन पहले शुरू हुआ।'", kn: "ಉದಾ., 'ನನ್ನ ಟೊಮೆಟೊ ಗಿಡದ ಎಲೆಗಳು ಹಳದಿ ಚುಕ್ಕೆಗಳನ್ನು ಹೊಂದಿವೆ ಮತ್ತು ಬಾಡುತ್ತಿವೆ. ಇದು 3 ದಿನಗಳ ಹಿಂದೆ ಪ್ರಾರಂಭವಾಯಿತು.'" },
  analyzeCrop: { en: 'Analyze Crop', hi: 'फसल का विश्लेषण करें', kn: 'ಬೆಳೆ ವಿಶ್ಲೇಷಿಸಿ' },
  analyzing: { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...', kn: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' },
  analysisResult: { en: 'Analysis Result', hi: 'विश्लेषण परिणाम', kn: 'ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ' },
  resultDescription: { en: 'AI-powered diagnosis and recommendations will appear here.', hi: 'एआई-संचालित निदान और सिफारिशें यहां दिखाई देंगी।', kn: 'AI-ಚಾಲಿತ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಶಿಫಾರಸುಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.' },
  aiAnalyzing: { en: 'The AI is analyzing your crop...This may take a moment.', hi: 'एआई आपकी फसल का विश्लेषण कर रहा है... इसमें थोड़ा समय लग सकता है।', kn: 'ಎಐ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ... ಇದಕ್ಕೆ ಸ್ವಲ್ಪ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಬಹುದು.' },
  analysisFailed: { en: 'Analysis Failed', hi: 'विश्लेषण विफल रहा', kn: 'ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ' },
  possibleDiseases: { en: 'Possible Diseases', hi: 'संभावित रोग', kn: 'ಸಂಭವನೀಯ ರೋಗಗಳು' },
  confidence: { en: 'confidence', hi: 'आत्मविश्वास', kn: 'ವಿಶ್ವಾಸ' },
  recommendations: { en: 'Recommendations', hi: 'सिफारिशें', kn: 'ಶಿಫಾರಸುಗಳು' },
  submitImagePrompt: { en: 'Submit an image to begin analysis.', hi: 'विश्लेषण शुरू करने के लिए एक छवि सबमिट करें।', kn: 'ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಚಿತ್ರವನ್ನು ಸಲ್ಲಿಸಿ.' },
  pleaseUploadImage: { en: 'Please upload an image.', hi: 'कृपया एक छवि अपलोड करें।', kn: 'ದಯವಿಟ್ಟು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.' },
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
    const { t } = useLanguage();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t(translations.analyzing)}
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t(translations.analyzeCrop)}
                </>
            )}
        </Button>
    );
}

export function DiseaseDetectionClient() {
    const { t } = useLanguage();
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
            <form action={formAction} onSubmit={(e) => { if (!preview) { e.preventDefault(); alert(t(translations.pleaseUploadImage)); }}}>
                <Card>
                    <CardHeader>
                        <CardTitle>{t(translations.submitForAnalysis)}</CardTitle>
                        <CardDescription>{t(translations.fillDetails)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="crop-image">{t(translations.cropImage)}</Label>
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
                                        <span className="sr-only">{t(translations.removeImage)}</span>
                                    </Button>
                                </div>
                            ) : (
                                <label htmlFor="crop-image" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-card">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">{t(translations.uploadMessage)}</p>
                                    <Input id="crop-image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" ref={fileInputRef} required/>
                                </label>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">{t(translations.description)}</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder={t(translations.descriptionPlaceholder)}
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
                        <CardTitle>{t(translations.analysisResult)}</CardTitle>
                        <CardDescription>{t(translations.resultDescription)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {useFormStatus().pending && !state.result && (
                            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="text-muted-foreground">{t(translations.aiAnalyzing).split('...')[0]}...<br/>{t(translations.aiAnalyzing).split('...')[1]}</p>
                            </div>
                        )}

                        {state.error && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{t(translations.analysisFailed)}</AlertTitle>
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}
                        
                        {state.result && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{t(translations.possibleDiseases)}</h3>
                                    <div className="space-y-4">
                                        {state.result.diseaseIdentification.possibleDiseases.map((disease, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-medium">{disease}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {Math.round(state.result!.diseaseIdentification.confidenceLevels[index] * 100)}% {t(translations.confidence)}
                                                    </p>
                                                </div>
                                                <Progress value={state.result!.diseaseIdentification.confidenceLevels[index] * 100} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>{t(translations.recommendations)}</AlertTitle>
                                    <AlertDescription className="whitespace-pre-wrap">{state.result.recommendations}</AlertDescription>
                                </Alert>
                            </div>
                        )}

                        {!useFormStatus().pending && !state.result && !state.error && (
                            <div className="text-center text-muted-foreground p-8">
                                <p>{t(translations.submitImagePrompt)}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
