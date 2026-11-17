import type { LoginContext } from "../../types/auth/login-context.type";

export async function sanitizeLoginInputAction(
  context: LoginContext,
): Promise<LoginContext> {
  context.input = {
    email: context.input.email.trim().toLowerCase(),
    password: context.input.password,
  };

  return context;
}
