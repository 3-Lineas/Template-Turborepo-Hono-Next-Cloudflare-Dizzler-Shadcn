import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { globalErrorHandler } from "@/common/utils/global-error-handler";
import { apiRouter } from "@/routes/index";
import type { ActionResponse } from "@/types/common/action-response.type";
import type { CustomVars } from "@/types/context/custom-vars.type";
import type { Env } from "@/types/context/env.type";
import type { UserResponse } from "@/types/users/user-response.type";
import { createInMemoryD1 } from "../mocks/in-memory-d1";

function createTestApp(db: D1Database) {
  const app = new Hono<{ Bindings: Env; Variables: CustomVars }>();

  app.use("*", async (ctx, next) => {
    ctx.set("db", db);
    await next();
  });

  app.onError(globalErrorHandler);
  app.route("/api", apiRouter);

  return app;
}

describe("Auth HTTP Routes", () => {
  it("registra un usuario en /api/auth/register sin exponer password", async () => {
    const db = createInMemoryD1();
    const app = createTestApp(db);

    const res = await app.request(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "María",
          email: "maria@example.com",
          password: "password123",
        }),
      },
      { DB: db, JWT_SECRET: "test-secret-at-least-32-chars-long" },
    );

    expect(res.status).toBe(201);
    const body = (await res.json()) as ActionResponse<UserResponse>;
    expect(body.success).toBe(true);
    expect(body.data?.email).toBe("maria@example.com");
    expect("password" in (body.data ?? {})).toBe(false);
  });

  it("inicia sesión en /api/auth/login y devuelve token + usuario saneado", async () => {
    const db = createInMemoryD1();
    const app = createTestApp(db);
    const env: Env = {
      DB: db,
      JWT_SECRET: "test-secret-at-least-32-chars-long",
    };

    await app.request(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Pedro",
          email: "pedro@example.com",
          password: "password123",
        }),
      },
      env,
    );

    const loginRes = await app.request(
      "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "pedro@example.com",
          password: "password123",
        }),
      },
      env,
    );

    expect(loginRes.status).toBe(200);
    const loginBody = (await loginRes.json()) as ActionResponse<{
      token: string;
      user: UserResponse;
    }>;
    expect(loginBody.success).toBe(true);
    expect(loginBody.data?.token).toBeTruthy();
    expect(loginBody.data?.user.email).toBe("pedro@example.com");
    expect("password" in (loginBody.data?.user ?? {})).toBe(false);
  });

  it("retorna 500 si falta JWT_SECRET en /api/auth/login", async () => {
    const db = createInMemoryD1();
    const app = createTestApp(db);

    await app.request(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Sofía",
          email: "sofia@example.com",
          password: "password123",
        }),
      },
      { DB: db },
    );

    const loginRes = await app.request(
      "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "sofia@example.com",
          password: "password123",
        }),
      },
      { DB: db },
    );

    expect(loginRes.status).toBe(500);
    const body = (await loginRes.json()) as ActionResponse<never>;
    expect(body.success).toBe(false);
    expect(body.code).toBe("INTERNAL_SERVER_ERROR");
  });
});
