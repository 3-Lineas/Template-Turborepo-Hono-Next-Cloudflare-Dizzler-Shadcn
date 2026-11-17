import type { RegisterContext } from "../../types/auth/register-context.type";

export async function sanitizeRegisterInputAction(
  context: RegisterContext,
): Promise<RegisterContext> {
  context.input = {
    name: context.input.name.trim(),
    email: context.input.email.trim().toLowerCase(),
    password: context.input.password,
  };

  return context;
}
