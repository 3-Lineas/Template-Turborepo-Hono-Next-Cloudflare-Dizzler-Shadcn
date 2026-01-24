import { publicProcedure } from "@/trpc";
import { z } from "zod";
import { registerUserAction } from "@/actions/auth/registerUser.action";

export const register = publicProcedure
  .input(
    z.object({
      name: z.string().min(2),
      email: z.email(),
      password: z.string().min(6),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const result = await registerUserAction(ctx.db, input);

      return {
        success: true,
        message:
          "¡Bienvenido/a a bordo! Tu cuenta ha sido creada exitosamente. Estamos felices de tenerte aquí.",
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message:
          e instanceof Error && e.message === "El usuario ya existe"
            ? "Vaya, parece que este correo electrónico ya está registrado. ¿Quizás quisiste iniciar sesión?"
            : "Tuvimos un pequeño problema al crear tu cuenta. Por favor, inténtalo de nuevo en unos momentos.",
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });
