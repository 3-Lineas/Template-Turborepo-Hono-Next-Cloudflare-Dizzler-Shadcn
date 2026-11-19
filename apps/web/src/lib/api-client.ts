import "server-only";
import { createHonoClient } from "@3lineas/groovepack/api-client";
import type { AppType } from "@repo/api/routes";
import { verifySession } from "@/lib/session/verify-session";

const isDev = Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);
const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8787";

export const apiClient = createHonoClient<AppType>({
  baseUrl: isDev ? `${apiUrl}/api` : "http://api.local/api",
  ...(isDev ? {} : { serviceBinding: "API" }),
  fallbackBaseUrl: apiUrl,
  getHeaders: async (): Promise<Record<string, string>> => {
    const session = await verifySession();
    return session.isAuth && session.userId
      ? { "x-user-id": session.userId, "x-user-role": session.role ?? "user" }
      : {};
  },
});
