"use server";

import { trpc } from "@/lib/trpc-server";
import { createSession } from "@/lib/session";
import { z } from "zod";
import { loginSchema } from "@/app/(auth)/login/schemas/login-schema";

/**
 * Action handles user login
 * @param data Login data
 */
export async function loginAction(data: z.infer<typeof loginSchema>) {
  try {
    const response = await trpc.auth.login.mutate(data);

    if (!response.success || !("data" in response)) {
      const errorMsg = "error" in response ? response.error : undefined;
      return {
        success: false,
        message: response.message || errorMsg || "Login failed",
      };
    }

    // Expected error due to type mismatch in session creation
    await createSession(response.data.user.id);

    return { success: true, message: response.message };
  } catch {
    return { success: false, message: "Invalid credentials or server error" };
  }
}
