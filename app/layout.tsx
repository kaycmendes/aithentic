import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedLayout from "@/components/animated-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI-thentic",
  description: "Advanced text refinement tool for human-like AI output",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col h-screen">
            <nav className="border-b bg-background px-4 sm:px-6">
              <div className="flex h-16 items-center justify-between mx-auto w-full max-w-7xl">
                <h1 className="text-lg font-semibold">AI/thentic</h1>
                <ThemeToggle />
              </div>
            </nav>
            <main className="flex-1 overflow-hidden">
              <div className="h-[calc(100vh-4rem)] w-full max-w-7xl mx-auto p-4 sm:p-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
