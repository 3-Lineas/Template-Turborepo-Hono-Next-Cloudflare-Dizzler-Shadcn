"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import type { RegisterInput } from "@/app/(auth)/register/types/register-input.type";
import { registerError } from "@/errors/auth/register.error";
import { apiClient } from "@/lib/api-client";
import type { UserItem } from "@/types/users/user-item.type";

export async function registerAction(input: RegisterInput) {
  return apiAction<UserItem>({
    apiCall: apiClient.auth.register.$post({ json: input }),
    onError: registerError,
  });
}
