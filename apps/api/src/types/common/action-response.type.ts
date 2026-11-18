import type { ActionResponse as BaseActionResponse } from "@3lineas/groovepack/api-action";

export interface ActionResponse<T = unknown> extends BaseActionResponse<T> {
  code?: string;
  details?: Record<string, unknown>;
}
