import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If user is already authenticated, redirect to home
  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}
