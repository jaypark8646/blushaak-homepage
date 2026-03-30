import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "blushaak_admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function createAdminCookieValue(password: string) {
  return crypto.createHash("sha256").update(`blushaak-admin:${password}`).digest("hex");
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export async function isAdminAuthenticated() {
  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === createAdminCookieValue(adminPassword);
}

export async function loginAdmin(password: string) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || password !== adminPassword) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminCookieValue(adminPassword), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
