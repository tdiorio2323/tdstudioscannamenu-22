import { PremiumButton } from '@/components/PremiumButton';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface/70 px-6 py-8 supports-[backdrop-filter]:backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">TD Studios</span>
            <h2 className="text-3xl font-semibold tracking-tight text-white leading-[0.95] md:text-4xl">
              Let’s build the next flagship experience.
            </h2>
            <p className="max-w-xl text-[15px] text-neutral-300 md:text-[16px]">
              Strategy, design, development, and social programs for ambitious brands headquartered in New York City, serving teams worldwide.
            </p>
          </div>
          <PremiumButton as="a" href="/contact" className="px-7 py-3">Start your project</PremiumButton>
        </div>

        <div className="text-center text-sm text-white">
          © 2025 TD Studios. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
