declare global {
  namespace Cloudflare {
    interface Env {
      DB: D1Database;
      JWT_SECRET?: string;
    }
  }
}

export type Env = {
  DB: D1Database;
  JWT_SECRET?: string;
};
