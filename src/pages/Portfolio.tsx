import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass';

const Portfolio: React.FC = () => {
  const placeholders = Array.from({ length: 16 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="/images/para.webp"
            alt="Portfolio showcase background"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Selected Work</h2>
            <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
              A curated snapshot of brand, product, and campaign executions crafted for clients worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.35em] text-white/50">
              <span>BRAND SYSTEMS</span>
              <span>DIGITAL PRODUCTS</span>
              <span>CAMPAIGN CONTENT</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placeholders.map((slot) => (
              <LiquidGlassCard
                key={slot}
                hover="glow"
                variant="primary"
                className="aspect-[4/5] border border-white/10 flex items-center justify-center text-white/30 text-sm uppercase tracking-[0.4em]"
              >
                <span>PROJECT {slot}</span>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
