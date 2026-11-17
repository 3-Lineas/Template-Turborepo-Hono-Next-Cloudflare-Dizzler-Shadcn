import type { Context } from "hono";
import type { CustomVars } from "./custom-vars.type";
import type { Env } from "./env.type";

export type AppContext = Context<{
  Bindings: Env;
  Variables: CustomVars;
}>;
