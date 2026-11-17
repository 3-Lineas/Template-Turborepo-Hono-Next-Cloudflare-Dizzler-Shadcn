import { Hono } from "hono";
import { listUsersRoute } from "./list.route";
import type { CustomVars } from "../../types/context/custom-vars.type";
import type { Env } from "../../types/context/env.type";

export const usersRouter = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>().route("/", listUsersRoute);
