"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import { logger } from "@3lineas/groovepack/logger";
import type { RegisterInput } from "@/app/(auth)/register/types/register-input.type";
import { getApiClient } from "@/lib/rpc/get-api-client";
import type { UserItem } from "@/types/users/user-item.type";

export async function registerAction(input: RegisterInput) {
  return apiAction<UserItem>({
    apiCall: async () =>
      (await getApiClient()).auth.register.$post({
        json: input,
      }),
    onError: (msg, ctx) => logger.error(msg, ctx),
  });
}
