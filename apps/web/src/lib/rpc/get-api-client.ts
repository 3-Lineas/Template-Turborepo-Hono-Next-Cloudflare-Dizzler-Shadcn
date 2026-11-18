import "server-only";
import { createHonoClient } from "@3lineas/groovepack/api-client";
import type { AppType } from "@repo/api/routes";
import { verifySession } from "@/lib/session/verify-session";

type CloudflareApiEnv = {
  API?: {
    fetch: typeof fetch;
  };
};

export async function getApiClient() {
  if (typeof process !== "undefined" && process.env && !process.env.NODE_ENV) {
    Reflect.set(process.env, "NODE_ENV", "development");
  }

  const session = await verifySession();
  const defaultHeaders: Record<string, string> = {};
  if (session.isAuth && session.userId) {
    defaultHeaders["x-user-id"] = session.userId;
    defaultHeaders["x-user-role"] = session.role ?? "user";
  }

  return createHonoClient<AppType>({
    baseUrl: "http://api.local/api",
    defaultHeaders,
    fetcher: async (input, init) => {
      const url = new URL(input.toString(), "http://api.local");

      try {
        const { env } = (await import("cloudflare:workers")) as {
          env: CloudflareApiEnv;
        };
        if (env?.API) {
          const response = await env.API.fetch(input, init);
          if (response.ok) {
            return response;
          }

          const contentType = response.headers.get("content-type") ?? "";
          if (contentType.includes("application/json")) {
            return response;
          }
        }
      } catch {
        // Fallback to local Hono dev server when running outside Cloudflare Workers
      }

      const localUrl = `http://127.0.0.1:8787${url.pathname}${url.search}`;
      return fetch(localUrl, init);
    },
  });
}
