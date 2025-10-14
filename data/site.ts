export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    slug: 'web-experience',
    title: 'Web Experience',
    short: 'High-performance sites engineered for conversion.',
    points: ['Next.js + edge', 'CRO-minded UI', 'A/B ready'],
  },
  {
    slug: 'brand-systems',
    title: 'Brand Systems',
    short: 'Identity, design tokens, reusable components.',
    points: ['Logo + kit', 'Design system', 'Asset library'],
  },
  {
    slug: 'growth-platforms',
    title: 'Growth Platforms',
    short: 'Funnels, dashboards, and automated pipelines.',
    points: ['CRM & forms', 'Email/SMS', 'Analytics'],
  },
];

export const studies = [
  {
    title: 'E-commerce Revamp',
    metric: '+43% CVR',
    summary: 'Rebuilt PDP and checkout with CRO.',
    image: '/case-1.jpg',
    details: {
      client: 'Premium Lifestyle Brand',
      challenge:
        'Cart abandonment at 78%, slow page loads, confusing checkout flow.',
      solution:
        'Complete redesign of product pages with instant add-to-cart, one-page checkout, and performance optimization.',
      results: [
        { label: 'CVR Increase', value: '+43%' },
        { label: 'Page Load', value: '-67%' },
        { label: 'Cart Abandonment', value: '-31%' },
        { label: 'Mobile CVR', value: '+56%' },
      ],
      tech: 'Next.js 14, Shopify Hydrogen, Tailwind, Framer Motion',
    },
  },
  {
    title: 'Brand System',
    metric: '-58% design time',
    summary: 'Tokenized UI kit across properties.',
    image: '/case-2.jpg',
    details: {
      client: 'Multi-Product SaaS Company',
      challenge:
        'Inconsistent UI across 4 products, slow design-to-dev handoff, no design system.',
      solution:
        'Built comprehensive design system with Figma variables, React component library, and documentation site.',
      results: [
        { label: 'Design Time', value: '-58%' },
        { label: 'Dev Velocity', value: '+2.3x' },
        { label: 'UI Consistency', value: '94%' },
        { label: 'Component Reuse', value: '81%' },
      ],
      tech: 'Figma, React, Tailwind, Storybook, Radix UI',
    },
  },
  {
    title: 'Lead Engine',
    metric: '+3.1x pipeline',
    summary: 'New funnel + automations.',
    image: '/case-3.jpg',
    details: {
      client: 'B2B Marketing Platform',
      challenge:
        'Manual lead qualification, low conversion rates, poor lead data quality.',
      solution:
        'Built automated lead scoring system, multi-step forms with progressive disclosure, and CRM integrations.',
      results: [
        { label: 'Pipeline Growth', value: '+3.1x' },
        { label: 'Lead Quality Score', value: '+89%' },
        { label: 'Sales Time Saved', value: '12hrs/wk' },
        { label: 'Form Completion', value: '+47%' },
      ],
      tech: 'Next.js, HubSpot API, Segment, PostHog, Zod',
    },
  },
];

export const testimonials = [
  {
    quote: 'They ship fast and the results compounded.',
    author: 'A. Rivera, VP Growth',
    company: 'FinTech Startup',
  },
  {
    quote: 'Design quality and dev speed are rare together.',
    author: 'R. Patel, Founder',
    company: 'E-commerce Platform',
  },
  {
    quote:
      'Our conversion rate doubled in 6 weeks. The ROI was immediate and sustainable.',
    author: 'M. Chen, CMO',
    company: 'SaaS Company',
  },
];

export const process = [
  {
    step: 1,
    title: 'Discover',
    description:
      'Deep dive into your market, users, competitors. Define success metrics and technical constraints.',
    duration: '1 week',
  },
  {
    step: 2,
    title: 'Prototype',
    description:
      'Rapid wireframing, lo-fi prototypes, and user testing. Validate concepts before committing to build.',
    duration: '1-2 weeks',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'Ship production-ready code with design systems, performance optimization, and testing.',
    duration: '4-8 weeks',
  },
  {
    step: 4,
    title: 'Launch',
    description:
      'Deployment, monitoring, analytics setup, and knowledge transfer to your team.',
    duration: '1 week',
  },
  {
    step: 5,
    title: 'Optimize',
    description:
      'Continuous A/B testing, performance tuning, and iteration based on data.',
    duration: 'Ongoing',
  },
];

export const kpis = [
  { label: 'Avg ROI', value: '3.2x' },
  { label: 'Avg Build Time', value: '6 wks' },
  { label: 'Client NPS', value: '92' },
];

export const logos = [
  { name: 'Company A', src: '/logo-a.svg' },
  { name: 'Company B', src: '/logo-b.svg' },
  { name: 'Company C', src: '/logo-c.svg' },
  { name: 'Company D', src: '/logo-d.svg' },
];

export const siteConfig = {
  name: 'TD Studios Digital',
  title: 'TD Studios Digital | Build Flagship Digital Products & Growth Engines',
  description:
    'Web, brand, and growth platforms for ambitious teams. High-performance sites engineered for conversion.',
  url: 'https://tdstudiosdigital.com',
  ogImage: '/og.jpg',
  email: 'hello@tdstudiosdigital.com',
  phone: '+1 (555) 123-4567',
  social: {
    twitter: 'https://twitter.com/tdstudios',
    linkedin: 'https://linkedin.com/company/tdstudios',
    github: 'https://github.com/tdstudios',
  },
};

export const budgetOptions = [
  { value: 'under-25k', label: 'Under $25k' },
  { value: '25k-50k', label: '$25k - $50k' },
  { value: '50k-100k', label: '$50k - $100k' },
  { value: '100k-plus', label: '$100k+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const projectTypes = [
  { value: 'website', label: 'Website / Landing Page' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'brand', label: 'Brand & Design System' },
  { value: 'funnel', label: 'Growth / Funnel Optimization' },
  { value: 'platform', label: 'Full Platform / Product' },
  { value: 'other', label: 'Other / Not Sure' },
];
