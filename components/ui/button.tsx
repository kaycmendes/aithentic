import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// A simple styled button component
export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
} 