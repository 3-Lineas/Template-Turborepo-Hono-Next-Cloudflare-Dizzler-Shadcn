import { router } from "@/trpc";
import { list } from "./list";

export const usersRouter = router({
  list,
});
