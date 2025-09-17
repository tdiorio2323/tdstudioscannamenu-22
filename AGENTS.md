# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with UI in `src/components/`, route views in `src/pages/`, hooks in `src/hooks/`, and Supabase helpers in `src/supabase/`. Shared utilities belong in `src/utils.ts`, and assets should sit beside the code that uses them. Static files that must ship verbatim go in `public/`; build artifacts appear in `dist/` and should not be edited. Supabase migrations reside in `supabase/migrations/` alongside `config.toml`.

## Build, Test, and Development Commands
Run `npm install` once per environment to sync dependencies. Use `npm run dev` for the Vite dev server with HMR, and `npm run build` to emit the production bundle into `dist/`. Preview a production build locally with `npm run preview`. Lint React/TypeScript code with `npm run lint` to catch style or hook issues early.

## Coding Style & Naming Conventions
Code is TypeScript + React with 2-space indentation. Components live in PascalCase files (e.g., `DashboardLayout.tsx`), pages follow the same pattern (e.g., `Checkout.tsx`), and hooks use camelCase names in kebab-case files (e.g., `use-mobile.tsx`). Favour Tailwind utility classes over ad-hoc CSS. Prefer named exports for reusable units, and keep constants in UPPER_SNAKE_CASE.

## Testing Guidelines
No test harness ships by default. If tests are required, introduce Vitest with React Testing Library, add an `npm run test` script, and place specs alongside their targets or under `src/__tests__/` using the `*.test.ts(x)` suffix. Focus coverage on critical hooks, data flows, and authentication seams.

## Commit & Pull Request Guidelines
Follow Conventional Commits such as `feat: add Brand dashboard` or `fix: correct toast timing`. Keep changes scoped and avoid bundling unrelated refactors. Pull requests should include a concise summary, linked issues, UI screenshots or GIFs when visuals change, and manual verification steps (e.g., `npm run dev`, routes touched).

## Security & Configuration Tips
Never commit Supabase secrets; store them in `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and access them via `import.meta.env`. Verify `dist/` is ignored from commits, and audit new dependencies before adding them to ensure compatibility with Vite and Supabase tooling.
