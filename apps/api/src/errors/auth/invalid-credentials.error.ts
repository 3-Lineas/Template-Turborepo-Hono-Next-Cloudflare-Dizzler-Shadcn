import { createAppError } from "@3lineas/groovepack/errors";

export const invalidCredentialsError = createAppError({
  name: "InvalidCredentialsError",
  statusCode: 401,
  code: "INVALID_CREDENTIALS",
  defaultMessage:
    "El correo o la contraseña no coinciden. Por favor, verifica tus datos.",
  silent: true,
});
