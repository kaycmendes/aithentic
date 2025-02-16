"use client";

import { m } from "framer-motion";

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <m.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full"
      transition={{ duration: 0.3 }}
    >
      {children}
    </m.main>
  );
} 