import { cookies } from "next/headers";
import { COOKIE_NAME, SESSION_TTL, signToken, verifyToken } from "./auth-token.js";

/**
 * Read the logged-in admin session from the JWT cookie.
 * Returns the decoded payload, or null.
 */
export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

/**
 * Sign a fresh JWT and store it in the httpOnly cookie.
 */
export async function createSession(payload) {
  const token = signToken(payload);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
  return payload;
}

/**
 * Clear the session cookie (logout).
 */
export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/**
 * Fallback credentials when no admin has been seeded yet (or env override).
 */
export function adminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@vedamhomes.com",
    password: process.env.ADMIN_PASSWORD || "vedamhomes",
    name: "Vedam Studio",
    role: "Super Admin",
  };
}