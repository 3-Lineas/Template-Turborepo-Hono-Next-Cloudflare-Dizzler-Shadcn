import { Hono } from "hono";
import { listUsersAction } from "../../actions/users/listUsers.action";
import { Env, CustomVars } from "../../context";

export const listRouter = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>().get("/", async (ctx) => {
  const db = ctx.get("db");
  const result = await listUsersAction(db);

  return ctx.json({
    success: true,
    message: "Hemos recuperado la lista de usuarios correctamente.",
    data: result,
  });
});
