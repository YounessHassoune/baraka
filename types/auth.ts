import type { UserRole } from "@/lib/constants";

export type { UserRole };

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  isLoggedIn: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface SignInData {
  email: string;
  password: string;
}
