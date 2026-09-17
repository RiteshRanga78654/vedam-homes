import jwt from "jsonwebtoken";

export const COOKIE_NAME = "vedam_admin_session";
export const SESSION_TTL = 60 * 60 * 12; // 12 hours (in seconds)

function secret() {
  return process.env.JWT_SECRET || process.env.ADMIN_SECRET || "vedam-homes-dev-secret";
}

/**
 * Sign a JWT. Used for the admin session cookie.
 */
export function signToken(payload) {
  return jwt.sign(payload, secret(), { expiresIn: SESSION_TTL });
}

/**
 * Verify a JWT. Returns the payload, or null if invalid/expired.
 */
export function verifyToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret());
  } catch {
    return null;
  }
}