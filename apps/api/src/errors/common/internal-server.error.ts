import { createAppError } from "@3lineas/groovepack/errors";

export const internalServerError = createAppError({
  name: "InternalServerError",
  statusCode: 500,
  code: "INTERNAL_SERVER_ERROR",
  defaultMessage:
    "Tuvimos un inconveniente inesperado en el servidor. Por favor, intenta nuevamente en unos momentos.",
  silent: false,
});
