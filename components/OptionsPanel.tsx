import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PresetManager from "./PresetManager";

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
    punctuation: number;
    phraseStructure: number;
    nonlinear: number;
    humanStyle: number;
    wordSize: number;
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
  const [accent, setAccent] = useState(filters.accent || '');
  const [grammar, setGrammar] = useState(filters.grammar || 0);
  const [punctuation, setPunctuation] = useState(filters.punctuation || 0);
  const [phraseStructure, setPhraseStructure] = useState(filters.phraseStructure || 0);
  const [nonlinear, setNonlinear] = useState(filters.nonlinear || 0);
  const [humanStyle, setHumanStyle] = useState(filters.humanStyle || 0);
  const [wordSize, setWordSize] = useState(filters.wordSize || 0);

  const [presets, setPresets] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("presets") || "{}");
    }
    return {};
  });

  useEffect(() => {
    setPersonality(filters.personality || 0);
    setVocabulary(filters.vocabulary || 0);
    setCorrectness(filters.correctness || 0);
    setBias(filters.bias || 0);
    setAnxiety(filters.anxiety || 0);
    setIntent(filters.intent || 0);
    setEmphasis(filters.emphasis || 0);
    setAccent(filters.accent || '');
    setGrammar(filters.grammar || 0);
    setPunctuation(filters.punctuation || 0);
    setPhraseStructure(filters.phraseStructure || 0);
    setNonlinear(filters.nonlinear || 0);
    setHumanStyle(filters.humanStyle || 0);
    setWordSize(filters.wordSize || 0);
  }, [filters]);

  useEffect(() => {
    const newFilters = {
      personality,
      vocabulary,
      correctness,
      bias,
      anxiety,
      intent,
      emphasis,
      accent,
      grammar,
      punctuation,
      phraseStructure,
      nonlinear,
      humanStyle,
      wordSize
    };

    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      onFilterChange(newFilters);
    }
  }, [personality, vocabulary, correctness, bias, anxiety, intent, emphasis, accent, grammar, punctuation, phraseStructure, nonlinear, humanStyle, wordSize]);

  const handleSliderChange = (key: string, value: number) => {
    // Create the update object
    const update = { [key]: value };
    
    // Update local state
    switch (key) {
      case 'personality':
        setPersonality(value);
        break;
      case 'vocabulary':
        setVocabulary(value);
        break;
      case 'correctness':
        setCorrectness(value);
        break;
      case 'bias':
        setBias(value);
        break;
      case 'anxiety':
        setAnxiety(value);
        break;
      case 'intent':
        setIntent(value);
        break;
      case 'emphasis':
        setEmphasis(value);
        break;
      case 'grammar':
        setGrammar(value);
        break;
      case 'punctuation':
        setPunctuation(value);
        break;
      case 'phraseStructure':
        setPhraseStructure(value);
        break;
      case 'nonlinear':
        setNonlinear(value);
        break;
      case 'humanStyle':
        setHumanStyle(value);
        break;
      case 'wordSize':
        setWordSize(value);
        break;
      default:
        break;
    }
    
    // Notify parent of change
    onFilterChange({
      ...filters,
      ...update
    });
  };

  const handleSavePreset = (name: string) => {
    const newPresets = { ...presets, [name]: filters };
    localStorage.setItem("presets", JSON.stringify(newPresets));
    setPresets(newPresets);
  };

  const handleLoadPreset = (settings: any) => {
    onFilterChange(settings);
  };

  const handleDeletePreset = (name: string) => {
    const newPresets = { ...presets };
    delete newPresets[name];
    localStorage.setItem("presets", JSON.stringify(newPresets));
    setPresets(newPresets);
  };

  return (
    <Card className="w-96 bg-background shadow-2xl border-2 border-muted">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Adjust Parameters</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize the humanization process
          </CardDescription>
        </div>
        <PresetManager
          presets={presets}
          onSave={handleSavePreset}
          onLoad={handleLoadPreset}
          onDelete={handleDeletePreset}
        />
      </CardHeader>
      <CardContent className="space-y-6 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-5 pb-6">
          <div className="space-y-2">
            <Label>Regional Accent</Label>
            <Input 
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              placeholder="e.g., Southern, British, etc."
              className="rounded-lg"
            />
          </div>

          {Object.entries({
            personality: 'Personality Strength',
            vocabulary: 'Vocabulary Complexity',
            correctness: 'Imperfection Level',
            bias: 'Bias',
            anxiety: 'Anxiety Level',
            intent: 'Intent Clarity',
            emphasis: 'Speech Emphasis',
            grammar: 'Grammar Flexibility',
            punctuation: 'Punctuation Mistakes on purpose',
            phraseStructure: 'Unusual Phrase Structure',
            nonlinear: 'Non-linear Flow',
            humanStyle: 'Human Style Strength',
            wordSize: 'Sentence Length'
          }).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{label}</Label>
                <span className="text-sm text-muted-foreground">
                  {typeof filters[key as keyof typeof filters] === 'number' 
                    ? `${filters[key as keyof typeof filters]}%` 
                    : '0%'}
                </span>
              </div>
              {typeof filters[key as keyof typeof filters] === 'number' && (
                <Slider
                  value={[filters[key as keyof typeof filters] as number]}
                  onValueChange={(value) => handleSliderChange(key, value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_.slider-track]:h-2 [&_.slider-track]:rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 