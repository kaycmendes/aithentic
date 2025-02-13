import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiline?: boolean;
}

// Renders an input or textarea based on the 'multiline' prop
export function Input({ multiline, className = '', ...props }: InputProps) {
  if (multiline) {
    return (
      <textarea
        className={`p-2 border rounded resize-y w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }
  return (
    <input
      className={`p-2 border rounded w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
} 