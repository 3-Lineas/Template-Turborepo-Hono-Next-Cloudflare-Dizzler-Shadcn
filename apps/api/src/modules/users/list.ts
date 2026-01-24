import { publicProcedure } from "../../trpc";
import { listUsersAction } from "../../actions/users/listUsers.action";

export const list = publicProcedure.query(async ({ ctx }) => {
  try {
    const result = await listUsersAction(ctx.db);
    return {
      success: true,
      message: "Hemos recuperado la lista de usuarios correctamente.",
      data: result,
    };
  } catch (e) {
    return {
      success: false,
      message: "No pudimos recuperar la lista de usuarios en este momento. Por favor, intenta recargar la página.",
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
});
