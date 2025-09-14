import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types/auth";

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return session;
}

export async function requireRole(role: UserRole) {
  const session = await requireAuth();

  if (session.role !== role) {
    redirect("/");
  }

  return session;
}

export async function requireSeller() {
  return requireRole("seller");
}

export async function requireBuyer() {
  return requireRole("buyer");
}
