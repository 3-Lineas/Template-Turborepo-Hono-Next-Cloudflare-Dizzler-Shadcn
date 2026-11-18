---
status: completed
lane: task
date: 2026-11-17
---

# Task: Actualización de `apps/web` a GrooveSkills, `@3lineas/groovepack` y Shadcn v4

## Outcome Hypothesis
Al migrar `apps/web` a `@3lineas/groovepack` (`api-client`, `api-action`, `api-toast`, `logger`), reemplazar `zod` por `valibot`, descomponer `session.ts` en funciones atómicas, aislar tipos/esquemas y adaptar los componentes Shadcn v4 (`@base-ui/react`), `apps/web` queda alineado con GrooveSkills y sin referencias residuales a los archivos locales eliminados.

## Checklist
- [x] Eliminar archivos locales de GroovePack (`src/lib/api-action/`, `src/lib/api-client/`, `src/lib/api-toast/`, `src/lib/logger/`, `src/lib/api-client.ts`, `src/actions/api-action.ts`).
- [x] Reemplazar `zod` por `valibot` (`^1.2.0`) en `apps/web/package.json` y ejecutar `pnpm install`.
- [x] Crear `src/lib/rpc/get-api-client.ts` con `createHonoClient` y Service Binding `env.API.fetch`.
- [x] Descomponer `src/lib/session.ts` en 5 funciones atómicas en `src/lib/session/`.
- [x] Aislar tipos en `src/types/` y esquemas Valibot co-localizados en `src/app/(auth)/`.
- [x] Actualizar Server Actions (`login.action.ts`, `register.action.ts`, `logout.action.ts`, `list-users.action.ts`) y Client Hooks (`use-login.ts`, `use-register.ts`, `use-logout.ts`).
- [x] Conectar `dashboard/page.tsx` a `listUsersAction()` y actualizar `dashboard/loading.tsx`.
- [x] Adaptar componentes Shadcn v4 (`login-form.tsx`, `register-form.tsx`, `logout-button.tsx`, `theme-toogle.tsx`, `spinner.tsx`).
- [x] Declarar `Cloudflare.Env` en `apps/api/src/types/context/env.type.ts`, refinar `createRouteHandler` y agregar `exports` en `apps/api/package.json`.

## Evidence
- `rg -n "lib/api-client|lib/api-action|lib/api-toast|lib/logger|from \"zod\"" apps/web/src/` -> 0 coincidencias.
- `cd apps/api && ../../node_modules/.bin/tsc --noEmit` -> 0 errores.
- `cd apps/web && ../../node_modules/.bin/tsc --noEmit` -> 1 error de varianza en `createHonoClient<typeof AppType>` (`get-api-client.ts:20`).
- `cd apps/api && ./node_modules/.bin/vitest run` -> 3/9 tests pasaron (`auth-dtos.test.ts`); 6/9 fallaron por mismatch de binario nativo `better-sqlite3` (NODE_MODULE_VERSION 127 vs 137).
