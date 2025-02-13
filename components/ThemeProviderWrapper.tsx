"use client";
import { ThemeProvider } from "next-themes";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

// Wraps children with the next-themes provider using a "class" attribute.
export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
} 