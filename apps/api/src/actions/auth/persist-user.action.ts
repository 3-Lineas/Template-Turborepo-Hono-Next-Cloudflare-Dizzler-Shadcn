import { internalServerError } from "../../errors/common/internal-server.error";
import type { RegisterContext } from "../../types/auth/register-context.type";
import type { UserPublic } from "../../types/users/user-public.type";

export async function persistUserAction(
  context: RegisterContext,
): Promise<RegisterContext> {
  if (!context.passwordHash) {
    throw internalServerError("No se pudo procesar la contraseña.");
  }

  const createdAt = Math.floor(Date.now() / 1000);

  const createdUser = await context.db
    .prepare(
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?) RETURNING id, name, email, created_at",
    )
    .bind(
      context.input.name,
      context.input.email,
      context.passwordHash,
      createdAt,
    )
    .first<UserPublic>();

  if (!createdUser) {
    throw internalServerError("No se pudo registrar el usuario.");
  }

  context.user = createdUser;
  return context;
}
