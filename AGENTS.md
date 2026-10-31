# AGENTS.md

## Project

Single-package Next.js 16 App Router app (`src/app`), managed with npm. No tests, no CI workflows, no typecheck script.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack)
- `npm run lint` — ESLint (flat config; passing no files lints the project root)
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script; `tsconfig` uses `"noEmit": true`)
- `npm run build` — production build; run lint + typecheck before it when verifying changes
- `npx shadcn add <component>` — add UI primitives; registry is configured in `components.json`

## Conventions & gotchas

- UI primitives are **Base UI** (`@base-ui/react`), not Radix. The shadcn style is `base-nova` (see `components.json`). Do not import from `@radix-ui/*`.
- `cn` is the npm package `cn`, re-exported from `src/lib/utils.ts` — not the usual `clsx` + `tailwind-merge` combo.
- Tailwind v4, CSS-first: tokens and variants live in `src/app/globals.css` (`@theme inline`, `@custom-variant dark`). There is no `tailwind.config`; Tailwind is wired through a Turbopack rule in `next.config.ts`.
- `next.config.ts` enables `reactCompiler`, `cacheComponents`, and `partialPrefetching`. With `cacheComponents` on, uncached/dynamic data access must sit behind a `<Suspense>` boundary.
- Path alias: `@/*` → `src/*` (matches the shadcn aliases in `components.json`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
