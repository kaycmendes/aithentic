import axios from 'axios';
//update to make it type  
// Ensure environment variables are set
if (!process.env.CHUTES_API_URL) {
  throw new Error("CHUTES_API_URL environment variable is not defined");
}

if (!process.env.CHUTES_MODEL) {
  throw new Error("CHUTES_MODEL environment variable is not defined");
}

const CHUTES_API_URL = process.env.CHUTES_API_URL;
//load model from chutes
const model = process.env.CHUTES_MODEL;
export const processText = async (text: string, filters: any) => {
  try {
    const response = await axios.post(CHUTES_API_URL, {
      model,
      messages: [{ role: 'user', content: text }],
      temperature: 0.5,
      max_tokens: 1000,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Chutes API Error:', error);
    throw new Error('Failed to process text');
  }
};
