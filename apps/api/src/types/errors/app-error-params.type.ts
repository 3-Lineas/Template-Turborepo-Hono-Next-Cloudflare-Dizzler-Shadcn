export interface AppErrorParams {
  message: string;
  statusCode: number;
  code: string;
  silent?: boolean;
  details?: Record<string, unknown>;
}
