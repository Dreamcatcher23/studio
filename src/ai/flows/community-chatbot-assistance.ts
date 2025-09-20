'use server';

/**
 * @fileOverview A community chatbot assistance AI agent.
 *
 * - communityChatbotAssistance - A function that handles the chatbot assistance process.
 * - CommunityChatbotAssistanceInput - The input type for the communityChatbotAssistance function.
 * - CommunityChatbotAssistanceOutput - The return type for the communityChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CommunityChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The question or query from the farmer.'),
  language: z.string().describe('The language for the response (e.g., "en", "hi", "kn").'),
});
export type CommunityChatbotAssistanceInput = z.infer<typeof CommunityChatbotAssistanceInputSchema>;

const CommunityChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type CommunityChatbotAssistanceOutput = z.infer<typeof CommunityChatbotAssistanceOutputSchema>;

export async function communityChatbotAssistance(input: CommunityChatbotAssistanceInput): Promise<CommunityChatbotAssistanceOutput> {
  return communityChatbotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'communityChatbotAssistancePrompt',
  input: {schema: CommunityChatbotAssistanceInputSchema},
  output: {schema: CommunityChatbotAssistanceOutputSchema},
  prompt: `You are a helpful AI chatbot assisting farmers with their questions.

  IMPORTANT: You MUST respond in the language specified by the following code: {{{language}}}.

  Respond to the following query:

  {{{query}}}`,
});

const communityChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'communityChatbotAssistanceFlow',
    inputSchema: CommunityChatbotAssistanceInputSchema,
    outputSchema: CommunityChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
