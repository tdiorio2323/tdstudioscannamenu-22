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
    <div className="flex items-center justify-center p-4">
      <h1
        className={cn(
          "shimmer-text text-3xl md:text-5xl font-bold bg-gradient-to-r from-neutral-950 via-neutral-400 to-neutral-950 dark:from-white dark:via-neutral-500 dark:to-white bg-clip-text text-transparent",
          className
        )}
      >
        {text}
      </h1>

      <style>
        {`
          @keyframes shimmerMove {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .shimmer-text { background-size: 200% 100%; animation: shimmerMove 2.5s linear infinite; }
        `}
      </style>
    </div>
  );
}

