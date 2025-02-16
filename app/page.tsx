"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import OptionsPanel from '@/components/OptionsPanel';
import { processText } from '@/lib/api/chutes';
import aiWords from '@/lib/utils/filterout.json';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CopyIcon, Loader2Icon, SparklesIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const MODELS = [
  { id: 'hugging-quants/Meta-Llama-3.1-70B-Instruct-AWQ-INT4', name: 'Llama 3.1 70B' },
  { id: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B', name: 'DeepSeek R1' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek', api: 'openrouter' }
];

export default function Home() {
  const [userText, setUserText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    personality: 0,
    vocabulary: 0,
    correctness: 0,
    bias: 0,
    anxiety: 0,
    intent: 0,
    emphasis: 0,
    accent: '',
    grammar: 0
  });
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  
  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Filter out AI-specific words before processing
      const filteredText = userText.split(' ').filter(word => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
        return !aiWords.titles.includes(cleanWord);
      }).join(' ');

      const processed = await processText(filteredText, filters, selectedModel);
      setOutputText(processed);
    } catch (error) {
      console.error("Error processing text:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText);
  }, [outputText]);

  useEffect(() => {
    console.log('Current filters:', filters);
  }, [filters]);

  return (
    <div className="h-full w-full">
      <div className="flex h-full gap-6 overflow-hidden">
        <OptionsPanel filters={filters} onFilterChange={handleFilterChange} />
        <Card className="flex-1 h-full overflow-hidden flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-xl">Humanize Your Text</CardTitle>
            <CardDescription className="text-muted-foreground">
              Convert robotic AI text into natural human language
            </CardDescription>
          </CardHeader>
          
          <div className="flex-1 overflow-y-auto">
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="input-text">Input Text</Label>
                <Textarea
                  id="input-text"
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Paste your AI-generated text here..."
                  className="h-48 resize-none rounded-lg overflow-y-auto"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Humanized Output</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCopy}
                    disabled={!outputText}
                  >
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                {isProcessing ? (
                  <div className="space-y-3">
                    <Skeleton className="h-32 w-full rounded-lg bg-muted" />
                    <Skeleton className="h-4 w-1/3 rounded-lg" />
                  </div>
                ) : (
                  <div className="rounded-lg border bg-muted/30 p-4 prose dark:prose-invert max-w-none overflow-y-auto max-h-96">
                    {outputText || "Your humanized text will appear here..."}
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          <div className="sticky bottom-0 bg-background border-t p-4 space-y-4">
            <div className="flex gap-2">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleSubmit}
                className="flex-1 gap-2 hover:shadow-md transition-shadow"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4" />
                    Humanize Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
