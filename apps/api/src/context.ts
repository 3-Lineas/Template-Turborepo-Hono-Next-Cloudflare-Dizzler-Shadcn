import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createDb } from '@repo/db';

export interface Env {
  DB: D1Database;
  JWT_SECRET?: string;
}

export function createContext(
  opts: FetchCreateContextFnOptions,
  env: Env
) {
  const db = createDb(env.DB);
  return {
    db,
    env,
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
