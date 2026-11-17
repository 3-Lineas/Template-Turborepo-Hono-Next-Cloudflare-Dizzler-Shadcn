---
status: completed
createdAt: 2026-11-17
---

# 00 — Initial Project Onboarding & Architecture Exploration: cf-turborepo-ne

## Outcome Hypothesis
By scanning dependencies, entry points, configuration manifests, and module layout, the AI agent will gain a verified architectural understanding of `cf-turborepo-ne`, proven by filling out `.grooveskills/memory/context.md`, formulating interactive alignment questions with the user, and validating the essential build/typecheck commands.

## Scope & Strict Boundaries
- **In scope**: Inspect project manifests, entry points, and directory conventions; ask step-by-step interactive alignment questions; document project architecture and decisions inside `.grooveskills/memory/context.md` and `.grooveskills/memory/decisions.md`; and verify existing script execution if dependencies are already installed.
- **Out of scope (STRICT BOUNDARY)**: Do NOT create, modify, scaffold, or implement any application code, business logic, UI components, routes, schemas, or project features. Do NOT create feature/spec task files (`YY-MM-DD-*.md`), run dependency installations (`npm/pnpm/bun install`), modify config files (`package.json`, `tsconfig.json`, `drizzle.config.ts`, etc.), or start migrations/plans found in the repo (such as `PLAN_*.md`). During this task, you may ONLY edit files inside `.grooveskills/` (`context.md`, `decisions.md`, `tasks/00-onboarding.md`, and `bitacora/`).
- **User Answers & Future Work Rule**: Any pending migration, refactor, or tooling addition mentioned by the user during Q&A (e.g., migrating frameworks or adding a test runner) must **ONLY** be documented in `decisions.md` and `context.md`. NEVER execute or plan it as an active implementation during onboarding.
- **Completion Stop Rule**: This task's sole purpose is completing project onboarding. Once the user answers your alignment questions and `.grooveskills/memory/` is updated, set `status: completed`, present a concise summary of the documented context, and **STOP** immediately without further exploration or commands. Wait for the user to request their first feature or task in a new prompt.

## Checklist
- [x] Verify package manager and essential scripts (`build`, `test`, `typecheck`).
- [x] Map high-level module architecture and data flow in `.grooveskills/memory/context.md`.
- [x] Ask the user step-by-step interactive questions to align on technical conventions, domain boundaries, and architectural decisions (do NOT ask what the first milestone or feature to implement now is).
- [x] Document agreed technical decisions and any user-mentioned future work in `.grooveskills/memory/decisions.md` and `context.md`.
- [x] Run `typecheck` / `test` **ONLY IF** dependencies and scripts are already installed; if `node_modules` is missing or a runner is absent, document the gap in `context.md` without installing anything or modifying files.
- [x] Switch status to `completed` once project context is fully documented, present a brief summary, then STOP immediately and wait for the user's next instruction.

## Evidence
- **Manifest & Entry Point Inspection**:
  - Inspected root `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `apps/api/package.json`, `apps/api/wrangler.toml`, `apps/api/src/index.ts`, `apps/api/src/context.ts`, `apps/web/package.json`, `apps/web/wrangler.jsonc`, `packages/ui/package.json`, and `packages/logger/package.json`.
  - Checked `node_modules` presence (`ls -d node_modules 2>/dev/null || echo "NO_NODE_MODULES"` -> `NO_NODE_MODULES`). Per the strict onboarding boundary, no package installation was executed and the gap was documented in `.grooveskills/memory/context.md`.
- **User Alignment Q&A Decisions Captured**:
  1. **Refactor & Validation Standard**: Refactor everything to match GrooveSkills standards, replacing `zod` / `@hono/zod-validator` with `valibot` / `@hono/valibot-validator`.
  2. **Backend Layering (`apps/api`)**: Strictly adopt domain subfolders inside technical layers (`src/routes/{domain}/`, `src/actions/{domain}/`, `src/dtos/{domain}/`, `src/types/{domain}/`, `src/errors/{domain}/`) with `Pipeline` and max 1 DB call per Action, deprecating `src/modules/` and `src/routers/`.
  3. **Web <-> API Communication**: Keep Hono RPC (`hc<AppType>`) over Cloudflare Service Binding (`env.API.fetch`) via the GroovePack pipeline (`apiToast -> Server Action -> apiAction -> apiClient`).
  4. **Testing & Verification Scripts**: Document adding Vitest (with in-memory SQLite/D1 per `testing-vitest`) and `check-types`/`lint`/`test` scripts in `@repo/api` as a pending gap for a subsequent task.

## Next
- Onboarding is `completed`. Wait for the user's next instruction before starting any task or spec.
