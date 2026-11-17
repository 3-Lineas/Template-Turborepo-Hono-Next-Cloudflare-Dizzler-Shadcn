import { Hono } from "hono";
import { authRouter } from "./auth/auth.router";
import { usersRouter } from "./users/users.router";
import type { CustomVars } from "../types/context/custom-vars.type";
import type { Env } from "../types/context/env.type";

export const apiRouter = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>()
  .route("/auth", authRouter)
  .route("/users", usersRouter);

export type AppType = typeof apiRouter;
