import { LuxeHero } from '@/components/LuxeHero';
import { LuxeCard } from '@/components/LuxeCard';
import { PremiumButton } from '@/components/PremiumButton';
import { ProofStrip } from '@/components/ProofStrip';
import GlassCard from '@/components/GlassCard';

export default function Web() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden h-[70vh] md:h-[85vh] rounded-2xl mx-6 mt-6">
        <div className="absolute inset-0">
          <img
            src="/images/TD HOT TUB.png"
            alt="TD Studios web showcase"
            className="h-full w-full object-cover rounded-2xl brightness-105 contrast-110 saturate-110 transform-gpu will-change-transform hero-image"
            loading="lazy"
          />
          {/* Subtle overlay for enhanced depth and clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 rounded-2xl pointer-events-none"></div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex max-w-min rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-300 mb-6">
              Web
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Web Experiences That Convert</h1>
            <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
              Strategy, performance, and story-first content engineered for clarity and velocity.
            </p>
            <div className="mt-8">
              <PremiumButton as="a" href="/contact" className="px-7 py-3">
                Start your project
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-12 space-y-12">

        <div className="grid gap-6 md:grid-cols-3">
          <LuxeCard title="Conversion-Ready Landers">
            Story-driven sections, SEO-focused architecture, and instrumented funnels built for measurable wins.
          </LuxeCard>
          <LuxeCard title="Scalable Marketing Sites">
            Modular content models, CMS-ready components, and asset optimization that keeps teams shipping fast.
          </LuxeCard>
          <LuxeCard title="Product Ecosystems">
            Unified brand, docs, and support surfaces powered by design systems and enterprise-grade hosting.
          </LuxeCard>
        </div>

        <ProofStrip metric="Trusted by teams launching high-impact digital products" logos={[]} />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <LuxeCard title="Everything tied to outcomes">
            We lead discovery, prototype reviews, and performance calibration alongside your marketing and product leads. Expect dependable handoff, documentation, and a roadmap for optimization.
          </LuxeCard>
          <LuxeCard title="Stack & operations">
            React, Next.js, Vite, Sanity, Contentful, Supabase, and bespoke integrations paired with analytics, QA, and experiment support.
          </LuxeCard>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <LuxeCard
            title="Discovery checkpoints"
            bullets={[
              'Kickoff audit + technical mapping',
              'Message architecture + content inventory',
              'Wireframes with rapid prototype review',
              'Analytics + measurement plan setup',
            ]}
          />
          <LuxeCard
            title="Launch playbook"
            bullets={[
              'Component library + design tokens',
              'CMS schema and publishing workflows',
              'Performance + accessibility tuning',
              'QA scripts and go-live checklist',
            ]}
          />
          <LuxeCard
            title="Post-launch support"
            bullets={[
              'Growth experiments + reporting cadence',
              'Knowledge transfer sessions',
              'Backlog grooming + roadmap templates',
              'Optional retained iteration support',
            ]}
          />
        </div>

        <GlassCard className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-white">Featured case study placeholder</h3>
              <p className="text-neutral-300">
                Drop in results, screenshots, and narrative once your next flagship web engagement is ready to share. Use this block for ROI numbers, testimonial quotes, or before/after visuals.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-sm text-neutral-300">
              <p className="font-semibold text-white">Suggested content</p>
              <ul className="mt-3 space-y-1.5">
                <li>• Client / industry snapshot</li>
                <li>• Problem vs. solution summary</li>
                <li>• Quantitative outcomes</li>
                <li>• Services + deliverables list</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-center">
          <PremiumButton as="a" href="/contact" className="px-7 py-3">
            Start your project
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}
