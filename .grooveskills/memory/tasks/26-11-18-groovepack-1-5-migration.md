---
status: completed
lane: task
date: 2026-11-18
---

# Migración a `@3lineas/groovepack@^1.5.0` y `@3lineas/groovepack/errors`

## Outcome Hypothesis
Actualizar `@3lineas/groovepack` a `^1.5.0` en `apps/api` y `apps/web`, eliminar las clases base manuales `AppError` y migrar todas las excepciones de dominio a `createAppError`, manteniendo `check-types`, `lint` y `vite build` en verde.

## Checklist
- [x] Instalar `@3lineas/groovepack@^1.5.0` en `apps/api` y `apps/web`.
- [x] Eliminar `src/errors/app-error.ts` y `src/types/errors/app-error-params.type.ts` en `apps/web` y `apps/api`.
- [x] Migrar excepciones de `apps/web` (`listUsersError`, `loginError`, `registerError`) a `createAppError` y conectar `onError` directo en Server Actions.
- [x] Migrar las 5 excepciones de `apps/api` a `createAppError`, actualizar callers, `normalize-error.ts` y `ActionResponse<T>`.
- [x] Actualizar memoria en `.grooveskills/` y verificar con `check-types`, `lint`, `build` y `test`.

## Evidence
- `pnpm --filter @repo/api add @3lineas/groovepack@^1.5.0 && pnpm --filter web add @3lineas/groovepack@^1.5.0` -> exit code 0.
- `pnpm check-types` -> exit code 0 (`@repo/api` y `web`).
- `pnpm --filter @repo/api lint` -> exit code 0 (0 errors, 13 warnings).
- `pnpm --filter web build` -> exit code 0 (`vite build` completo).
- `pnpm --filter @repo/api test` -> `tests/auth/auth-dtos.test.ts` (3/3 passed); los 3 archivos con `better-sqlite3` fallaron por ABI mismatch local (`NODE_MODULE_VERSION 127` vs `137`).
