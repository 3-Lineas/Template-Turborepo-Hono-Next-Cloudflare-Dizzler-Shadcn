---
status: completed
lane: 2
date: 2026-11-17
---

# Migración de `apps/api` a `@3lineas/groovepack` (`^1.1.0`)

## Outcome Hypothesis
Al eliminar `apps/api/src/lib/logger/` y `apps/api/src/lib/pipeline/` y migrar `apps/api` al singleton `logger` (`@3lineas/groovepack/logger`) y `Pipeline` + `.then()` (`@3lineas/groovepack/pipeline`), `apps/api` compila sin errores, pasa su suite completa de Vitest (9/9) y `apps/web` mantiene la resolución de `AppType`.

## Checklist
- [x] Eliminar `apps/api/src/lib/logger/` y `apps/api/src/lib/pipeline/` conservando `apps/api/src/lib/d1/get-d1.ts`.
- [x] Simplificar tipos (`CustomVars`, `RouteHandlerParams`, `LoginContext`, `RegisterContext`) sin `Logger`.
- [x] Migrar `index.ts`, `app-error.ts`, `global-error-handler.ts`, `create-route-handler.ts`, `login.route.ts` y `register.route.ts` a `@3lineas/groovepack`.
- [x] Actualizar tests en `apps/api/tests/` y verificar `tsc --noEmit` + `vitest run`.

## Evidence
- `cd apps/api && ../../node_modules/.bin/tsc --noEmit`: 0 errores.
- `cd apps/api && ./node_modules/.bin/vitest run`: 4 archivos, 9/9 pruebas pasando.
- `grep -rn "lib/logger\|lib/pipeline" apps/api/`: 0 referencias residuales.
