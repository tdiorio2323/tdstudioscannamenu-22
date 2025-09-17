interface ProofStripProps {
  metric: string;
  logos?: string[];
}

export function ProofStrip({ metric, logos = [] }: ProofStripProps) {
  return (
    <div className="relative mt-8 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-surface/70 px-6 py-6 supports-[backdrop-filter]:backdrop-blur">
      <div className="text-lg font-semibold tracking-tight text-white md:text-xl">{metric}</div>
      {logos.length > 0 && (
        <div className="flex items-center gap-5 opacity-80">
          {logos.map((src, idx) => (
            <img key={idx} src={src} className="h-6 w-auto grayscale contrast-125 opacity-70" alt="Client logo" />
          ))}
        </div>
      )}
    </div>
  );
}
