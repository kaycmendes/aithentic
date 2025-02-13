import React from "react";

interface SkeletonProps {
  className?: string;
}

// A simple animated skeleton placeholder
export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
} 