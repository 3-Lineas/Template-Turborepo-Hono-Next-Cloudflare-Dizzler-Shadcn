import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./db/schema";
import { Logger } from "@repo/logger";

export interface Env {
  DB: D1Database;
  JWT_SECRET?: string;
}

// Custom variables accessible via c.get("db") / c.get("logger")
export interface CustomVars {
  db: DrizzleD1Database<typeof schema>;
  logger: Logger;
}
