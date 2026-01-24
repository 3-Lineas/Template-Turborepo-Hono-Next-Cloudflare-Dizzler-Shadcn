import { router } from '@/trpc';
import { authRouter } from '@/modules/auth/auth.router';
import { usersRouter } from '@/modules/users/users.router';

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
