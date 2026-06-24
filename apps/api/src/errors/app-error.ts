import { Logger } from "@repo/logger";

/**
 * Options for configuring AppError behavior.
 */
export interface AppErrorParams {
  /** User-facing friendly message in Spanish. */
  message: string;
  /** HTTP status code. */
  statusCode?: number;
  /** Unique textual error code. */
  code?: string;
  /** Additional error context details */
  details?: any;
  /**
   * When true, suppresses automatic warn logging on construction.
   * Use this for expected business flows (e.g. duplicate email, already exists)
   * that are normal user behavior and should not produce log noise.
   */
  silent?: boolean;
}

/**
 * Base class for all application-specific business logic errors.
 * Automatically logs its own instantiation using the shared Logger.
 */
export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor({
    message,
    statusCode = 400,
    code = "BAD_REQUEST",
    details,
    silent = false,
  }: AppErrorParams) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    if (silent) return;

    // Automatically log the application error occurrence at the point of creation
    const logger = new Logger(`API:Error:${this.name}`);
    logger.warn(`${code}: ${message}`, { details });
  }
}
