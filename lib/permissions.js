/*
 * VEDAM HOMES — SHARED PERMISSIONS
 * ------------------------------------------------------------------
 * Single source of truth for what each dashboard role can do.
 * Dependency-free so it can be imported by both server and client.
 */

export const ROLE_PERMISSIONS = {
  "Super Admin": { content: true, projects: true, team: true, queries: true },
  Admin: { content: true, projects: true, team: false, queries: true },
  Editor: { content: true, projects: true, team: false, queries: false },
  "Content Manager": { content: true, projects: false, team: false, queries: false },
};

export const TEAM_ROLES = Object.keys(ROLE_PERMISSIONS);

export const PERMISSION_LABELS = {
  content: "Articles, Blogs, Gallery & About",
  projects: "Projects",
  team: "Team Access",
  queries: "Queries",
};

/** Legacy shape `{ [role]: { label, permissions } }` used by mongoose models. */
export const ROLES = Object.fromEntries(
  Object.entries(ROLE_PERMISSIONS).map(([label, permissions]) => [
    label,
    { label, permissions },
  ])
);

export function hasPermission(role, permission) {
  if (!role) return false;
  if (role === "Super Admin") return true;
  const perms = ROLE_PERMISSIONS[role];
  return Boolean(perms && perms[permission]);
}

export const ADMIN_ROUTE_PERMISSIONS = {
  "/admin": null,
  "/admin/articles": "content",
  "/admin/blogs": "content",
  "/admin/gallery": "content",
  "/admin/about": "content",
  "/admin/projects": "projects",
  "/admin/team": "team",
  "/admin/queries": "queries",
};

export function permissionForPath(pathname) {
  const base = Object.keys(ADMIN_ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!base) return undefined;
  return ADMIN_ROUTE_PERMISSIONS[base];
}

export function canAccessPath(role, pathname) {
  const permission = permissionForPath(pathname);
  if (permission == null) return true;
  return hasPermission(role, permission);
}