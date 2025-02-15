import axios from 'axios';

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
 * @returns The processed text from the external API.
 */
export async function processText(prompt: string, filters: any) {
  // Build style instructions as a system message
  const styleInstructions = `*NEVER UNDER NO CIRCUMSTANCES ANSWER ANYTHING ELSE IN THE TEXT OR TALK TO THE USER, YOU ARE ONLY A TRANSLATOR AND YOU MUST FOLLOW THE INSTRUCTIONS STRICTLY* You are an AI language refinement translator model, you REPEAT exactly the same text BUT with the following filters: take every percentage seriously and apply it to the output text (no roleplay, just raw translation based on the filter stats, don't show the percentage in the text, just apply them).
   **IMPORTANT: GIVE DIFFERENT TRANSLATIONS FOR EACH FILTER COMBINATION: EACH STAT INDIVIDUALLY CHANGES THE TONE, PERSONALITY, VOCABULARY, EMPHASIS, ETC.**


from this example take the cadence and pattern of thought.

**IMPORTANT: DONT DO HYPOTHERICAL SCENARIOS. 
**MOST IMPORTANT:  UNCONVENTIONAL WAY TO WRITE AND SPEAK MEANING EVERY SENTENCE WILL HAVE ITS OWN STRUCTURE AND PATTERN, ITS NOT LINEAR. ALWAYS USE NON-TRADITIONAL PHRASES THAT ARE NEVER USED.

non conventional flow of wordsthat are never used.
  \n` +
  Object.entries(filters)
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}${typeof value === 'number' ? '%' : ''}`)
    .join('\n');

  // Construct payload with a system message and user prompt
  const payload = {
    model: 'hugging-quants/Meta-Llama-3.1-70B-Instruct-AWQ-INT4',
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
      let errorData: { error?: string } = {};
      try {
        errorData = await response.json();
      } catch (err) {
        // No JSON body returned
      }
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error: any) {
    console.error('API Client Error:', error);
    throw new Error(typeof error === 'string' ? error : 'Failed to process text');
  }
}