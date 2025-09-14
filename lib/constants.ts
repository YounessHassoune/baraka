// User roles constant for validation and type checking
export const USER_ROLES = ["buyer", "seller"] as const;

// Export the type derived from the constant
export type UserRole = (typeof USER_ROLES)[number];
