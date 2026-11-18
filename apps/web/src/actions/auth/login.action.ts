"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import type { LoginInput } from "@/app/(auth)/login/types/login-input.type";
import { loginError } from "@/errors/auth/login.error";
import { apiClient } from "@/lib/api-client";
import { createSession } from "@/lib/session/create-session";
import type { LoginResult } from "@/types/auth/login-result.type";

export async function loginAction(credentials: LoginInput) {
  const response = await apiAction<LoginResult>({
    apiCall: apiClient.auth.login.$post({ json: credentials }),
    onError: loginError,
  });

  if (response.success && response.data) {
    await createSession(String(response.data.user.id), "user");
  }

  return response;
}
