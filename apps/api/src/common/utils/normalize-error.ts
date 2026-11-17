import { AppError } from "../../errors/app-error";
import { InternalServerError } from "../../errors/common/internal-server.error";

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(
      "Tuvimos un inconveniente inesperado en el servidor. Por favor, intenta nuevamente en unos momentos.",
      { originalMessage: error.message },
    );
  }

  return new InternalServerError();
}
