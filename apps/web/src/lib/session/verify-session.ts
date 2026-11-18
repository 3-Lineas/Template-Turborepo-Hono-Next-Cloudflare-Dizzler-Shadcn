import "server-only";
import { cookies } from "next/headers";
import { COOKIE_SESSION } from "@/constants/cookies";
import { decryptSession } from "@/lib/session/decrypt-session";
import type { SessionState } from "@/types/auth/session-state.type";

export async function verifySession(): Promise<SessionState> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_SESSION)?.value;
  const session = await decryptSession(cookie);

  if (!session?.userId) {
    return { isAuth: false };
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: session.role,
  };
}
