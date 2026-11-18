import "server-only";
import { createHonoClient } from "@3lineas/groovepack/api-client";
import type { AppType } from "@repo/api/routes";
import { verifySession } from "@/lib/session/verify-session";

export const apiClient = createHonoClient<AppType>({
  baseUrl: "http://api.local/api",
  serviceBinding: "API",
  fallbackBaseUrl: process.env.API_URL ?? "http://127.0.0.1:8787",
  getHeaders: async (): Promise<Record<string, string>> => {
    const session = await verifySession();
    return session.isAuth && session.userId
      ? { "x-user-id": session.userId, "x-user-role": session.role ?? "user" }
      : {};
  },
});
