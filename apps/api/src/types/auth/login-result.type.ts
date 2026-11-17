import type { UserPublic } from "../users/user-public.type";

export interface LoginResult {
  token: string;
  user: UserPublic;
}
