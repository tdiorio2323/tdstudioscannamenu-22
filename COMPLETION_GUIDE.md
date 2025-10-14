# TD Studios Digital - Completion Guide

## Current Status

✅ **Completed:**
- Project structure created
- package.json with all dependencies
- TypeScript, Tailwind, PostCSS, ESLint, Prettier configs
- Global styles with brand tokens
- Data layer (`data/site.ts`) with all content
- Utility libraries (utils.ts, schemas.ts, seo.ts, analytics.ts)
- All shadcn/ui components (Button, Card, Dialog, Input, Textarea, Badge, Label)
- NavBar, Hero, ServiceCard, Services components

⏳ **Remaining:**
- Install dependencies
- Complete page components (CaseStudies, Process, Testimonials, CTA, LeadForm, Footer)
- Conversion features (StickyBar, ExitIntent)
- App router files
- API route for lead form
- Configuration files (middleware, sitemap)

## Step 1: Install Dependencies

```bash
cd td-studios-digital
npm install
```

## Step 2: Create Remaining Components

### CaseStudyCard.tsx

```tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CaseStudyCardProps {
  title: string;
  metric: string;
  summary: string;
  image: string;
  onClick: () => void;
}

export function CaseStudyCard({ title, metric, summary, image, onClick }: CaseStudyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="glass-card rounded-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="text-lg font-bold">
            {metric}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-white/70">{summary}</p>
      </div>
    </motion.div>
  );
}
```

### CaseStudies.tsx

```tsx
'use client';

import { useState } from 'react';
import { CaseStudyCard } from './CaseStudyCard';
import { studies } from '@/data/site';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<typeof studies[0] | null>(null);

  return (
    <>
      <section id="work" className="py-24 px-4 sm:px-6 bg-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Results That Matter
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Recent wins from teams we've partnered with
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CaseStudyCard
                  {...study}
                  onClick={() => setSelectedStudy(study)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedStudy && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <DialogTitle className="text-3xl">{selectedStudy.title}</DialogTitle>
                  <Badge variant="secondary" className="text-lg">
                    {selectedStudy.metric}
                  </Badge>
                </div>
                <DialogDescription className="text-base">
                  {selectedStudy.details?.client}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Challenge</h4>
                  <p className="text-muted-foreground">{selectedStudy.details?.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Solution</h4>
                  <p className="text-muted-foreground">{selectedStudy.details?.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedStudy.details?.results.map((result, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{result.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Tech Stack</h4>
                  <p className="text-muted-foreground text-sm">{selectedStudy.details?.tech}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Process.tsx

```tsx
'use client';

