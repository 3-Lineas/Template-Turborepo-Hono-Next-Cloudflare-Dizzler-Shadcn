import { createAppError } from "@3lineas/groovepack/errors";

export const validationError = createAppError({
  name: "ValidationError",
  statusCode: 400,
  code: "VALIDATION_ERROR",
  defaultMessage:
    "Por favor, revisa los datos ingresados e inténtalo de nuevo.",
  silent: true,
});
