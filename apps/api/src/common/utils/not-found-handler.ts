import type { Context } from "hono";
import type { ActionResponse } from "../../types/common/action-response.type";

export function notFoundHandler(ctx: Context) {
  const body: ActionResponse<never> = {
    success: false,
    message:
      "El recurso solicitado no se encuentra disponible. Por favor, intenta nuevamente.",
    error:
      "El recurso solicitado no se encuentra disponible. Por favor, intenta nuevamente.",
    code: "NOT_FOUND",
  };

  return ctx.json(body, 404);
}
