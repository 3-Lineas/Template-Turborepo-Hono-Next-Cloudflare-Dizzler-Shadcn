import { signJwt } from "../../common/crypto/sign-jwt";
import { InternalServerError } from "../../errors/common/internal-server.error";
import type { LoginContext } from "../../types/auth/login-context.type";

export async function generateAuthTokenAction(
  context: LoginContext,
): Promise<LoginContext> {
  if (!context.jwtSecret) {
    throw new InternalServerError(
      "Falta la configuración de seguridad JWT_SECRET en el servidor.",
    );
  }

  if (!context.user) {
    throw new InternalServerError("No se pudo resolver el usuario autenticado.");
  }

  const token = await signJwt(
    {
      sub: String(context.user.id),
      email: context.user.email,
      name: context.user.name,
    },
    context.jwtSecret,
  );

  context.token = token;
  context.result = {
    token,
    user: {
      id: context.user.id,
      name: context.user.name,
      email: context.user.email,
      created_at: context.user.created_at,
    },
  };

  return context;
}
