import { logger } from "@3lineas/groovepack/logger";
import type { AppErrorParams } from "../types/errors/app-error-params.type";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly silent: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(params: AppErrorParams) {
    super(params.message);
    this.name = new.target.name;
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.silent = params.silent ?? false;
    this.details = params.details;

    if (!this.silent) {
      logger.error(`[${this.code}] ${this.message}`, {
        statusCode: this.statusCode,
        details: this.details,
      });
    }
  }
}
