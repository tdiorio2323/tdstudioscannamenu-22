import { LuxeHero } from '@/components/LuxeHero';
import { LuxeCard } from '@/components/LuxeCard';
import { PremiumButton } from '@/components/PremiumButton';
import { ProofStrip } from '@/components/ProofStrip';
import GlassCard from '@/components/GlassCard';

export default function Social() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <LuxeHero
        tag="Social"
        title="Social Media Marketing"
        subtitle="Story-driven content, community programming, and campaigns that keep your brand in the feed."
        cta={{ label: 'Schedule a content sprint', href: '/contact' }}
        imageSrc="/images/rose.jpg"
        imageAlt="TD Studios social campaign"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <LuxeCard title="Campaign Kits">
          Launch-ready content systems built around seasonal pushes and product drops—calendars, assets, and rollout guides.
        </LuxeCard>
        <LuxeCard title="Always-on Presence">
          Editorial storytelling, community engagement, and reporting delivered monthly with brand voice alignment.
        </LuxeCard>
        <LuxeCard title="Creator Collaborations">
          Talent sourcing, briefs, legal, and asset handoff handled end-to-end for influencer and partner campaigns.
        </LuxeCard>
      </div>

      <ProofStrip metric="Content engines shipping 120+ assets per quarter across seven platforms" logos={[]} />

     <div className="grid gap-6 md:grid-cols-2">
       <LuxeCard title="Channel expertise">
         Short-form video, carousel storytelling, email handoffs, and executive thought leadership optimized per platform.
       </LuxeCard>
       <LuxeCard title="Signal reporting">
         Creative performance dashboards, KPI tracking, and next-step roadmaps to keep learning cycles fast.
       </LuxeCard>
     </div>

      <div className="grid gap-6 md:grid-cols-3">
        <LuxeCard
          title="Program blueprint"
          bullets={[
            'Audience + tone workshops',
            'Editorial calendar templates',
            'Asset production workflow',
            'Community management SOPs',
          ]}
        />
        <LuxeCard
          title="Content engines"
          bullets={[
            'Short-form video scripts',
            'Carousel + story frameworks',
            'Long-form + newsletter mix',
            'Channel-specific repurposing',
          ]}
        />
        <LuxeCard
          title="Reporting cadence"
          bullets={[
            'Weekly performance snapshots',
            'Monthly KPI deep dives',
            'Experiment backlog + insights',
            'Attribution + funnel monitoring',
          ]}
        />
      </div>

      <GlassCard className="p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-white">Campaign highlight placeholder</h3>
            <p className="text-neutral-300">
              Use this block for a social case study—include reach, engagement lift, follower growth, or sales impact
              once results are ready.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-sm text-neutral-300">
            <p className="font-semibold text-white">Suggested content</p>
            <ul className="mt-3 space-y-1.5">
              <li>• Channels activated</li>
              <li>• Campaign objective</li>
              <li>• Key creative examples</li>
              <li>• Outcome metrics + testimonial</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-center">
        <PremiumButton as="a" href="/contact" className="px-7 py-3">
          Build your social engine
        </PremiumButton>
      </div>
    </div>
  );
}
