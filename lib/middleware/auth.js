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

/**
 * Alias used by controllers to keep route files tiny.
 */
export async function guard() {
  return await getSession();
}

/**
 * Check if session has required role (for role-based routes).
 * @param {string} requiredRole - e.g. "Super Admin", "Admin", etc.
 */
export async function requireRole(requiredRole) {
  const session = await getSession();
  if (!session) return false;

  const isAllowed =
    session.role === "Super Admin" ||
    session.role === requiredRole;

  return isAllowed;
}

/**
 * Check if session has required permission.
 * @param {string} permission - The permission key to check
 */
export async function requirePermission(permission) {
  const session = await getSession();
  if (!session) return false;

  // Super Admin can do everything
  if (session.role === "Super Admin") return true;

  const role = {
    "Super Admin": { content: true, projects: true, team: true, queries: true },
    Admin: { content: true, projects: true, team: false, queries: true },
    Editor: { content: true, projects: true, team: false, queries: false },
    "Content Manager": { content: true, projects: false, team: false, queries: false },
  }[session.role];

  return role && role[permission] === true;
}