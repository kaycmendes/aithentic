import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

interface OptionsPanelProps {
  filters: {
    personality: number;
    vocabulary: number;
    correctness: number;
    bias: number;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    anxiety: number;
    intent: number;
    emphasis: number;
    accent: string;
    grammar: number;
  };
  onFilterChange: (filters: any) => void;
}

export default function OptionsPanel({ filters, onFilterChange }: OptionsPanelProps) {

  const [personality, setPersonality] = useState(filters.personality || 0);
  const [vocabulary, setVocabulary] = useState(filters.vocabulary || 0);
  const [correctness, setCorrectness] = useState(filters.correctness || 0);
  const [bias, setBias] = useState(filters.bias || 0);
  const [anxiety, setAnxiety] = useState(filters.anxiety || 0);
  const [intent, setIntent] = useState(filters.intent || 0);
  const [emphasis, setEmphasis] = useState(filters.emphasis || 0);
  const [accent, setAccent] = useState(filters.accent);
  const [grammar, setGrammar] = useState(filters.grammar || 0);

  useEffect(() => {
    onFilterChange({
      personality,
      vocabulary,
      correctness,
      bias,
      anxiety,
      intent,
      emphasis,
      accent,
      grammar
    });
  }, [personality, vocabulary, correctness, bias, anxiety, intent, emphasis, accent, grammar]);

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Humanization Filters</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100 ">
            
          </label>
          <input placeholder="Enter the accent" className=" w-full p-2 border rounded resize-y bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"  type="text" value={accent} onChange={(e) => setAccent(e.target.value)} onBlur={() => onFilterChange({ ...filters, accent })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Personality Strength
            <span className="ml-2 text-gray-500">{personality}%</span>
          </label>
          <Slider
            value={[personality]}
            onValueChange={(value) => setPersonality(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vocabulary Complexity
            <span className="ml-2 text-gray-500">{vocabulary}%</span>
          </label>
          <Slider
            value={[vocabulary]}
            onValueChange={(value) => setVocabulary(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Imperfection Level
            <span className="ml-2 text-gray-500">{correctness}%</span>
          </label>
          <Slider
            value={[correctness]}
            onValueChange={(value) => setCorrectness(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Bias Correction
            <span className="ml-2 text-gray-500">{bias}%</span>
          </label>
          <Slider
            value={[bias]}
            onValueChange={(value) => setBias(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Anxiety
            <span className="ml-2 text-gray-500">{anxiety}%</span>
          </label>
          <Slider
            value={[anxiety]}
            onValueChange={(value) => setAnxiety(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Intent
            <span className="ml-2 text-gray-500">{intent}%</span>
          </label>
          <Slider
            value={[intent]}
            onValueChange={(value) => setIntent(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Emphasis
            <span className="ml-2 text-gray-500">{emphasis}%</span>
          </label>
          <Slider
            value={[emphasis]}
            onValueChange={(value) => setEmphasis(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Grammar
            <span className="ml-2 text-gray-500">{grammar}%</span>
          </label>
          <Slider
            value={[grammar]}
            onValueChange={(value) => setGrammar(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
} 