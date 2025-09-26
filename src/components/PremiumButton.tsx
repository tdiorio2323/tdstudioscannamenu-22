import { forwardRef } from 'react';
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type PremiumButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PremiumButton = forwardRef<HTMLElement, PremiumButtonProps<any>>(
  ({ as, className, children, ...props }, ref) => {
    const Component = (as ?? 'button') as ElementType;

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          'relative inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium',
          'text-white bg-white/5 shadow-card ring-1 ring-white/10 supports-[backdrop-filter]:backdrop-blur',
          'transition-transform duration-150 ease-out will-change-transform hover:-translate-y-0.5',
          'hover:bg-white/10 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 rounded-2xl border border-white/10 opacity-80" />
        <span className="absolute inset-px rounded-[calc(var(--rad)-2px)] bg-white/10 opacity-0 transition-opacity duration-150 ease-out hover:opacity-20" />
      </Component>
    );
  }
);

PremiumButton.displayName = 'PremiumButton';
