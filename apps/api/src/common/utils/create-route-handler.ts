import * as v from "valibot";
import type { BaseIssue, BaseSchema, InferOutput } from "valibot";
import { getD1 } from "../../lib/d1/get-d1";
import type { ActionResponse } from "../../types/common/action-response.type";
import type { RouteHandlerOptions } from "../../types/common/route-handler-options.type";
import type { RouteHandlerParams } from "../../types/common/route-handler-params.type";
import type { AppContext } from "../../types/context/app-context.type";

export function createRouteHandler<
  TResult,
  TOutputSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | undefined = undefined,
>(
  handler: (params: RouteHandlerParams) => Promise<TResult>,
  options: RouteHandlerOptions<TOutputSchema> = {},
) {
  return async (ctx: AppContext) => {
    const db = ctx.get("db") ?? getD1();

    const rawData = await handler({ db, ctx });

    type ResolvedData = TOutputSchema extends BaseSchema<
      unknown,
      unknown,
      BaseIssue<unknown>
    >
      ? InferOutput<TOutputSchema>
      : TResult;

    const data = (
      options.outputSchema
        ? v.parse(options.outputSchema, rawData)
        : rawData
    ) as ResolvedData;

    const payload: ActionResponse<ResolvedData> = {
      success: true,
      data,
      ...(options.message ? { message: options.message } : {}),
    };

    const status = options.status ?? 200;
    return ctx.json(payload, status);
  };
}
