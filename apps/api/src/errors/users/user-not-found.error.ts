import { AppError } from "../app-error";

export class UserNotFoundError extends AppError {
  constructor(
    message = "No encontramos el usuario solicitado.",
  ) {
    super({
      message,
      statusCode: 404,
      code: "USER_NOT_FOUND",
      silent: true,
    });
  }
}
