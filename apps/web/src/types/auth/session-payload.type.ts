import type { JWTPayload } from "jose";

export type SessionPayload = JWTPayload & {
  userId: string;
  role: string;
  expiresAt: Date | string;
};
