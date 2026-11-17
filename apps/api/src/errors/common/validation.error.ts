import { AppError } from "../app-error";

export class ValidationError extends AppError {
  constructor(
    message = "Por favor, revisa los datos ingresados e inténtalo de nuevo.",
    details?: Record<string, unknown>,
  ) {
    super({
      message,
      statusCode: 400,
      code: "VALIDATION_ERROR",
      silent: true,
      details,
    });
  }
}
