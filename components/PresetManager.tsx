"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDownIcon, SaveIcon, TrashIcon } from "lucide-react";


interface PresetManagerProps {
  presets: Record<string, any>;
  onSave: (name: string, settings: any) => void;
  onLoad: (settings: any) => void;
  onDelete: (name: string) => void;
}

export default function PresetManager({ presets, onSave, onLoad, onDelete }: PresetManagerProps) {
  const [presetName, setPresetName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          Presets <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-4 bg-background border-2 border-muted shadow-xl">
        <div className="flex gap-2">
          <Input
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              onSave(presetName, {});
              setPresetName("");
              setOpen(false);
            }}
          >
            <SaveIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {Object.entries(presets).map(([name, settings]) => (
            <div key={name} className="flex items-center justify-between">
              <Button
                variant="outline"
                className="h-8"
                onClick={() => {
                  onLoad(settings);
                  setOpen(false);
                }}
              >
                {name}
              </Button>
              <TrashIcon
                className="h-4 w-4 text-destructive cursor-pointer"
                onClick={() => onDelete(name)}
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 