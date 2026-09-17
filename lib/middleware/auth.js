import { getSession } from "../session.js";

/**
 * Simple JWT auth middleware for API route handlers.
 *
 * Usage inside a route handler:
 *   const session = await authenticate();
 *   if (!session) return unauthorized();
 */
export async function authenticate() {
  return await getSession();
}

/** Alias used by controllers to keep route files tiny. */
export async function guard() {
  return await getSession();
}