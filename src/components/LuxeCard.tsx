import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LuxeCardProps {
  title: string;
  children?: ReactNode;
  className?: string;
  icons?: { icon: ReactNode; label: string }[];
  bullets?: string[];
}

export function LuxeCard({ title, children, className, icons, bullets }: LuxeCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl p-5',
        'bg-surface/70 supports-[backdrop-filter]:backdrop-blur border border-white/10 shadow-card',
        'before:absolute before:inset-px before:rounded-[calc(var(--rad)-1px)] before:bg-gradient-to-b before:from-white/6 before:to-transparent before:opacity-0 before:transition-opacity group-hover:before:opacity-100',
        'transition-transform duration-150 ease-out hover:-translate-y-0.5',
        className
      )}
    >
      <h3 className="text-white/90 text-[17px] font-semibold tracking-tight">{title}</h3>
      {children && (
        <div className="mt-3 text-[15px] leading-relaxed text-neutral-300">
          {children}
        </div>
      )}
      {icons && icons.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {icons.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-[11px] uppercase tracking-[0.12em] text-neutral-300"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white">
                {icon}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-5 grid grid-cols-1 gap-2 text-[15px] text-neutral-300">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
