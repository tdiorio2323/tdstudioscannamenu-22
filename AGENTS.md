# Repository Guidelines

## Project Structure & Module Organization
- `src/` — App code. Key folders: `components/` (UI + layouts), `pages/` (route-level views), `hooks/`, `supabase/` (client + types), shared `utils.ts`. Assets co‑located (e.g., `grass-background.jpg`).
- `public/` — Static assets served as‑is.
- `dist/` — Build output (do not edit).
- Config: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`.
- Database: `supabase/` with `migrations/` and `config.toml`.

## Build, Test, and Development Commands
- Install deps: `npm install` (or `pnpm i` / `bun install`).
- Start dev server: `npm run dev` — launches Vite with HMR.
- Build for production: `npm run build` — outputs to `dist/`.
- Preview build: `npm run preview` — serves `dist/` locally.
- Lint: `npm run lint` — runs ESLint on the project.

## Coding Style & Naming Conventions
- Language: TypeScript + React (`.tsx/.ts`). Indentation: 2 spaces.
- Components: PascalCase in `src/components` (e.g., `DashboardLayout.tsx`).
- Pages: PascalCase in `src/pages` (e.g., `Checkout.tsx`).
- Hooks: camelCase starting with `use` in `src/hooks` (e.g., `use-mobile.tsx`).
- Functions/variables: camelCase; constants UPPER_SNAKE_CASE; avoid default exports for reusable components.
- Styling: Tailwind CSS; prefer utility classes over ad‑hoc CSS.
- Linting: follow `eslint.config.js` (React Hooks rules enabled; `no-unused-vars` relaxed).

## Testing Guidelines
- No test framework is configured. If adding tests, prefer Vitest + React Testing Library.
- Name tests `*.test.ts`/`*.test.tsx`; co‑locate near source or use `src/__tests__/`.
- Include critical hooks/components, and auth/data flows in coverage.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat: add Brand dashboard`, `fix: correct toast timing`, `chore: update deps`.
- PRs: concise description, linked issues, screenshots/GIFs for UI changes, and manual test steps (dev server, routes touched).
- Keep PRs small and focused; avoid unrelated refactors.

## Security & Configuration Tips
- Do not commit secrets. Move Supabase URL/key to env vars: add `.env.local` with `VITE_SUPABASE_URL=` and `VITE_SUPABASE_ANON_KEY=`, read via `import.meta.env` in `src/supabase/client.ts`.
- Never edit `dist/`; commit only source under `src/` and config.
