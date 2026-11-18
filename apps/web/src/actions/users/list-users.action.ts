"use server";

import { apiAction } from "@3lineas/groovepack/api-action";
import { listUsersError } from "@/errors/users/list-users.error";
import { apiClient } from "@/lib/api-client";
import type { UserItem } from "@/types/users/user-item.type";

export async function listUsersAction() {
  return apiAction<UserItem[]>({
    apiCall: apiClient.users.list.$get(),
    fallback: [],
    onError: listUsersError,
  });
}
