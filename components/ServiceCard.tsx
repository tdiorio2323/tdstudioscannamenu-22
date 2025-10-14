'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  short: string;
  points: string[];
  href?: string;
}

export function ServiceCard({ title, short, points, href }: ServiceCardProps) {
  const CardWrapper = href ? motion.a : motion.div;
  const cardProps = href ? { href } : {};

  return (
    <CardWrapper
      {...cardProps}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-lg p-6 h-full cursor-pointer group"
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-white/70">{short}</p>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-white/60">
              <Check size={16} className="text-secondary flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
}
