# Project Context & Architecture: cf-turborepo-ne

This file provides AI agents with instant architectural orientation for this project (`Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn`).

## 1. Stack & Dependencies
- **Monorepo & Build System**: Turborepo (`^2.9.18`) + `pnpm@9.0.0` (`node >= 18`) + TypeScript (`^6.0.3` / `5.9.2`) + Prettier (`^3.7.4`).
- **Backend (`apps/api` — `@repo/api`)**:
  - Runtime: Cloudflare Workers (`wrangler ^4.103.0`).
  - Framework: Hono (`^4.12.26`).
  - Database: Cloudflare D1 nativo (`binding = "DB"`) vía `getD1()` (`import { env } from "cloudflare:workers"`) y migraciones SQL en `apps/api/migrations/` (sin Drizzle ORM).
  - Auth: `jose` (`^6.1.3`) + Web Crypto PBKDF2 para hashing de contraseñas y JWT (requiere `JWT_SECRET` en `ctx.env` / `.dev.vars` sin fallback).
  - Validation & Testing: Valibot (`valibot` + `@hono/valibot-validator`) y Vitest (`vitest` con adaptador D1 in-memory).
- **Frontend (`apps/web` — `web`)**:
  - Framework: Next.js `16.2.9` (App Router, Turbopack) + React `19.2.7` (`babel-plugin-react-compiler`).
  - Cloudflare Adapter: `@opennextjs/cloudflare` (`^1.19.11`) with Service Binding `API` -> `api` worker and `WORKER_SELF_REFERENCE`.
  - Styling & UI: Tailwind CSS v4 (`^4.3.1`), `@repo/ui` (Shadcn UI / Radix UI / Base UI), `lucide-react`, `sonner`, `next-themes`.
  - Forms: `react-hook-form` (`^7.80.0`) + `@hookform/resolvers`.
- **Shared Packages (`packages/`)**:
  - `@repo/ui`: Shared Shadcn/Radix UI component library (`./components/*`, `./lib/*`, `./hooks/*`, `./styles/*`).
  - `@repo/eslint-config`: Shared ESLint 9 configurations.
  - `@repo/typescript-config`: Shared `tsconfig` bases.

## 2. Directory Structure & Architectural Conventions
- **Strict Atomic File Rule**: At most **1** function, method, action, route handler, component, hook, schema, or type per file (<200 lines). Zero barrel files (`index.ts` re-exports are forbidden).
- **1 DB Call per Action & Pipeline Chaining**: Every database query or mutation lives in an isolated atomic Action (max 1 DB query per Action). Monolithic use-case actions are forbidden; routes chain atomic actions via `Pipeline.send(context).through([...actions])`.
- **Type Isolation**: Never declare data interfaces or types inline inside actions, routes, DTOs, or hooks. Only a UI component's own `Props` interface can be inline in its `.tsx` file; all other domain/data types live in `@/types/{domain}/{name}.type.ts`.
- **Domain within Technical Layers**: Organize code by `{domain}` subfolders inside each technical layer:
  - `src/actions/{domain}/{verb}-{entity}.action.ts`
  - `src/routes/{domain}/{action}.route.ts`
  - `src/dtos/{domain}/{action}.dto.ts`
  - `src/types/{domain}/{name}.type.ts`
  - `src/errors/{domain}/{name}.error.ts`
  - Never create root `src/domains/`, `src/controllers/`, or `src/modules/` folders.
- **Next.js (`apps/web`) Architecture**:
  - 100% Server Pages (`page.tsx`), route groups `(app)`, `(auth)`, `(guest)`, and `middleware.ts` for session/route protection.
  - Client components (`'use client'`) restricted to interactive leaf nodes.
  - GroovePack communication pipeline: `apiToast -> Server Action -> apiAction -> apiClient` using Hono RPC (`hc<AppType>`) over Cloudflare Service Binding (`env.API.fetch`).

## 3. Source Modules & Data Flow
- `apps/api`: Cloudflare Worker entry at `src/index.ts`. Injects D1 (`ctx.set("db", getD1())`) per request, handles `AppError` and validation errors globally using `@3lineas/groovepack/logger`, orchestrates multi-step routes with `@3lineas/groovepack/pipeline`, and mounts routes under `/api`.
- `apps/web`: Next.js App Router deployed to Cloudflare Workers via OpenNext (`wrangler.jsonc`). Communicates with `apps/api` via the `API` Service Binding (`apps/web/src/lib/api-client.ts`) wrapped by `apiAction` (`apps/web/src/actions/api-action.ts`).
- `packages/ui`: Shared design system components consumed via `@repo/ui/components/*`.

## 4. Communication & User Copy Language
- **Configured Language**: Español (`es`).
- **Policy**: Todos los mensajes, validaciones, errores, CTAs y comunicaciones con el usuario deben redactarse estrictamente en Español. El tono debe ser empático, amable, persuasivo y profesional.

## 5. Essential Commands
- **build**: `pnpm build` (`turbo run build`)
- **typecheck**: `pnpm check-types` (`turbo run check-types`)
- **lint**: `pnpm lint` (`turbo run lint`)
- **format**: `pnpm format` (`prettier --write "**/*.{ts,tsx,md}"`)
- **dev**: `pnpm dev` (`turbo run dev`)
- **db:generate**: `pnpm db:generate` (`pnpm --filter @repo/api db:generate`)
- **migrate:local**: `pnpm migrate:local` (`pnpm --filter @repo/api exec -- wrangler d1 migrations apply DB --local`)
- **migrate:remote**: `pnpm migrate:remote` (`pnpm --filter @repo/api exec -- wrangler d1 migrations apply DB --remote`)
- **db:studio**: `pnpm db:studio` (`pnpm --filter @repo/api db:studio`)

## 6. Known Gaps & Pending Alignment Tasks (Documented During Onboarding)
1. **Dependencies Not Installed Locally**: `node_modules` is currently absent in the workspace; `pnpm install` must be run when starting implementation tasks before executing `pnpm check-types` or `pnpm build`.
2. **Full Refactor to GrooveSkills Standards (Valibot & Atomic Layers)**:
   - Replace `zod` and `@hono/zod-validator` across `apps/api` and `apps/web` with `valibot` (`* as v from 'valibot'`) and `@hono/valibot-validator`.
   - Deprecate and migrate legacy `apps/api/src/modules/` and `apps/api/src/routers/` into strict `{domain}` subfolders within technical layers (`src/routes/{domain}/`, `src/actions/{domain}/`, `src/dtos/{domain}/`, `src/types/{domain}/`, `src/errors/{domain}/`), enforcing 1 function/type per file and `Pipeline` chaining (1 DB call per Action).
3. **Testing & Verification Scripts Gap**:
   - Vitest (`vitest`) is not yet installed or configured; a future task will add Vitest with in-memory SQLite/D1 testing per `testing-vitest`.
   - `@repo/api` (`apps/api/package.json`) currently lacks `check-types`, `lint`, and `test` scripts.
