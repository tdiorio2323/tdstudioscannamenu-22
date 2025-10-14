'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { kpis } from '@/data/site';
import { scrollToSection } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video/Poster */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/poster.jpg)' }}
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance">
            Build Flagship Digital Products & Growth Engines
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Web, brand, and growth platforms for ambitious teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="glow-accent"
              onClick={() => scrollToSection('#contact')}
            >
              Start Audit
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#work')}
            >
              See Results
            </Button>
          </div>

          {/* KPI Mini-bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-12"
          >
            <div className="glass-card rounded-lg p-6 inline-block">
              <div className="grid grid-cols-3 gap-8">
                {kpis.map((kpi, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {kpi.value}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
