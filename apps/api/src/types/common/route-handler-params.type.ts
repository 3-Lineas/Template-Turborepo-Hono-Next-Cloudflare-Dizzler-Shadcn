import type { AppContext } from "../context/app-context.type";

export interface RouteHandlerParams {
  db: D1Database;
  ctx: AppContext;
}
