import { AppError } from "./app-error";

/**
 * Thrown when credentials validation fails or user session is unauthorized.
 */
export class AuthenticationError extends AppError {
  constructor(message = "Credenciales incorrectas") {
    super({ message, statusCode: 401, code: "UNAUTHORIZED" });
    this.name = "AuthenticationError";
  }
}
