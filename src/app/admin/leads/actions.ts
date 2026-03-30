"use server";

import { redirect } from "next/navigation";
import { loginAdmin, logoutAdmin } from "@/lib/adminAuth";

export async function submitAdminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const isAuthenticated = await loginAdmin(password);

  if (!isAuthenticated) {
    redirect("/admin/leads?error=invalid_password");
  }

  redirect("/admin/leads");
}

export async function submitAdminLogout() {
  await logoutAdmin();
  redirect("/admin/leads");
}
