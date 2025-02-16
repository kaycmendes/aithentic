"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon"
      className="bg-background border-2 border-muted shadow-sm w-10 h-10"
      onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-4 w-4 block dark:hidden" />
      <MoonIcon className="h-4 w-4 hidden dark:block" />
    </Button>
  );
} 