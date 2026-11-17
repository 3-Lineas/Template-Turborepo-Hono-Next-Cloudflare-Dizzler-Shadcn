import { hashPassword } from "../../common/crypto/hash-password";
import type { RegisterContext } from "../../types/auth/register-context.type";

export async function hashUserPasswordAction(
  context: RegisterContext,
): Promise<RegisterContext> {
  context.passwordHash = await hashPassword(context.input.password);
  return context;
}
