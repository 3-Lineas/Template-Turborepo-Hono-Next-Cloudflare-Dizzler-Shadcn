import { Hono } from "hono";
import { listUsersAction } from "../../actions/users/list-users.action";
import { createRouteHandler } from "../../common/utils/create-route-handler";
import { UsersListResponseDto } from "../../dtos/users/users-list-response.dto";
import type { CustomVars } from "../../types/context/custom-vars.type";
import type { Env } from "../../types/context/env.type";

export const listUsersRoute = new Hono<{
  Bindings: Env;
  Variables: CustomVars;
}>().get(
  "/list",
  createRouteHandler(
    async ({ db }) => {
      return listUsersAction(db);
    },
    {
      status: 200,
      outputSchema: UsersListResponseDto,
    },
  ),
);
