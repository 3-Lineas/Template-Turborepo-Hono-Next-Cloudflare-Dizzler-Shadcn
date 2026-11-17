import { AppError } from "../app-error";

export class DuplicateEmailError extends AppError {
  constructor(
    message = "Ya existe una cuenta registrada con este correo electrónico. Intenta iniciar sesión.",
  ) {
    super({
      message,
      statusCode: 409,
      code: "DUPLICATE_EMAIL",
      silent: true,
    });
  }
}
