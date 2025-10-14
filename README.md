# TD Studios Digital - Production-Ready Next.js 14 Lead Gen Site

## Setup Instructions

### 1. Install Dependencies

```bash
cd td-studios-digital
npm install
```

### 2. Missing Dependencies (add these to package.json if needed)

```bash
npm install tailwindcss-animate
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
td-studios-digital/
├── app/
│   ├── (site)/
│   │   └── page.tsx          # Main landing page
│   ├── api/
│   │   └── lead/
│   │       └── route.ts       # Lead form API endpoint
│   ├── globals.css            # Tailwind + brand tokens
│   ├── layout.tsx             # Root layout
│   └── metadata.ts            # SEO configuration
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── badge.tsx
│   ├── NavBar.tsx             # Sticky navigation
│   ├── Hero.tsx               # Hero section with video/poster
│   ├── Services.tsx           # 3-pillar services grid
│   ├── ServiceCard.tsx        # Individual service card
│   ├── CaseStudies.tsx        # Case study grid
│   ├── CaseStudyCard.tsx      # Individual case study
│   ├── Process.tsx            # 5-step timeline
│   ├── Testimonials.tsx       # Quote carousel
│   ├── CTA.tsx                # Dual CTA buttons
│   ├── LeadForm.tsx           # Main contact form
│   ├── Footer.tsx             # Footer
│   ├── StickyBar.tsx          # Bottom sticky CTA
│   └── ExitIntent.tsx         # Exit-intent modal
├── lib/
│   ├── utils.ts               # cn(), scrollToSection()
│   ├── schemas.ts             # Zod validation schemas
│   ├── seo.ts                 # SEO utilities
│   └── analytics.ts           # Event tracking stubs
├── data/
│   └── site.ts                # All content & config
├── public/
│   ├── logo.svg
│   ├── poster.jpg
│   ├── case-1.jpg
│   ├── case-2.jpg
│   ├── case-3.jpg
│   └── og.jpg
├── middleware.ts              # Security headers
├── next-sitemap.config.js     # Sitemap generation
└── .husky/
    └── pre-commit             # Lint + typecheck hook
```

## Key Features

### Conversion Optimization
- Sticky bottom bar with CTA
- Exit-intent modal for lead capture
- Smooth anchor scrolling with reduced-motion support
- KPI mini-bar in hero section

### SEO & Performance
- Server Components by default
- Optimized images (AVIF/WebP)
- JSON-LD structured data
- next-sitemap integration
- Security headers in middleware

### Brand Tokens (Tailwind)
- Base: `#050816`
- Accent: `#8AB4FF`
- Secondary: `#B3F5C9`
- Border radius: 16px, 28px
- Utility classes: `.glass-card`, `.gradient-overlay`, `.glow-accent`

### Content Architecture
All content lives in `data/site.ts`:
- Navigation links
- Services (3 pillars)
- Case studies (3 with detailed results)
- Testimonials (3)
- Process steps (5)
- KPIs, form options, site config

## Remaining Tasks

### UI Components to Create
The following shadcn/ui components still need to be created in `components/ui/`:

1. **dialog.tsx** - Modal dialogs for case studies and exit-intent
2. **input.tsx** - Form inputs
3. **textarea.tsx** - Multi-line text areas
4. **badge.tsx** - Small pills/tags
5. **label.tsx** - Form labels

### Page Components to Create
Create these in `components/`:

1. **NavBar.tsx** - Sticky nav with blur effect
2. **Hero.tsx** - Hero with video/poster, KPI bar, CTA buttons
3. **Services.tsx** - Grid of 3 service cards
4. **ServiceCard.tsx** - Individual service card with hover effects
5. **CaseStudies.tsx** - Case study grid with dialog
6. **CaseStudyCard.tsx** - Card with before/after slider
7. **Process.tsx** - 5-step timeline
8. **Testimonials.tsx** - Quote carousel
9. **CTA.tsx** - Dual CTA section
10. **LeadForm.tsx** - Contact form with validation
11. **Footer.tsx** - Minimal footer
12. **StickyBar.tsx** - Bottom CTA bar
13. **ExitIntent.tsx** - Exit-intent modal

### App Router Files

1. **app/layout.tsx** - Root layout with fonts, JSON-LD
2. **app/(site)/page.tsx** - Main landing page assembling all sections
3. **app/api/lead/route.ts** - POST endpoint for form submissions
4. **app/services/[slug]/page.tsx** - Individual service pages

### Configuration Files

1. **middleware.ts** - Security headers
2. **next-sitemap.config.js** - Sitemap config
3. **.husky/pre-commit** - Git hooks

### Placeholder Assets

Add to `public/`:
- `logo.svg` - Company logo
- `poster.jpg` - Hero background
- `case-1.jpg`, `case-2.jpg`, `case-3.jpg` - Case study images
- `og.jpg` - Open Graph image (1200x630)
- `logo-a.svg` through `logo-d.svg` - Client logos

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler
npm run postbuild    # Generate sitemap (runs after build)
```

## Deployment

### Vercel (Recommended)

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables

None required for static site. Add these for analytics:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: <1.2s
- Time to Interactive: <2.5s
- Cumulative Layout Shift: <0.1

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 10+

## License

Proprietary - TD Studios Digital

## Next Steps

1. Complete the remaining UI components (dialog, input, textarea, badge, label)
2. Build all page components listed above
3. Create the app router files
4. Add placeholder images to `public/`
5. Set up Husky pre-commit hooks
6. Test all forms and interactions
7. Run Lighthouse audits
8. Deploy to Vercel

## Tips

- Use `cn()` from `lib/utils.ts` for className merging
- Use `scrollToSection()` for smooth anchor scrolling
- All content is in `data/site.ts` - edit there, not in components
- Framer Motion is installed - add animations with `motion` components
- Forms use Zod schemas from `lib/schemas.ts`
