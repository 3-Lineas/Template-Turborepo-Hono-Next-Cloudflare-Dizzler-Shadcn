import { verifyPassword } from "../../common/crypto/verify-password";
import { InvalidCredentialsError } from "../../errors/auth/invalid-credentials.error";
import type { LoginContext } from "../../types/auth/login-context.type";

export async function verifyUserPasswordAction(
  context: LoginContext,
): Promise<LoginContext> {
  if (!context.user) {
    throw new InvalidCredentialsError();
  }

  const isValid = await verifyPassword(
    context.input.password,
    context.user.password,
  );

  if (!isValid) {
    throw new InvalidCredentialsError();
  }

  return context;
}
