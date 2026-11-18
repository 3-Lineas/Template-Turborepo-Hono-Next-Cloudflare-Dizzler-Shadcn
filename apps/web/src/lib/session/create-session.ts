import "server-only";
import { cookies } from "next/headers";
import { COOKIE_SESSION } from "@/constants/cookies";
import { encryptSession } from "@/lib/session/encrypt-session";

export async function createSession(
  userId: string,
  role: string = "user",
): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encryptSession({ userId, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_SESSION, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
