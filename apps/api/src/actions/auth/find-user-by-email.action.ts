import { invalidCredentialsError } from "../../errors/auth/invalid-credentials.error";
import type { LoginContext } from "../../types/auth/login-context.type";
import type { UserRow } from "../../types/users/user-row.type";

export async function findUserByEmailAction(
  context: LoginContext,
): Promise<LoginContext> {
  const user = await context.db
    .prepare(
      "SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1",
    )
    .bind(context.input.email)
    .first<UserRow>();

  if (!user) {
    throw invalidCredentialsError();
  }

  context.user = user;
  return context;
}
