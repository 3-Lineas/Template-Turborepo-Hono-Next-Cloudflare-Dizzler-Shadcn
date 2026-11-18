"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session/delete-session";

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
