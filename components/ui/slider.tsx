import React, { ChangeEvent } from "react";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
}

// A simple range slider that wraps an input of type="range"
export function Slider({ value, onValueChange, min, max, step }: SliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange([Number(e.target.value)]);
  };

  return (
    <input 
      type="range" 
      value={value[0]}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      className="w-full"
    />
  );
} 