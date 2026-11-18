import { AppError } from "@3lineas/groovepack/errors";
import { internalServerError } from "../../errors/common/internal-server.error";

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return internalServerError(
      "Tuvimos un inconveniente inesperado en el servidor. Por favor, intenta nuevamente en unos momentos.",
      { originalMessage: error.message },
    );
  }

  return internalServerError();
}
