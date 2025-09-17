import { LuxeHero } from '@/components/LuxeHero';
import { LuxeCard } from '@/components/LuxeCard';
import { PremiumButton } from '@/components/PremiumButton';
import { ProofStrip } from '@/components/ProofStrip';
import GlassCard from '@/components/GlassCard';
import { Code2, CircuitBoard, Cpu, Database, Cloud, Server, Boxes, Rocket, ShieldCheck } from 'lucide-react';

export default function Dev() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <LuxeHero
        tag="Development"
        title="Application & Platform Engineering"
        subtitle="Strategy, engineering, and design collaborating to deliver performant digital products."
        cta={{ label: 'Book a build sprint', href: '/contact' }}
        imageSrc="/images/para.webp"
        imageAlt="TD Studios development"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <LuxeCard title="Product Discovery">
          Rapid architecture mapping, user flows, and proof-of-concept builds to de-risk your roadmap and align teams quickly.
        </LuxeCard>
        <LuxeCard title="Full-stack Delivery">
          TypeScript-first stacks, API design, data modeling, automated QA, and CI/CD across web and mobile surfaces.
        </LuxeCard>
        <LuxeCard title="Growth & Iteration">
          Analytics instrumentation, experiment support, and performance tuning to sustain shipping velocity post-launch.
        </LuxeCard>
      </div>

      <ProofStrip metric="Preferred engineering partner for premium consumer and B2B launches" logos={[]} />

      <div className="grid gap-6 md:grid-cols-2">
        <LuxeCard
          title="Modern stack expertise"
          icons={[
            { icon: <Code2 className="h-5 w-5" />, label: 'React' },
            { icon: <CircuitBoard className="h-5 w-5" />, label: 'Next.js' },
            { icon: <Cpu className="h-5 w-5" />, label: 'Vite' },
            { icon: <Boxes className="h-5 w-5" />, label: 'Expo' },
            { icon: <Cloud className="h-5 w-5" />, label: 'Supabase' },
            { icon: <Database className="h-5 w-5" />, label: 'Postgres' },
            { icon: <Server className="h-5 w-5" />, label: 'Edge' },
            { icon: <Rocket className="h-5 w-5" />, label: 'Perf' },
            { icon: <ShieldCheck className="h-5 w-5" />, label: 'Reliability' },
          ]}
        >
          React, Next.js, Vite, Expo, Supabase, PostgreSQL, serverless edge, plus observability and error budgets by default.
        </LuxeCard>
        <LuxeCard
          title="Team enablement"
          bullets={[
            'Documentation & onboarding playbooks',
            'Internal tooling and automation support',
            'Knowledge transfer workshops',
            'Retained engineering advisory',
            'QA and release playbooks',
            'Design-to-dev bridges',
            'Analytics & observability rollouts',
            'Experiment & growth ops support',
            'Change management coaching',
          ]}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <LuxeCard
          title="Delivery rhythm"
          bullets={[
            'Sprint planning + backlog grooming',
            'Design + engineering pairing sessions',
            'Weekly stakeholder reviews',
            'Retro + measurement cadence',
          ]}
        />
        <LuxeCard
          title="Quality & security"
          bullets={[
            'Automated QA suites + manual test plans',
            'Accessibility + performance budgets',
            'Security reviews + dependency scans',
            'Launch runbooks with rollback paths',
          ]}
        />
        <LuxeCard
          title="Documentation bundle"
          bullets={[
            'Architecture diagrams',
            'API + schema references',
            'Component usage guides',
            'Onboarding + support contact tree',
          ]}
        />
      </div>

      <GlassCard className="p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-white">Engineering case study placeholder</h3>
            <p className="text-neutral-300">
              Swap in client logos, throughput metrics, or screenshots. Highlight latency improvements, revenue impact,
              or feature velocity gains from a recent engagement.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-sm text-neutral-300">
            <p className="font-semibold text-white">Suggested content</p>
            <ul className="mt-3 space-y-1.5">
              <li>• Baseline vs. post-launch metrics</li>
              <li>• Tech stack overview</li>
              <li>• Team composition & timeline</li>
              <li>• Key lessons learned</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-center">
        <PremiumButton as="a" href="/contact" className="px-7 py-3">
          Plan your release
        </PremiumButton>
      </div>
    </div>
  );
}
