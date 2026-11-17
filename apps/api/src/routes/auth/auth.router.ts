import { Hono } from "hono";
import { loginRoute } from "./login.route";
import { registerRoute } from "./register.route";
import type { CustomVars } from "../../types/context/custom-vars.type";
import type { Env } from "../../types/context/env.type";

export const authRouter = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>()
  .route("/", loginRoute)
  .route("/", registerRoute);
