"use client";
import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // On mount, check localStorage for theme preference
    const theme = localStorage.getItem("theme") || "light";
    const darkModeEnabled = theme === "dark";
    setIsDark(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleDarkMode} className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-600 rounded">
      {isDark ? (
        // Sun icon for light mode (i.e. currently dark mode enabled)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l-1.414 1.414M7.05 7.05L5.636 5.636M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      ) : (
        // Moon icon for dark mode (i.e. currently light mode enabled)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.293 14.293a8 8 0 01-11.586 0 8.002 8.002 0 0011.586 0z" />
        </svg>
      )}
    </button>
  );
} 