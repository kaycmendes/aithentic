import { Slider } from "@/components/ui/slider";

interface OptionsPanelProps {
  filters: {
    personality: number;
    vocabulary: number;
    correctness: number;
    bias: number;
    accent: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function OptionsPanel({ filters, onFilterChange }: OptionsPanelProps) {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Humanization Filters</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Accent
            //set the input for the user to type in the accent
            <input type="text" value={filters.accent} onChange={(e) => onFilterChange({ ...filters, accent: e.target.value })} />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Personality Strength
            <span className="ml-2 text-gray-500">{filters.personality}%</span>
          </label>
          <Slider
            value={[filters.personality]}
            onValueChange={(value) => onFilterChange({ ...filters, personality: value[0] })}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vocabulary Complexity
            <span className="ml-2 text-gray-500">{filters.vocabulary}%</span>
          </label>
          <Slider
            value={[filters.vocabulary]}
            onValueChange={(value) => onFilterChange({ ...filters, vocabulary: value[0] })}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Imperfection Level
            <span className="ml-2 text-gray-500">{filters.correctness}%</span>
          </label>
          <Slider
            value={[filters.correctness]}
            onValueChange={(value) => onFilterChange({ ...filters, correctness: value[0] })}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Bias Correction
            <span className="ml-2 text-gray-500">{filters.bias}%</span>
          </label>
          <Slider
            value={[filters.bias]}
            onValueChange={(value) => onFilterChange({ ...filters, bias: value[0] })}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
} 