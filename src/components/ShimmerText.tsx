"use client";

import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  text?: string;
  className?: string;
}

export default function ShimmerText({
  text = "Text Shimmer",
  className,
}: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "shimmer-text inline-block bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text text-transparent",
        className
      )}
    >
      {text}
    </span>
  );
}
