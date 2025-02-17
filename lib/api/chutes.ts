import axios from 'axios';
import aiWords from '@/lib/utils/filterout.json';

interface ChutesRequest {
  messages: Array<{ role: string; content: string }>;
  model: string;
  temperature: number;
  // Personality parameters from filters
  personality?: number;
  vocabulary?: number;
  correctness?: number;
  bias?: number;
  anxiety?: number;
  intent?: number;
  emphasis?: number;
  accent?: string;
  punctuation?: number;
  phraseStructure?: number;
  nonlinear?: number;
  humanStyle?: number;
  wordSize?: number;
}

interface ChutesResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Processes the given prompt by constructing a custom payload that includes
 * filter settings as style guidelines (in a system message).
 * @param prompt - The original prompt text from the user.
 * @param filters - The filters object defining personality, vocabulary, etc.
 * @param model - The selected model for processing.
 * @param mode - The mode of processing (either "translate" or "prompt").
 * @returns The processed text from the external API.
 */
export async function processText(
  prompt: string,
  filters: any,
  model: string = 'hugging-quants/Meta-Llama-3.1-70B-Instruct-AWQ-INT4',
  mode: "translate" | "prompt" = "translate"
) {
  // Build style instructions based on selected mode
  let styleInstructions = "";
  if (mode === "translate") {
    styleInstructions = `*TRANSLATION MODE:* You are a strict translator. Repeat exactly the original text, applying the following filter modifications (percentages must be taken seriously, but do not display the numbers in your response).
    
Filters:
` + Object.entries(filters)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}${typeof value === 'number' ? '%' : ''}`)
      .join('\n');
  } else {
    styleInstructions = `*PROMPT MODE:* You are a creative AI generator. Follow the user's instruction exactly (for example: "you are a songwriter") and produce creative content while integrating the following filter settings (apply the percentages to your tone and style, but do not include the numbers in your output).
    
Filters:
` + Object.entries(filters)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}${typeof value === 'number' ? '%' : ''}`)
      .join('\n');
  }

  // Construct the payload with system and user messages
  const payload = {
    model,
    messages: [
      { role: 'system', content: styleInstructions },
      { role: 'user', content: prompt }
    ],
    temperature: 0.5,
    max_tokens: 1024
  };

  try {
    const response = await fetch('/api/chutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error: any) {
    console.error('API Client Error:', error);
    throw new Error(typeof error === 'string' ? error : 'Failed to process text');
  }
}