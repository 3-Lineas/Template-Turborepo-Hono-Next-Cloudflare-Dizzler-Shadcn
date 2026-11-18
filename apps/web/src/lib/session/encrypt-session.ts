import { SignJWT } from "jose";
import type { SessionPayload } from "@/types/auth/session-payload.type";

export async function encryptSession(payload: SessionPayload): Promise<string> {
  const secretKey =
    process.env.SESSION_SECRET || "dev-secret-key-at-least-32-chars-long";
  const encodedKey = new TextEncoder().encode(secretKey);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}
