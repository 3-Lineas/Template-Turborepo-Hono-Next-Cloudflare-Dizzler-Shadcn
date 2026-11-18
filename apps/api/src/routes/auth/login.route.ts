import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { findUserByEmailAction } from "../../actions/auth/find-user-by-email.action";
import { generateAuthTokenAction } from "../../actions/auth/generate-auth-token.action";
import { sanitizeLoginInputAction } from "../../actions/auth/sanitize-login-input.action";
import { verifyUserPasswordAction } from "../../actions/auth/verify-user-password.action";
import { createRouteHandler } from "../../common/utils/create-route-handler";
import { validationHook } from "../../common/utils/validation-hook";
import { LoginDto } from "../../dtos/auth/login.dto";
import { LoginResponseDto } from "../../dtos/auth/login-response.dto";
import { internalServerError } from "../../errors/common/internal-server.error";
import { Pipeline } from "@3lineas/groovepack/pipeline";
import type { LoginContext } from "../../types/auth/login-context.type";
import type { CustomVars } from "../../types/context/custom-vars.type";
import type { Env } from "../../types/context/env.type";

export const loginRoute = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>().post(
  "/login",
  vValidator("json", LoginDto, validationHook),
  createRouteHandler(
    async ({ db, ctx }) => {
      const input = await ctx.req.json();
      const pipelineContext: LoginContext = {
        db,
        jwtSecret: ctx.env.JWT_SECRET,
        input,
      };

      const completed = await Pipeline.send(pipelineContext)
        .through([
          sanitizeLoginInputAction,
          findUserByEmailAction,
          verifyUserPasswordAction,
          generateAuthTokenAction,
        ])
        .then();

      if (!completed.result) {
        throw internalServerError(
          "No se pudo completar el inicio de sesión.",
        );
      }

      return completed.result;
    },
    {
      status: 200,
      message: "¡Bienvenido de vuelta!",
      outputSchema: LoginResponseDto,
    },
  ),
);
