"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import OptionsPanel from '@/components/OptionsPanel';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    personality: 50,
    vocabulary: 50,
    correctness: 50,
    bias: 50,
  });

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Mock processing pipeline
    setTimeout(() => {
      setOutputText(inputText + " [Processed]");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 p-6">
      <header className="flex justify-end">
        <DarkModeToggle />
      </header>
      <div className="flex flex-1 gap-6">
        <OptionsPanel filters={filters} onFilterChange={setFilters} />
        
        <div className="flex-1 flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Input Text</h2>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your AI-generated text..."
                className="h-32 resize-y"
                multiline
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Output Text</h2>
              {isProcessing ? (
                <Skeleton className="h-32 w-full rounded-md" />
              ) : (
                <div className="min-h-32 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  {outputText}
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Humanize Text'}
          </Button>
        </div>
      </div>
    </div>
  );
}
