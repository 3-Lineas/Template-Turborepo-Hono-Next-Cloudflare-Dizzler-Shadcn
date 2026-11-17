import { AppError } from "../app-error";

export class InternalServerError extends AppError {
  constructor(
    message = "Tuvimos un inconveniente inesperado en el servidor. Por favor, intenta nuevamente en unos momentos.",
    details?: Record<string, unknown>,
  ) {
    super({
      message,
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      silent: false,
      details,
    });
  }
}
