import { AppError } from "./app-error";

/**
 * Thrown when a requested resource is not found.
 */
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super({ message, statusCode: 404, code: "NOT_FOUND" });
    this.name = "NotFoundError";
  }
}