import { process } from '@/data/site';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function Process() {
  return (
    <section id="process" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How We Work
          </h2>
          <p className="text-xl text-white/70">
            A proven 5-step process from discovery to optimization
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="md:w-5/12 ml-20 md:ml-0">
                    <div className="glass-card p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Check size={18} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/70 mb-2">{step.description}</p>
                      <div className="text-sm text-primary font-medium">{step.duration}</div>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold z-10">
                    {step.step}
                  </div>

                  {/* Spacer */}
                  <div className="md:w-5/12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Testimonials.tsx

```tsx
'use client';

import { testimonials, logos } from '@/data/site';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-white/5">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Teams Say
          </h2>
          <p className="text-xl text-white/70">
            Feedback from founders and leaders we've worked with
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative mb-12">
          <div className="glass-card p-8 md:p-12 rounded-lg min-h-[200px] flex items-center">
            <div className="w-full">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <blockquote className="text-2xl md:text-3xl text-white mb-6">
                  "{testimonials[current].quote}"
                </blockquote>
                <cite className="text-white/70 not-italic">
                  {testimonials[current].author}
                  {testimonials[current].company && (
                    <span className="text-white/50"> • {testimonials[current].company}</span>
                  )}
                </cite>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" onClick={prev}>
              <ChevronLeft />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === current ? 'bg-primary w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={next}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        {/* Logos Row (optional - add if you have actual logos) */}
        {/* <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
          {logos.map(logo => (
            <div key={logo.name} className="w-24 h-12 relative">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
```

### CTA.tsx

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-lg text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Ship Faster?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Let's talk about your product, your goals, and how we can help you get there.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="glow-accent"
              onClick={() => scrollToSection('#contact')}
            >
              Get a Proposal
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#contact')}
            >
              <FileText className="mr-2" />
              Start Free Audit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### LeadForm.tsx

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { leadFormSchema, type LeadFormData } from '@/lib/schemas';
import { budgetOptions, projectTypes, siteConfig } from '@/data/site';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function LeadForm() {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    projectTypes: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validated = leadFormSchema.parse(formData);

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!response.ok) throw new Error('Submission failed');

      trackEvent('lead_form_submitted', validated);
      toast.success('Thanks! We'll be in touch soon.');
      setFormData({ projectTypes: [] });
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProjectType = (value: string) => {
    const current = formData.projectTypes || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFormData({ ...formData, projectTypes: updated });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-white/5">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Talk
          </h2>
          <p className="text-xl text-white/70">
            Tell us about your project and we'll respond within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-lg">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="mt-2"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company || ''}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              className="mt-2"
            />
            {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
          </div>

          <div>
            <Label htmlFor="budget">Budget Range *</Label>
            <select
              id="budget"
              value={formData.budget || ''}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
              className="mt-2 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select budget range</option>
              {budgetOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.budget && <p className="text-sm text-destructive mt-1">{errors.budget}</p>}
          </div>

          <div>
            <Label>Project Type * (select all that apply)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <Badge
                  key={type.value}
                  variant={formData.projectTypes?.includes(type.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleProjectType(type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
            {errors.projectTypes && (
              <p className="text-sm text-destructive mt-1">{errors.projectTypes}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Project Details *</Label>
            <Textarea
              id="message"
              value={formData.message || ''}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="mt-2"
              placeholder="Tell us about your goals, timeline, and any specific requirements..."
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          <p className="text-sm text-white/50 text-center">
            Or email us directly at{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
```

### Footer.tsx

```tsx
import { siteConfig } from '@/data/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href={siteConfig.social.twitter} className="text-white/60 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href={siteConfig.social.linkedin} className="text-white/60 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href={siteConfig.social.github} className="text-white/60 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Step 3: Create Conversion Features

### StickyBar.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 30% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 30 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-semibold">Ready to accelerate your growth?</p>
                <p className="text-sm opacity-90">Book a free strategy call →</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => scrollToSection('#contact')}
                  className="font-semibold"
                >
                  Book Strategy Call
                </Button>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### ExitIntent.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auditFormSchema } from '@/lib/schemas';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

export function ExitIntent() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = auditFormSchema.parse({ email, website });

      // In production, send to your API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validated, type: 'audit' }),
      });

      trackEvent('exit_intent_audit_requested', validated);
      toast.success('We'll send your audit within 48 hours!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Please enter a valid email address');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Wait! Get a Free Audit</DialogTitle>
          <DialogDescription>
            Before you go, let us send you a complimentary brand & site audit (PDF)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label htmlFor="exit-email">Email *</Label>
            <Input
              id="exit-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="exit-website">Website (optional)</Label>
            <Input
              id="exit-website"
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://yoursite.com"
              className="mt-2"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send My Free Audit'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No spam. We'll send you a detailed PDF audit within 48 hours.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## Step 4: Create App Routes

### app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { generateMetadata } from '@/lib/seo';
import { jsonLd } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateMetadata({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

### app/(site)/page.tsx

```tsx
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { CaseStudies } from '@/components/CaseStudies';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { LeadForm } from '@/components/LeadForm';
import { Footer } from '@/components/Footer';
import { StickyBar } from '@/components/StickyBar';
import { ExitIntent } from '@/components/ExitIntent';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Process />
        <Testimonials />
        <CTA />
        <LeadForm />
      </main>
      <Footer />
      <StickyBar />
      <ExitIntent />
    </>
  );
}
```

### app/api/lead/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = leadFormSchema.parse(body);

    // In production, send to your CRM/email service
    console.log('Lead submission:', validated);

    // Example integrations:
    // - HubSpot API
    // - Mailchimp
    // - SendGrid
    // - Resend
    // - Slack webhook

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Lead form error:', error);
    return NextResponse.json(
      { error: 'Invalid form data' },
      { status: 400 }
    );
  }
}
```

### app/services/[slug]/page.tsx

```tsx
import { notFound } from 'next/navigation';
import { services } from '@/data/site';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-12 px-4 sm:px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-6">{service.title}</h1>
          <p className="text-2xl text-white/70 mb-8">{service.short}</p>

          <div className="glass-card p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-2">
              {service.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/#contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

## Step 5: Configuration Files

### middleware.ts

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers already set in next.config.js
  // Add any additional middleware logic here

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
```

### next-sitemap.config.js

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tdstudiosdigital.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
```

### .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run typecheck
```

To set up Husky:

```bash
npm install --save-dev husky
npx husky init
```

## Step 6: Add Placeholder Images

Create these placeholder files in `public/`:

1. `logo.svg` - Company logo
2. `poster.jpg` - Hero background (1920x1080 recommended)
3. `case-1.jpg`, `case-2.jpg`, `case-3.jpg` - Case study images (800x600)
4. `og.jpg` - Open Graph image (1200x630)

Use placeholder services like:
- https://placehold.co/1920x1080
- https://picsum.photos/800/600

## Step 7: Test & Deploy

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Test production build
npm start

# Deploy to Vercel
vercel
```

## Troubleshooting

If you encounter errors:

1. **Module not found**: Run `npm install`
2. **Type errors**: Check imports match exported names
3. **Build errors**: Run `npm run typecheck` to see TypeScript issues
4. **Image errors**: Use placeholder URLs or comment out Image components temporarily

## Next Steps

1. Replace placeholder images with real assets
2. Connect lead form to your CRM/email service
3. Add analytics (PostHog, GA4, etc.)
4. Configure custom domain in Vercel
5. Set up monitoring (Sentry, LogRocket, etc.)
6. Run Lighthouse audits and optimize
7. Add more case studies and testimonials

Your TD Studios Digital site is ready to generate leads!
