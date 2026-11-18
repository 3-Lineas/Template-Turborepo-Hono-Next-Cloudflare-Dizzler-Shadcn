import { createAppError } from "@3lineas/groovepack/errors";

export const duplicateEmailError = createAppError({
  name: "DuplicateEmailError",
  statusCode: 409,
  code: "DUPLICATE_EMAIL",
  defaultMessage:
    "Ya existe una cuenta registrada con este correo electrónico. Intenta iniciar sesión.",
  silent: true,
});
