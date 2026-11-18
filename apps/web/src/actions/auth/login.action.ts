"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import { logger } from "@3lineas/groovepack/logger";
import type { LoginInput } from "@/app/(auth)/login/types/login-input.type";
import { getApiClient } from "@/lib/rpc/get-api-client";
import { createSession } from "@/lib/session/create-session";
import type { LoginResult } from "@/types/auth/login-result.type";

export async function loginAction(credentials: LoginInput) {
  const response = await apiAction<LoginResult>({
    apiCall: async () =>
      (await getApiClient()).auth.login.$post({
        json: credentials,
      }),
    onError: (msg, ctx) => logger.error(msg, ctx),
  });

  if (response.success && response.data) {
    await createSession(String(response.data.user.id), "user");
  }

  return response;
}
