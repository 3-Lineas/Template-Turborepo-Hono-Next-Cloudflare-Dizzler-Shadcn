import { createAppError } from "@3lineas/groovepack/errors";

export const registerError = createAppError({
  name: "RegisterError",
  statusCode: 400,
  code: "AUTH_REGISTER_FAILED",
  defaultMessage:
    "No pudimos completar tu registro. Por favor, revisa los datos ingresados.",
  silent: true,
});
