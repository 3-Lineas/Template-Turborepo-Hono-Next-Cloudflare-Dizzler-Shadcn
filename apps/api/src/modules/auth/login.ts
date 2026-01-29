import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { loginUserAction } from "../../actions/auth/loginUser.action";

export const login = publicProcedure
  .input(z.object({ email: z.email(), password: z.string() }))
  .mutation(async ({ ctx, input }) => {
    try {
      const jwtSecret =
        ctx.env.JWT_SECRET || "super-secret-jwt-key-change-this";
      const result = await loginUserAction(ctx.db, input, jwtSecret);

      return {
        success: true,
        message:
          "¡Qué alegría verte de nuevo! Has iniciado sesión correctamente.",
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message:
          "No pudimos acceder a tu cuenta. Por favor, verifica que tu correo y contraseña sean correctos e inténtalo de nuevo.",
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });
