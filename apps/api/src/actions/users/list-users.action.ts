import type { UserPublic } from "../../types/users/user-public.type";

export async function listUsersAction(db: D1Database): Promise<UserPublic[]> {
  const { results } = await db
    .prepare(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC",
    )
    .all<UserPublic>();

  return results ?? [];
}
