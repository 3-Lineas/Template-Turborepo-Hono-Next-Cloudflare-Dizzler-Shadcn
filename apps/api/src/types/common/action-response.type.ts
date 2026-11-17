export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
  details?: Record<string, unknown>;
}
