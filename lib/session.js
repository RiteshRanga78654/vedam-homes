import { cookies } from "next/headers";
import { COOKIE_NAME, SESSION_TTL, signToken, verifyToken } from "./auth-token";

const CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@vedamhomes.com",
  password: process.env.ADMIN_PASSWORD || "vedamhomes",
  name: "Vedam Studio",
  role: "Super Admin",
};

export function adminCredentials() {
  return CREDENTIALS;
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

export async function createSession() {
  const payload = {
    email: CREDENTIALS.email,
    name: CREDENTIALS.name,
    role: CREDENTIALS.role,
    exp: Date.now() + SESSION_TTL * 1000,
  };
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

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function requireAdmin() {
  return getSession();
}