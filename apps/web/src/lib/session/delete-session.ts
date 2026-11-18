import "server-only";
import { cookies } from "next/headers";
import { COOKIE_SESSION } from "@/constants/cookies";

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_SESSION);
}
