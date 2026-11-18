import { createAppError } from "@3lineas/groovepack/errors";

export const listUsersError = createAppError({
  name: "ListUsersError",
  statusCode: 500,
  code: "USERS_LIST_FAILED",
  defaultMessage: "No pudimos obtener el listado de usuarios en este momento.",
});
