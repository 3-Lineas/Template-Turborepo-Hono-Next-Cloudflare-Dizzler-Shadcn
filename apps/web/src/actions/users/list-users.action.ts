"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import { logger } from "@3lineas/groovepack/logger";
import { getApiClient } from "@/lib/rpc/get-api-client";
import type { UserItem } from "@/types/users/user-item.type";

export async function listUsersAction() {
  return apiAction<UserItem[]>({
    apiCall: async () => (await getApiClient()).users.list.$get(),
    onError: (msg, ctx) => logger.error(msg, ctx),
  });
}
