import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    // Return a generic error message to avoid leaking sensitive information
    return "An unexpected error occurred. Please try again.";
  },
});
