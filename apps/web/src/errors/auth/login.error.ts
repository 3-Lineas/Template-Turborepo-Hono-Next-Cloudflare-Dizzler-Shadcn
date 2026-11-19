import { createAppError } from "@3lineas/groovepack/errors";

export const loginError = createAppError({
  name: "LoginError",
  statusCode: 401,
  code: "AUTH_LOGIN_FAILED",
  defaultMessage:
    "No pudimos iniciar tu sesión. Verifica tus datos e inténtalo nuevamente.",
});
