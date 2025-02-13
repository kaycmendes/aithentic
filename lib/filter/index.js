import { processText } from "../api/chutes";
import {inputText} from "../app/page";
import {
   accent, personality, vocabulary, 
   correctness, anxiety,
   intent, emphasis, bias, contradiction 
  } from "../options"; 

let requirements = {
  accent: accent,
  personality: personality,
  vocabulary: vocabulary,
  correctness: correctness,
  anxiety: anxiety,
  intent: intent,
  emphasis: emphasis,
  bias: bias,
  contradiction: contradiction
};

const accentPrompt = `
You are a language refinement assistant specializing in regional and cultural speech patterns. Your task is to modify the text below by infusing it with a distinct accent that captures authentic regional expressions and colloquial nuances. Incorporate characteristic idioms, natural phrasing, and culturally specific vocabulary while preserving the original meaning. Ensure that the text is true to the accept and dialect based on the request.

Add the accent based on the requirements: ${requirements} to the this text: ${inputText}
`;

export const applyAccentFilter = async (text) => {
  const response = await processText(text, {
    accent: 100,
  });
  return response;
};
