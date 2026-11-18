import { logger } from "@3lineas/groovepack/logger";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { normalizeError } from "./normalize-error";
import type { ActionResponse } from "../../types/common/action-response.type";
import type { AppContext } from "../../types/context/app-context.type";

export function globalErrorHandler(err: Error, ctx: AppContext) {
  const appError = normalizeError(err);

  if (!appError.silent) {
    logger.error(`Unhandled error [${appError.code}]: ${appError.message}`, {
      statusCode: appError.statusCode,
      details: appError.details,
    });
  }

  const body: ActionResponse<never> = {
    success: false,
    message: appError.message,
    error: appError.message,
    code: appError.code,
  };

  return ctx.json(body, appError.statusCode as ContentfulStatusCode);
}
