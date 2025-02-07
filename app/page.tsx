"use client";

import { useState } from 'react';
import Editor from '../components/Editor';
import OptionsPanel from '../components/OptionsPanel';
import Display from '../components/Display';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [loading, setLoading] = useState(false);

  const simulateProcessing = (text: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate processing delay (e.g., API calls or filter passes)
      setTimeout(() => {
        // For now, simply return the input text.
        resolve(text);
      }, 1500);
    });
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    setLoading(true);
    simulateProcessing(text)
      .then((result) => {
        setProcessedText(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 gap-8">
      <Editor text={inputText} onTextChange={handleTextChange} />
      <OptionsPanel onOptionChange={() => {}} options={{}} />
      <Display processedText={processedText} loading={loading} />
    </main>
  );
}
