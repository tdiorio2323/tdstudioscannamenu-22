'use client';

import { ServiceCard } from './ServiceCard';
import { services } from '@/data/site';
import { motion } from 'framer-motion';

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What We Build
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Three core pillars for ambitious digital teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                short={service.short}
                points={service.points}
                href={`/services/${service.slug}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
