import { PremiumButton } from '@/components/PremiumButton';

interface LuxeHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  cta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
}

export function LuxeHero({ title, subtitle, tag, cta, imageSrc, imageAlt }: LuxeHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 shadow-card">
      <div className="relative h-[360px] w-full md:h-[460px]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? ''}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 bg-[image:var(--grad-dark)]" />
        )}
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="pointer-events-none w-full p-8 md:p-12">
          {tag && (
            <div className="inline-flex max-w-min rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-300">
              {tag}
            </div>
          )}
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur pointer-events-auto">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white leading-[0.95] md:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-300 text-base md:text-lg">
              {subtitle}
            </p>
            {cta && (
              <div className="mt-6">
                <PremiumButton as="a" href={cta.href} className="px-7 py-3">
                  {cta.label}
                </PremiumButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
