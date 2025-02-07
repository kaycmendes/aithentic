import './globals.css';

export const metadata = {
  title: "AI-thentic",
  description: "Advanced text refinement tool for human-like AI output",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
