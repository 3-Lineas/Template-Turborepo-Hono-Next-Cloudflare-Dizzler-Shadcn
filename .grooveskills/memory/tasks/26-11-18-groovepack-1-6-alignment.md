---
status: completed
---
# Actualización a `@3lineas/groovepack@^1.6.0` y GrooveSkills `v1.24.0`

## Outcome Hypothesis
Reemplazar el wrapper manual `get-api-client.ts` por `createHonoClient<AppType>` con `serviceBinding`, `fallbackBaseUrl` y `getHeaders` en `src/lib/api-client.ts`, y pasar `Promise` directa a `apiCall`, eliminará el boilerplate en las Server Actions manteniendo `check-types`, `lint` y `vite build` en verde.

## Checklist
- [x] Instalar `@3lineas/groovepack@^1.6.0` en `apps/api` y `apps/web`.
- [x] Crear `apps/web/src/lib/api-client.ts` y eliminar `apps/web/src/lib/rpc/get-api-client.ts`.
- [x] Simplificar `login.action.ts`, `register.action.ts` y `list-users.action.ts`.
- [x] Verificar `pnpm check-types`, `pnpm --filter @repo/api lint` y `pnpm --filter web build`.
