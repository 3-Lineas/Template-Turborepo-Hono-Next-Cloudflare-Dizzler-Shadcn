import type { BaseIssue, BaseSchema } from "valibot";

export interface RouteHandlerOptions<
  TOutputSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | undefined = undefined,
> {
  status?: 200 | 201 | 202;
  message?: string;
  outputSchema?: TOutputSchema;
}
