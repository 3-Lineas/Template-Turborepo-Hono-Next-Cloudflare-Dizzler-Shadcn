import type { LoginInput } from "./login-input.type";
import type { LoginResult } from "./login-result.type";
import type { UserRow } from "../users/user-row.type";

export interface LoginContext {
  db: D1Database;
  jwtSecret: string | undefined;
  input: LoginInput;
  user?: UserRow;
  token?: string;
  result?: LoginResult;
}
