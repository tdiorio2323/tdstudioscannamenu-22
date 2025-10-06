import React from 'react';
import { NavLink } from 'react-router-dom';
import { AutoSliderBanner } from '@/components/AutoSliderBanner';
import { SplashScreen } from '@/components/SplashScreen';
import GlassCard from '@/components/GlassCard';
import CardFlip from '@/components/CardFlip';
import { LiquidGlassCard } from '@/components/SimpleLiquidGlassCard';
import { Globe2, Layers3, Share2, PenTool, Images, Handshake } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Home-only entrance splash */}
      <SplashScreen />

      {/* Fullscreen entrance banner */}
      <section className="px-0 pt-0 -mt-8">
        <AutoSliderBanner />
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Premium design solutions tailored for high-growth brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="h-6 w-6 text-white" />,
                title: 'Web Experience',
                description: 'Marketing sites, landers, and product stories engineered for clarity and conversion.',
                cta: 'Explore Web →',
                to: '/web',
              },
              {
                icon: <Layers3 className="h-6 w-6 text-white" />,
                title: 'Product & Platform',
                description: 'Application architecture, dashboards, and feature delivery for scale.',
                cta: 'View Dev →',
                to: '/dev',
              },
              {
                icon: <Share2 className="h-6 w-6 text-white" />,
                title: 'Social Programs',
                description: 'Editorial programming, campaign kits, and community ops that sustain growth.',
                cta: 'See Social →',
                to: '/social',
              },
              {
                icon: <PenTool className="h-6 w-6 text-white" />,
                title: 'Brand & Identity',
                description: 'Design systems, visual identity, and asset libraries crafted to travel everywhere.',
                cta: 'Custom Design →',
                to: '/custom-designs',
              },
              {
                icon: <Images className="h-6 w-6 text-white" />,
                title: 'Digital Assets',
                description: 'Ready-to-use content packs, templates, and downloads to accelerate launches.',
                cta: 'Browse Assets →',
                to: '/digital-assets',
              },
              {
                icon: <Handshake className="h-6 w-6 text-white" />,
                title: 'Partnerships',
                description: 'Referral alliances and white-label collaborations for agencies and founders.',
                cta: 'Partnerships →',
                to: '/referral',
              },
            ].map(({ icon, title, description, cta, to }) => (
              <GlassCard key={title} className="p-8 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-card/50">
                  {icon}
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">
                  {description}
                </p>
                <NavLink
                  to={to}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {cta}
                </NavLink>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          {/* Rotating feature cards */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Capabilities</h3>
              <p className="text-white/60 mt-2">A quick peek at what we build</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <CardFlip
                title="Design Systems"
                subtitle="Consistent, scalable UI"
                description="We craft reusable UI libraries and robust design tokens."
                features={["Tokens", "Components", "Docs", "Themeable"]}
                coverImage="/images/TD HOT TUB.png"
                coverAlt="Design systems"
              />
              <CardFlip
                title="E‑commerce"
                subtitle="Convert with speed"
                description="Fast product pages, optimized checkouts, and analytics built-in."
                features={["Shop", "Cart", "Checkout", "Analytics"]}
                coverImage="/images/TD 3D CHROME.png"
                coverAlt="E-commerce"
              />
              <CardFlip
                title="Brand Kits"
                subtitle="Your identity everywhere"
                description="Logos, palettes, typography, and social templates that align."
                features={["Logo", "Palette", "Type", "Templates"]}
                coverImage="/images/TD STUDIOS COLOMBIA.png"
                coverAlt="Brand kits"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <LiquidGlassCard className="p-12 border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Elevate Your Brand?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Let's create something extraordinary together. Contact us to discuss your premium design needs.
              </p>
            </LiquidGlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
