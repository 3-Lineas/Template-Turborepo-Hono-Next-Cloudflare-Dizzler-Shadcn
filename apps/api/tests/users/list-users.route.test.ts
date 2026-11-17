import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { globalErrorHandler } from "@/common/utils/global-error-handler";
import { apiRouter } from "@/routes/index";
import type { ActionResponse } from "@/types/common/action-response.type";
import type { CustomVars } from "@/types/context/custom-vars.type";
import type { Env } from "@/types/context/env.type";
import type { UserResponse } from "@/types/users/user-response.type";
import { createInMemoryD1 } from "../mocks/in-memory-d1";

describe("Users HTTP Routes", () => {
  it("lista usuarios en /api/users/list sin exponer password", async () => {
    const db = createInMemoryD1();
    const app = new Hono<{ Bindings: Env; Variables: CustomVars }>();

    app.use("*", async (ctx, next) => {
      ctx.set("db", db);
      await next();
    });

    app.onError(globalErrorHandler);
    app.route("/api", apiRouter);

    await app.request(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Elena",
          email: "elena@example.com",
          password: "password123",
        }),
      },
      { DB: db },
    );

    const res = await app.request("/api/users/list", { method: "GET" }, { DB: db });
    expect(res.status).toBe(200);

    const body = (await res.json()) as ActionResponse<UserResponse[]>;
    expect(body.success).toBe(true);
    expect(body.data?.length).toBe(1);
    expect(body.data?.[0]?.email).toBe("elena@example.com");
    expect("password" in (body.data?.[0] ?? {})).toBe(false);
  });
});
