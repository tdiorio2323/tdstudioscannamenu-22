import React from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlass';

const Portfolio: React.FC = () => {
  const placeholders = Array.from({ length: 16 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/TD HOT TUB.png"
            alt="Portfolio showcase background"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/85 to-black" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">Selected Work</h1>
          <p className="mt-6 text-xl text-white/70">
            A curated snapshot of brand, product, and campaign executions crafted for clients worldwide.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.35em] text-white/50">
            <span>BRAND SYSTEMS</span>
            <span>DIGITAL PRODUCTS</span>
            <span>CAMPAIGN CONTENT</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Case Studies Coming Soon</h2>
            <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
              Explore a preview of the formats we deliver. Detailed write-ups, metrics, and behind-the-scenes process notes will publish shortly.
            </p>
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
