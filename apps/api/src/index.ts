import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";
import { createContext, Env } from "./context";

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (opts, c) => createContext(opts, c.env),
  }),
);

export default app;
