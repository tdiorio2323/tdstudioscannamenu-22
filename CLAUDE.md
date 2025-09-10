# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm i` - Install dependencies

## Architecture Overview

This is a React application built with Vite, TypeScript, and shadcn/ui components, featuring role-based authentication and a cannabis dispensary/menu system.

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

### Application Structure

**Route-Based Architecture**:
- `/` - Auth page (login/signup) 
- `/shop` - Customer shopping interface
- `/checkout` - Checkout flow
- `/admin` - Super admin dashboard
- `/brand` - Brand/dispensary dashboard

**Role-Based Access**:
The app uses Supabase authentication with role-based routing:
- `admin` role → `/admin` dashboard
- `brand` role → `/brand` dashboard  
- Default/customer → `/shop` interface

**Key Components**:
- `CustomerApp` - Main shopping interface for customers
- `SuperAdminDashboard` - Admin management interface
- `BrandDashboard` - Brand/dispensary management
- `CheckoutFlow` - Purchase process
- `AuthPage` - Authentication handling

**Database Integration**:
- Uses Supabase for authentication and data
- Has migrations in `supabase/migrations/`
- User roles stored in `user_roles` table
- Project ID: `crpalakzdzvtgvljlutd`

**Styling System**:
- All components use shadcn/ui with Radix UI primitives
- Tailwind CSS for styling with custom configuration
- Theme support via next-themes
- Path alias `@/` points to `src/`

## Project Context

This appears to be a cannabis dispensary menu/ordering system with:
- Multi-tenant support (brands can manage their own products)
- Customer ordering interface
- Admin oversight capabilities
- Supabase backend for real-time data and authentication