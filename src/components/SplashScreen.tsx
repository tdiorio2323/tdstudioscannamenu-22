import React, { useEffect, useState } from "react";

export const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
    const matrixInterval = setInterval(() => {
      const randomText = Array(8)
        .fill(0)
        .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
        .join("");
      setMatrixText(randomText);
    }, 50);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(matrixInterval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-64 h-24 mb-8">
        <img src="/TD STUDIOS WHITE TEXT.png" alt="TD Studios" className="object-contain w-full h-full" loading="eager" />
      </div>

      <div className="font-mono text-white mb-4 h-6">{`LOADING_SYSTEM: ${matrixText}`}</div>

      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-2 font-mono text-sm text-white">{`${progress}%`}</div>
    </div>
  );
};
