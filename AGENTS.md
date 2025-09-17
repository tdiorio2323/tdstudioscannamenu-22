# Repository Guidelines

## Project Structure & Module Organization
- `src/` — App code. Key folders: `components/` (UI + layouts), `pages/` (route views), `hooks/`, `supabase/` (client + types), shared `utils.ts`. Co‑locate assets with code (e.g., `grass-background.jpg`).
- `public/` — Static assets served as‑is.
- `dist/` — Build output (do not edit).
- Config: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`.
- Database: `supabase/` with `migrations/` and `config.toml`.

## Build, Test, and Development Commands
- `npm install` — Install dependencies.
- `npm run dev` — Start Vite dev server with HMR.
- `npm run build` — Production build to `dist/`.
- `npm run preview` — Serve built app locally from `dist/`.
- `npm run lint` — Run ESLint per `eslint.config.js`.

## Coding Style & Naming Conventions
- Language: TypeScript + React (`.ts/.tsx`); indentation: 2 spaces.
- Components: PascalCase in `src/components` (e.g., `DashboardLayout.tsx`).
- Pages: PascalCase in `src/pages` (e.g., `Checkout.tsx`).
- Hooks: exported function names camelCase starting with `use`; file names kebab‑case (e.g., `use-mobile.tsx`) in `src/hooks`.
- Functions/variables: camelCase; constants UPPER_SNAKE_CASE; prefer named exports for reusable components.
- Styling: Tailwind CSS; prefer utility classes over ad‑hoc CSS.
- Linting: React Hooks rules enabled; `no-unused-vars` relaxed.

## Testing Guidelines
- No test framework is preconfigured. If adding tests, use Vitest + React Testing Library.
- Name tests `*.test.ts`/`*.test.tsx`; co‑locate near source or use `src/__tests__/`.
- Add a `test` script when introducing Vitest, then run `npm run test` (or `npx vitest`). Target critical hooks/components and auth/data flows.

## Commit & Pull Request Guidelines
- Use Conventional Commits (examples): `feat: add Brand dashboard`, `fix: correct toast timing`, `chore: update deps`.
- PRs must include: concise description, linked issues, screenshots/GIFs for UI changes, and manual test steps (dev server, routes touched). Keep PRs small and focused; avoid unrelated refactors.

## Security & Configuration Tips
- Never commit secrets. Create `.env.local` with `VITE_SUPABASE_URL=` and `VITE_SUPABASE_ANON_KEY=`; access via `import.meta.env` in `src/supabase/client.ts`.
- Do not edit `dist/`; commit only source under `src/` and configuration files.
