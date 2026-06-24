import { Hono } from "hono";
import apiRouter from "./routers";
import { Env, CustomVars } from "./context";
import { createDb } from "./db";
import { Logger } from "@repo/logger";
import { AppError } from "./errors";

const app = new Hono<{ Bindings: Env; Variables: CustomVars }>();

// Inject DB and Logger once per request
app.use("*", async (ctx, next) => {
  const db = createDb(ctx.env.DB);
  const logger = new Logger("API:Request");

  ctx.set("db", db);
  ctx.set("logger", logger);

  await next();
});

// Global Error Handler
app.onError((error, ctx) => {
  const logger = ctx.get("logger") || new Logger("API:GlobalError");
  const logContext = {
    file: "apps/api/src/index.ts",
    method: ctx.req.method,
    url: ctx.req.url,
  };

  // 1. Check if it is a known business application error
  if (error instanceof AppError) {
    // Note: AppError constructor already logs (unless silent), so we only handle the response here
    return ctx.json(
      {
        success: false,
        message: error.message,
        error: error.code,
      },
      error.statusCode as any,
    );
  }

  // 2. Check for validation errors (e.g. Zod validators)
  // Hono's zod-validator usually throws an Error with name "ZodError" if not handled locally
  if (error.name === "ZodError" || error.message.includes("validation")) {
    logger.warn("Validation error encountered", logContext, error);
    return ctx.json(
      {
        success: false,
        message:
          "Los datos provistos son inválidos o no cumplen con el formato requerido.",
        error: "VALIDATION_ERROR",
      },
      400,
    );
  }

  // 3. Fallback for unhandled unexpected server crashes
  logger.error(
    "Unhandled server crash during request execution",
    logContext,
    error,
  );
  return ctx.json(
    {
      success: false,
      message:
        "Tuvimos un pequeño problema en nuestros servidores. Por favor, intenta de nuevo en unos momentos.",
      error: "INTERNAL_SERVER_ERROR",
    },
    500,
  );
});

// Mount the API router
app.route("/api", apiRouter);

export default app;
