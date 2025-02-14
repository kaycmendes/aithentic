import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
        <body className={`${inter.className} flex h-screen bg-gray-50 dark:bg-gray-900`}>
          <div className="flex-1 flex max-w-7xl mx-auto w-full">
            {children}
          </div>
        </body>
    </html>
  );
}
