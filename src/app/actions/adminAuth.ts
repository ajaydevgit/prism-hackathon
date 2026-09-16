"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    return { success: true };
  }
  
  return { success: false };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
}
