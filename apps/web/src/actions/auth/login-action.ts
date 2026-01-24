"use server";

import { trpc } from "@/lib/trpc-server";
import { createSession } from "@/lib/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

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

    // @ts-ignore
    await createSession(response.data.user.id);

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: "Invalid credentials or server error" };
  }
}
