import { AppError } from "../app-error";

export class InvalidCredentialsError extends AppError {
  constructor(
    message = "El correo o la contraseña no coinciden. Por favor, verifica tus datos.",
  ) {
    super({
      message,
      statusCode: 401,
      code: "INVALID_CREDENTIALS",
      silent: true,
    });
  }
}
