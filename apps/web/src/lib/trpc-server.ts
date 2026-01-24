import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/api/src/routers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifySession } from "@/lib/session";
import { inferRouterOutputs } from "@trpc/server";

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://api-service/trpc", // URL dummy, interceptada abajo
      fetch: async (input, init) => {
        // En OpenNext, getCloudflareContext puede ser async o sync dependiendo de la versión/uso.
        // Asumimos async por seguridad y consistencia con storage.ts
        const { env } = await getCloudflareContext();
        // In this project, the binding is named "API" in wrangler.jsonc
        const bindings = env as {
          API?: {
            fetch: (
              input: RequestInfo | URL,
              init?: RequestInit,
            ) => Promise<Response>;
          };
        };

        // Get current session and inject headers
        const session = await verifySession();
        const headers = new Headers(init?.headers);

        if (session && session.isAuth && session.userId) {
          headers.set("x-user-id", session.userId.toString());
          if (session.role) {
            headers.set("x-user-role", session.role);
          }
        }

        const newInit = { ...init, headers };

        // Helper to perform fetch against localhost
        const fetchLocal = async () => {
          const urlObj = new URL(input.toString());
          // Replace protocol and host to point to local API
          // Input is "http://api-service/trpc/..."
          const localUrl = `http://127.0.0.1:8787${urlObj.pathname}${urlObj.search}`;
          // console.log(`[tRPC] Falling back to local API: ${localUrl}`);
          return fetch(localUrl, newInit);
        };

        if (bindings?.API) {
          try {
            const response = await bindings.API.fetch(input, newInit);

            // Check if the Service Binding returned a "Worker not found" error (common in dev)
            // Cloudflare/Miniflare often returns 404 or 503 with specific text
            if (!response.ok) {
              const clone = response.clone();
              const text = await clone.text();
              if (
                text.includes("Couldn't find") ||
                text.includes("Experiment not found")
              ) {
                // console.warn(
                //   "[tRPC] API binding found but failed. Trying localhost."
                // );
                return fetchLocal();
              }
            }
            return response;
          } catch (e) {
            console.error("[tRPC] API fetch error:", e);
            // If fetch throws (e.g. network error within binding), try local
            return fetchLocal();
          }
        }

        // If no binding and in dev, try local
        if (process.env.NODE_ENV === "development") {
          // console.warn("[tRPC] API binding missing. Using localhost.");
          return fetchLocal();
        }

        throw new Error("API binding is missing");
      },
    }),
  ],
});
