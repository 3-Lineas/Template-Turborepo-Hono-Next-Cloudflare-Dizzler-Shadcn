import { Hono } from "hono";
import { cors } from "hono/cors";
import { globalErrorHandler } from "./common/utils/global-error-handler";
import { getD1 } from "./lib/d1/get-d1";
import { apiRouter } from "./routes/index";
import type { CustomVars } from "./types/context/custom-vars.type";
import type { Env } from "./types/context/env.type";

const app = new Hono<{ Bindings: Env; Variables: CustomVars }>();

app.use("*", cors());

app.use("*", async (ctx, next) => {
  const db = getD1();

  ctx.set("db", db);

  await next();
});

app.onError(globalErrorHandler);

app.route("/api", apiRouter);

export default app;
