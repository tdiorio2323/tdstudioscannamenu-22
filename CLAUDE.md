# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server (port 8081, or next available)
- `npm run build` - Production build (auto-generates shop manifest before build)
- `npm run build:dev` - Development build without optimizations
- `npm run lint` - Run ESLint with React hooks rules
- `npm run preview` - Preview production build locally
- `npm i` - Install dependencies
- `npm run gen:page` - Generate new page with automatic routing setup
- `npm run capture:all` - Generate screenshots of all pages for documentation
- `npm run capture:preview` - Generate screenshots and open preview
- `npm run deploy:hook` - Trigger Vercel deployment via webhook (requires VERCEL_DEPLOY_HOOK_URL in .env.local)

## Architecture Overview

This is a React application built with Vite, TypeScript, and shadcn/ui components, serving as both a TD Studios business website and a cannabis dispensary/menu system with dual architecture.

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

### Dual Application Architecture

**CoreLayout Routes** (TD Studios Main Site):
- `/` - TD Studios homepage with premium design showcase
- `/shop` - Customer shopping interface (cannabis products)
- `/mylar-designs` - Mylar packaging design gallery
- `/custom-designs` - Custom design services
- `/social-content` - Social media content packs
- `/digital-assets` - Digital design assets and downloads
- `/custom-mylar-form` - Custom mylar request form
- `/custom-websites` - Website development services
- `/referral` - Referral program
- `/contact` - Contact form
- `/checkout` - Shopping cart checkout flow

**Standalone Routes** (No CoreLayout):
- `/admin` - Super admin dashboard
- `/brand` - Brand/dispensary dashboard
- `/auth` - Authentication page
- `/tdstudios`, `/bagman_ny`, `/quickprintz`, etc. - Individual brand pages

**Developer Routes**:
- `/__builder` - Page builder interface
- `/__auth-builder` - Auth card builder
- `/__card-editor` - Mass card editor
- `/__components` - Component library

### Key Architecture Patterns

**CoreLayout System**:
- `src/layouts/CoreLayout.tsx` - Unified header/footer for TD Studios pages
- Sticky header with centered TD STUDIOS logo (clickable to home)
- Desktop: Logo above navigation, MYLAR dropdown menu
- Mobile: Logo + hamburger menu with collapsible navigation
- Footer with company info and quick links

**Navigation Structure**:
- Main menu: HOME, SHOP, WEBSITES, REFERRAL, CONTACT
- No dropdown menus - simplified flat navigation
- Shopping cart button with quantity indicator
- Mobile: Hamburger menu with collapsible navigation and cart access

**Role-Based Access**:
- `admin` role → `/admin` dashboard
- `brand` role → `/brand` dashboard
- Default/customer → TD Studios pages with shopping

**Key Components**:
- `CustomerApp` - Shopping interface (now without header, uses CoreLayout)
- `SuperAdminDashboard` - Admin management
- `BrandDashboard` - Brand/dispensary management
- `CheckoutFlow` - Purchase process
- `AuthPage` - Authentication handling

**Database Integration**:
- Supabase authentication and data (Project ID: `crpalakzdzvtgvljlutd`)
- 17+ migrations in `supabase/migrations/`
- User roles in `user_roles` table (admin, brand, customer)
- TypeScript types generated in `supabase/types.ts`
- TanStack Query for server state management

**Styling System**:
- shadcn/ui with Radix UI primitives
- Tailwind CSS with custom configuration
- Glassmorphism effects throughout (bg-white/5, backdrop-blur-md)
- Theme support via next-themes
- Path alias `@/` points to `src/`

### Design Philosophy

**TD Studios Brand**:
- Luxury/premium aesthetic with glassmorphism
- Cannabis industry focus with mylar packaging specialization
- Professional service offerings (websites, design, social content)
- Consistent header/navigation across all main pages

**Development Patterns**:
- Route-based architecture with clear separation of concerns
- CoreLayout for unified TD Studios experience
- Standalone routes for admin/brand functionality
- Responsive design with mobile-first approach
- Component reusability with shadcn/ui system

## Shop System Architecture

**Data Priority Flow**:
1. `public/_shop-layout.json` - Published layout (order/text override)
2. `public/_shop-manifest.json` - Build-time generated from `td slide` and `shoppagepics` folders
3. Dev middleware `/__list-public` - Live folder listing in development
4. Hardcoded fallback products

**Shop Editing Workflow**:
- Edit Mode: drag to reorder, inline edit titles/descriptions, select/delete items
- Save Layout: stores in browser localStorage only
- Export JSON: downloads shop-layout.json for publishing
- Publish: place exported file at `public/_shop-layout.json`, commit, deploy

**Cart System**:
- Global cart state via `useCart` hook with localStorage persistence
- Cart preview slide-out with quantity controls and item management
- Integrated into CoreLayout header with count indicator

## Development Scripts & Automation

**Page Generation**:
- `npm run gen:page` - Interactive script creates new page component and auto-adds routing to App.tsx
- Vite dev middleware `/__scaffold` - Development-only page creation endpoint

**Asset Management**:
- `scripts/generate-shop-manifest.mjs` - Scans `public/td slide` and `public/shoppagepics` for images, excludes specific files, outputs `_shop-manifest.json`
- Automatic execution during `npm run build`
- OCR scripts for batch image processing

**Documentation**:
- `npm run capture:all` - Playwright screenshots of all pages
- Auto-generated screenshot gallery at `screenshots/index.html`

**Deployment**:
- Vercel auto-deploy on main branch push
- Manual deploy via `npm run deploy:hook` (reads `VERCEL_DEPLOY_HOOK_URL` from `.env.local`)

## Project Context

This serves as both:
1. **TD Studios Business Website** - Professional design services for cannabis brands
2. **Cannabis Dispensary System** - Multi-tenant ordering and management platform

The dual nature requires careful routing: main business pages use CoreLayout for consistency, while admin/brand functionality remains separate for specialized workflows.

## Key File Locations

- `src/App.tsx` - Main routing configuration with CoreLayout vs standalone route separation
- `src/layouts/CoreLayout.tsx` - Unified TD Studios layout with header/footer
- `src/pages/Shop.tsx` - Shopping interface with edit mode and layout publishing
- `src/hooks/useCart.tsx` - Global cart state management
- `supabase/` - Database configuration and migrations
- `scripts/` - Automation tools for page generation, asset processing, deployment
- `public/td slide/` and `public/shoppagepics/` - Product image directories