'use server';
/**
 * @fileOverview Analyzes an image of a crop to identify potential diseases.
 *
 * - analyzeCropImageForDisease - A function that handles the crop image analysis for disease identification.
 * - AnalyzeCropImageForDiseaseInput - The input type for the analyzeCropImageForDisease function.
 * - AnalyzeCropImageForDiseaseOutput - The return type for the analyzeCropImageForDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCropImageForDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the crop.'),
  language: z.string().describe('The language for the response (e.g., "en", "hi", "kn").'),
});
export type AnalyzeCropImageForDiseaseInput = z.infer<typeof AnalyzeCropImageForDiseaseInputSchema>;

const AnalyzeCropImageForDiseaseOutputSchema = z.object({
  diseaseIdentification: z.object({
    possibleDiseases: z.array(z.string()).describe('The possible diseases identified in the crop.'),
    confidenceLevels: z.array(z.number()).describe('The confidence levels for each disease identified.'),
  }).describe('The identification of diseases based on the crop image.'),
  recommendations: z.string().describe('Recommendations for addressing the identified diseases.'),
});
export type AnalyzeCropImageForDiseaseOutput = z.infer<typeof AnalyzeCropImageForDiseaseOutputSchema>;

const GetCurrentDateInputSchema = z.object({
  format: z.string().default('YYYY-MM-DD').describe('The format of the date to return.')
});

const GetCurrentDateOutputSchema = z.string().describe('The current date in the specified format.');

const getCurrentDate = ai.defineTool(
  {
    name: 'getCurrentDate',
    description: 'Returns the current date in the specified format.',
    inputSchema: GetCurrentDateInputSchema,
    outputSchema: GetCurrentDateOutputSchema,
  },
  async (input) => {
    const { format } = input;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`;
    } else {
      return now.toLocaleDateString();
    }
  }
);

export async function analyzeCropImageForDisease(input: AnalyzeCropImageForDiseaseInput): Promise<AnalyzeCropImageForDiseaseOutput> {
  return analyzeCropImageForDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCropImageForDiseasePrompt',
  input: {schema: AnalyzeCropImageForDiseaseInputSchema},
  output: {schema: AnalyzeCropImageForDiseaseOutputSchema},
  tools: [getCurrentDate],
  prompt: `You are an expert in plant pathology. Analyze the provided image of the crop and its description to identify potential diseases.

  Incorporate the current date (using the getCurrentDate tool) to consider seasonal disease patterns and weather-related factors that might influence the diagnosis.

  Based on your analysis, provide a list of possible diseases, their confidence levels, and recommendations for addressing them.
  
  IMPORTANT: All parts of your response, including disease names and recommendations, MUST be in the language specified by the following code: {{{language}}}.

  Crop Description: {{{description}}}
  Crop Image: {{media url=photoDataUri}}`
});

const analyzeCropImageForDiseaseFlow = ai.defineFlow(
  {
    name: 'analyzeCropImageForDiseaseFlow',
    inputSchema: AnalyzeCropImageForDiseaseInputSchema,
    outputSchema: AnalyzeCropImageForDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
