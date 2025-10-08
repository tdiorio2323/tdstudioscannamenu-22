import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnter?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
}

export default function GlassCard({ children, className, draggable, onDragStart, onDragEnter, onDragOver, onDrop }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-surface/80 p-8 shadow-card supports-[backdrop-filter]:backdrop-blur',
        'before:absolute before:inset-px before:rounded-[calc(var(--rad)-1px)] before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100',
        'hover:-translate-y-0.5 transition-transform duration-150 ease-out',
        className
      )}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
