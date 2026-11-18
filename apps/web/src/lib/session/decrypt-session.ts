import { jwtVerify } from "jose";
import type { SessionPayload } from "@/types/auth/session-payload.type";

export async function decryptSession(
  session: string | undefined = "",
): Promise<SessionPayload | null> {
  if (!session) {
    return null;
  }

  const secretKey =
    process.env.SESSION_SECRET || "dev-secret-key-at-least-32-chars-long";
  const encodedKey = new TextEncoder().encode(secretKey);

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
