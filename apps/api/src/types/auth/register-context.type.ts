import type { RegisterInput } from "./register-input.type";
import type { UserPublic } from "../users/user-public.type";

export interface RegisterContext {
  db: D1Database;
  input: RegisterInput;
  passwordHash?: string;
  user?: UserPublic;
}
