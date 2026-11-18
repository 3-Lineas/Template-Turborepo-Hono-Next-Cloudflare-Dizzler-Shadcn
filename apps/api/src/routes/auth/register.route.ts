import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { ensureEmailAvailableAction } from "../../actions/auth/ensure-email-available.action";
import { hashUserPasswordAction } from "../../actions/auth/hash-user-password.action";
import { persistUserAction } from "../../actions/auth/persist-user.action";
import { sanitizeRegisterInputAction } from "../../actions/auth/sanitize-register-input.action";
import { createRouteHandler } from "../../common/utils/create-route-handler";
import { validationHook } from "../../common/utils/validation-hook";
import { RegisterDto } from "../../dtos/auth/register.dto";
import { UserResponseDto } from "../../dtos/users/user-response.dto";
import { internalServerError } from "../../errors/common/internal-server.error";
import { Pipeline } from "@3lineas/groovepack/pipeline";
import type { RegisterContext } from "../../types/auth/register-context.type";
import type { CustomVars } from "../../types/context/custom-vars.type";
import type { Env } from "../../types/context/env.type";

export const registerRoute = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>().post(
  "/register",
  vValidator("json", RegisterDto, validationHook),
  createRouteHandler(
    async ({ db, ctx }) => {
      const input = await ctx.req.json();

      const pipelineContext: RegisterContext = {
        db,
        input,
      };

      const completed = await Pipeline.send(pipelineContext)
        .through([
          sanitizeRegisterInputAction,
          ensureEmailAvailableAction,
          hashUserPasswordAction,
          persistUserAction,
        ])
        .then();

      if (!completed.user) {
        throw internalServerError("No se pudo completar el registro.");
      }

      return completed.user;
    },
    {
      status: 201,
      message: "¡Tu cuenta fue creada con éxito!",
      outputSchema: UserResponseDto,
    },
  ),
);
