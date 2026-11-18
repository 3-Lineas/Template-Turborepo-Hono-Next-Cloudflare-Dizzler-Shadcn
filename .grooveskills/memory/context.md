# Project Context & Architecture: cf-turborepo-ne

This file provides AI agents with instant architectural orientation for this project (`Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn`).

## 1. Stack & Dependencies
- **Monorepo & Build System**: Turborepo (`^2.9.18`) + `pnpm@9.0.0` (`node >= 18`) + TypeScript (`^6.0.3` / `5.9.2`) + Prettier (`^3.7.4`).
- **Backend (`apps/api` — `@repo/api`)**:
  - Runtime: Cloudflare Workers (`wrangler ^4.164.0`).
  - Framework: Hono (`^4.13.19`) + `@3lineas/groovepack` (`^1.6.0`).
  - Database: Cloudflare D1 nativo (`binding = "DB"`) vía `getD1()` (`import { env } from "cloudflare:workers"`) y migraciones SQL en `apps/api/migrations/` (sin Drizzle ORM).
  - Auth: `jose` (`^6.2.17`) + Web Crypto PBKDF2 para hashing de contraseñas y JWT (requiere `JWT_SECRET` en `ctx.env` / `.dev.vars` sin fallback).
  - Validation & Testing: Valibot (`valibot` + `@hono/valibot-validator`) y Vitest (`vitest` con adaptador D1 in-memory vía `better-sqlite3`).
- **Frontend (`apps/web` — `web`)**:
  - Framework: **Vinext** (`^1.4.6`) + **Vite** (`groovepack()` de `@3lineas/groovepack/vite`) + React `19.3.1` (`babel-plugin-react-compiler`).
  - Cloudflare Adapter: `@cloudflare/vite-plugin` con Service Binding `API` -> `api` worker (`wrangler.jsonc`).
  - Styling & UI: Tailwind CSS v4 (`^4.3.1`), componentes locales en `src/components/ui/` basados en `@base-ui/react`, `@hugeicons/react`, `next-themes`, `@3lineas/groovepack` (`^1.6.0`).
  - Forms & Validation: `@formisch/react` + `valibot`.
- **Shared Packages (`packages/`)**:
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
  - `src/errors/{domain}/{name}.error.ts` (factories `createAppError` de `@3lineas/groovepack/errors`)
  - Never create root `src/domains/`, `src/controllers/`, or `src/modules/` folders.
- **Vinext (`apps/web`) Architecture**:
  - 100% Server Pages (`page.tsx`), route groups `(app)`, `(auth)`, `(guest)`, and `src/proxy.ts` for session/route protection.
  - Client components (`'use client'`) restricted to interactive leaf nodes.
  - GroovePack communication pipeline: `apiToast -> Server Action -> apiAction -> apiClient` (`src/lib/api-client.ts`) using Hono RPC (`createHonoClient<AppType>` con `serviceBinding: "API"`, `fallbackBaseUrl` y `getHeaders`), with `NEXT_PUBLIC_GROOVEPACK_LOCALE=es`.

## 3. Source Modules & Data Flow
- `apps/api`: Cloudflare Worker entry at `src/index.ts`. Injects D1 (`ctx.set("db", getD1())`) per request, handles `AppError`, `404` (`notFoundHandler`), and validation errors globally using `@3lineas/groovepack/logger` returning standardized `ActionResponse` JSON with user-safe messages (never exposing internal paths, HTTP methods, `details`, or stack traces), orchestrates multi-step routes with `@3lineas/groovepack/pipeline`, and mounts routes under `/api`.
- `apps/web`: Vinext App Router deployed to Cloudflare Workers (`wrangler.jsonc`). Communicates with `apps/api` via the `API` Service Binding (`apps/web/src/lib/rpc/get-api-client.ts`) wrapped by `apiAction` de `@3lineas/groovepack/action`.

## 4. Communication & User Copy Language
- **Configured Language**: Español (`es`).
- **Policy**: Todos los mensajes, validaciones, errores, CTAs y comunicaciones con el usuario deben redactarse estrictamente en Español. El tono debe ser empático, amable, persuasivo y profesional.

## 5. Essential Commands
- **build**: `pnpm build` (`turbo run build`)
- **typecheck**: `pnpm check-types` (`turbo run check-types`)
- **lint**: `pnpm lint` (`turbo run lint`)
- **test**: `pnpm --filter @repo/api test` (`vitest run`)
- **format**: `pnpm format` (`prettier --write "**/*.{ts,tsx,md}"`)
- **dev**: `pnpm dev` / `pnpm dev:vinext`
- **db:migrate**: `pnpm --filter @repo/api db:migrate`
- **db:migrate:fresh**: `pnpm --filter @repo/api db:migrate:fresh`
- **db:seed**: `pnpm --filter @repo/api db:seed`

## 6. Known Gaps & Pending Alignment Tasks
- Ninguna brecha crítica pendiente tras la alineación a GrooveSkills `v1.22.0`.
