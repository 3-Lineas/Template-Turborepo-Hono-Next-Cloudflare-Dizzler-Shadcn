import * as v from "valibot";
import type { BaseIssue, BaseSchema } from "valibot";
import { validationError } from "../../errors/common/validation.error";

export function validationHook<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  result: v.SafeParseResult<TSchema> & { target: string },
  _ctx: unknown,
) {
  if (result.success) {
    return;
  }

  const flattened = v.flatten(result.issues);
  const firstIssue = result.issues[0];
  const message =
    firstIssue?.message ??
    "Por favor, revisa los datos ingresados e inténtalo de nuevo.";

  throw validationError(message, {
    target: result.target,
    nested: flattened.nested,
  });
}
