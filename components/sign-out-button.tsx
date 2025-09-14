"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/auth";
import { toast } from "sonner";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setIsLoading(true);

    try {
      const result = await signOutAction({});

      if (result?.data?.success) {
        toast.success("Signed out successfully", {
          description: "You have been signed out of your account.",
        });
        router.push("/auth/signin");
        router.refresh();
      } else {
        toast.error("Sign out failed", {
          description: "Please try again.",
        });
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
