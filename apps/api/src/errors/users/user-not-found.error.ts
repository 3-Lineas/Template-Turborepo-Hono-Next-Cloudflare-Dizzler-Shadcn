import { createAppError } from "@3lineas/groovepack/errors";

export const userNotFoundError = createAppError({
  name: "UserNotFoundError",
  statusCode: 404,
  code: "USER_NOT_FOUND",
  defaultMessage: "No encontramos el usuario solicitado.",
  silent: true,
});
