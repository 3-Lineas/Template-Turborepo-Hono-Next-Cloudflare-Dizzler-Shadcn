"use server";

import { api } from "@/lib/api-client";
import { createSession } from "@/lib/session";
import { z } from "zod";
import { loginSchema } from "@/app/(auth)/login/schemas/login-schema";
import { apiAction } from "../api-action";

/**
 * Action handles user login using apiAction wrapper
 * @param data Login data
 */
export async function loginAction(data: z.infer<typeof loginSchema>) {
  return apiAction({
    actionName: "login",
    apiCall: () => api.auth.login.$post({ json: data }),
    onSuccess: async (data: any) => {
      await createSession(data.user.id);
    },
  });
}
