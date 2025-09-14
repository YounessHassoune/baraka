import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Baraka</h1>
          <SignOutButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Welcome back, {session.name}!
          </h2>
          <p className="text-muted-foreground mb-6">
            You are successfully authenticated and logged into your account.
          </p>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Session Information</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">User ID:</span> {session.userId}
              </p>
              <p>
                <span className="font-medium">Email:</span> {session.email}
              </p>
              <p>
                <span className="font-medium">Name:</span> {session.name}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                <span className="capitalize bg-primary/10 px-2 py-1 rounded-md">
                  {session.role}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
