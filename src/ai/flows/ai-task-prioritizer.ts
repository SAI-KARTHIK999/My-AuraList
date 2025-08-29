// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI agent that suggests task priorities based on task name and user-provided parameters.
 *
 * - aiTaskPrioritizer - A function that handles the task prioritization process.
 * - AiTaskPrioritizerInput - The input type for the aiTaskPrioritizer function.
 * - AiTaskPrioritizerOutput - The return type for the aiTaskPrioritizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTaskPrioritizerInputSchema = z.object({
  taskName: z.string().describe('The name of the task.'),
  deadline: z.string().optional().describe('The deadline for the task, if any.'),
  importance: z
    .string()
    .optional()
    .describe('The importance of the task (e.g., High, Medium, Low).'),
  urgency: z
    .string()
    .optional()
    .describe('The urgency of the task (e.g., Immediate, Soon, Later).'),
  context: z
    .string()
    .optional()
    .describe('Any additional context or details about the task.'),
});
export type AiTaskPrioritizerInput = z.infer<typeof AiTaskPrioritizerInputSchema>;

const AiTaskPrioritizerOutputSchema = z.object({
  priorityScore: z
    .number()
    .describe(
      'A numerical score indicating the priority of the task (e.g., 1-100, where higher is more important).'
       + 'Be sure to provide a score based on the parameters provided by the user.'
    ),
  reasoning: z
    .string()
    .describe('Explanation of why the AI assigned the given priority score.'),
  suggestedAction: z
    .string()
    .optional()
    .describe('Suggested next steps or actions related to the task.'),
});
export type AiTaskPrioritizerOutput = z.infer<typeof AiTaskPrioritizerOutputSchema>;

export async function aiTaskPrioritizer(input: AiTaskPrioritizerInput): Promise<AiTaskPrioritizerOutput> {
  return aiTaskPrioritizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTaskPrioritizerPrompt',
  input: {schema: AiTaskPrioritizerInputSchema},
  output: {schema: AiTaskPrioritizerOutputSchema},
  prompt: `You are an AI assistant designed to help users prioritize tasks.

  Based on the task name, deadline, importance, urgency, and any additional context provided, you will determine a priority score for the task and explain your reasoning.

  Task Name: {{{taskName}}}
  Deadline: {{{deadline}}}
  Importance: {{{importance}}}
  Urgency: {{{urgency}}}
  Context: {{{context}}}

  Please provide a priority score (1-100, higher is more important), explain your reasoning for the score, and suggest any next steps or actions related to the task.
`,
});

const aiTaskPrioritizerFlow = ai.defineFlow(
  {
    name: 'aiTaskPrioritizerFlow',
    inputSchema: AiTaskPrioritizerInputSchema,
    outputSchema: AiTaskPrioritizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
