import type { UserItem } from "@/types/users/user-item.type";

export type LoginResult = {
  token: string;
  user: UserItem;
};
