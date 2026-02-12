"use server";

import { trpc } from "@/lib/trpc-server";
import { z } from "zod";
import { registerSchema } from "@/app/(auth)/register/schemas/register-schema";

/**
 * Action handles user registration
 * @param data Registration data
 */
export async function registerAction(data: z.infer<typeof registerSchema>) {
  try {
    const response = await trpc.auth.register.mutate(data);

    if (!response.success) {
      const errorMsg = "error" in response ? response.error : undefined;
      return {
        success: false,
        message: response.message || errorMsg || "Registration failed",
      };
    }

    return { success: true, message: response.message };
  } catch {
    return { success: false, message: "Registration failed or server error" };
  }
}
