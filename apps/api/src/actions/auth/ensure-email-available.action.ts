import { duplicateEmailError } from "../../errors/auth/duplicate-email.error";
import type { RegisterContext } from "../../types/auth/register-context.type";

export async function ensureEmailAvailableAction(
  context: RegisterContext,
): Promise<RegisterContext> {
  const existing = await context.db
    .prepare("SELECT id FROM users WHERE email = ? LIMIT 1")
    .bind(context.input.email)
    .first<{ id: number }>();

  if (existing) {
    throw duplicateEmailError();
  }

  return context;
}
