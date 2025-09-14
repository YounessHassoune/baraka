import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "@/types/auth";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required");
}

const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "baraka-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export async function getSession(): Promise<SessionData | null> {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    if (!session.isLoggedIn) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export async function createSession(userData: Omit<SessionData, "isLoggedIn">) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.userId = userData.userId;
  session.email = userData.email;
  session.name = userData.name;
  session.isLoggedIn = true;

  await session.save();
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  session.destroy();
}
