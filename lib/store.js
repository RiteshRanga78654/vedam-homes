import Activity from "./models/Activity.js";

/** Short unique id — looks nice in URLs and matches the old JSON store. */
export function uid() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

/** Turn any string into a url-safe slug. */
export function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Log an admin activity event (used on the overview dashboard). */
export async function logActivity({ type = "system", action = "updated", title = "", detail = "" }) {
  try {
    const { useDb } = await import("./config/db.js");
    if (await useDb()) {
      await Activity.create({ type, action, title, detail });
    }
  } catch (err) {
    console.error("logActivity failed:", err.message);
  }
}

/** Roles allowed in the system (kept in one place). */
export const ROLES = ["Super Admin", "Admin", "Editor", "Content Manager"];

/** Where uploaded images live. */
export const UPLOAD_DIR = "public/uploads";