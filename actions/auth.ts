"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { UserModel } from "@/lib/models/user";
import { createSession, destroySession } from "@/lib/session";
import dbConnect from "@/lib/mongodb";
import type { ActionResponse } from "@/types/actions";
import { USER_ROLES } from "@/lib/constants";

// Validation schemas
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(USER_ROLES, {
      message: "Role must be either buyer or seller",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Sign Up Action
export const signUpAction = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    try {
      await dbConnect();

      const { name, email, password, role } = parsedInput;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return {
          success: false,
          error: "User with this email already exists",
        };
      }

      // Create new user
      const user = new UserModel({
        name,
        email,
        password,
        role,
      });

      await user.save();

      // Create session
      await createSession({
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return {
        success: true,
        data: { message: "Account created successfully" },
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: "Failed to create account. Please try again.",
      };
    }
  });

// Sign In Action
export const signInAction = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    try {
      await dbConnect();

      const { email, password } = parsedInput;

      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Verify password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }

      // Create session
      await createSession({
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return {
        success: true,
        data: { message: "Signed in successfully" },
      };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: "Failed to sign in. Please try again.",
      };
    }
  });

// Sign Out Action
export const signOutAction = actionClient
  .inputSchema(z.object({}))
  .action(async (): Promise<ActionResponse> => {
    try {
      await destroySession();

      return {
        success: true,
        data: { message: "Signed out successfully" },
      };
    } catch (error) {
      console.error("Sign out error:", error);
      return {
        success: false,
        error: "Failed to sign out. Please try again.",
      };
    }
  });
