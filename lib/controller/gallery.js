import { useDb } from "../config/db.js";
import Gallery from "../models/Gallery.js";
import { ok, bad, unauthorized } from "../api.js";
import { getGallery, saveGallery, logActivity, uid } from "../store.js";
import { authenticate } from "../middleware/auth";
import { hasPermission } from "../permissions.js";

async function ready() {
  return await useDb();
}

/** Gallery writes require the "content" permission. */
async function guardContent() {
  const session = await authenticate();
  if (!session) return { error: unauthorized() };
  if (!hasPermission(session.role, "content")) {
    return { error: bad("You do not have permission to manage the gallery", 403) };
  }
  return { session };
}

const SIZES = new Set(["regular", "wide", "tall"]);

function normalize(body = {}) {
  return {
    src: typeof body.src === "string" ? body.src.trim() : "",
    title: typeof body.title === "string" ? body.title.trim() : "",
    category: typeof body.category === "string" && body.category ? body.category : "Architecture",
    size: SIZES.has(body.size) ? body.size : "regular",
    order: Number.isFinite(body.order) ? body.order : null,
  };
}

/**
 * A gallery `src` is either a path served by this app or a Cloudinary
 * delivery URL. Anything else is rejected: next/image throws during render
 * on an unconfigured host, which takes the whole public page down with it.
 */
function srcError(src) {
  if (!src) return "An image is required";
  if (src.startsWith("/")) return null;
  if (/^https:\/\/res\.cloudinary\.com\//.test(src)) return null;
  if (/^https:\/\/images\.unsplash\.com\//.test(src)) return null;
  return "Image must be an uploaded file path or a Cloudinary URL";
}

export async function listGallery() {
  // Mongo is the primary source, but an empty `galleries` collection must not
  // make the dashboard look empty while the public /gallery page is happily
  // rendering the seeded images. getSiteGallery() falls back to the
  // file-backed store when Mongo has nothing, so the dashboard has to do the
  // same or the two views disagree.
  try {
    if (await ready()) {
      const items = await Gallery.find().sort({ order: 1, createdAt: 1 }).lean();
      if (items.length > 0) return ok(items);
      console.warn("[gallery] Mongo returned no images — serving the file store");
    }
  } catch (err) {
    console.error("[gallery] Mongo list failed, using the file store:", err.message);
  }

  // Fallback: file-backed store keeps the gallery usable without Mongo.
  try {
    const items = [...getGallery()].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    return ok(items);
  } catch (err) {
    console.error("[gallery] list failed:", err);
    return bad("Could not load the gallery. Check the database connection.", 500);
  }
}

export async function createGalleryItem(request) {
  const { error } = await guardContent();
  if (error) return error;

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const data = normalize(body);
  const invalid = srcError(data.src);
  if (invalid) return bad(invalid);

  try {
    if (await ready()) {
      const count = await Gallery.countDocuments();
      const doc = await Gallery.create({
        ...data,
        order: data.order ?? count,
      });
      await logActivity({ type: "gallery", action: "added", title: doc.title || "Image" });
      return ok(doc.toObject(), 201);
    }
    const items = getGallery();
    const doc = {
      id: uid(),
      ...data,
      order: data.order ?? items.length,
      createdAt: new Date().toISOString(),
    };
    saveGallery([...items, doc]);
    await logActivity({ type: "gallery", action: "added", title: doc.title || "Image" });
    return ok(doc, 201);
  } catch (err) {
    console.error("[gallery] create failed:", err);
    return bad(err.message || "Could not add the image", 400);
  }
}

export async function updateGalleryItem(request, { params }) {
  const { error } = await guardContent();
  if (error) return error;

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  // Run the body through normalize() so a client can only ever write the
  // five known fields. Passing the raw body to findOneAndUpdate allowed
  // mass assignment, including overwriting the record's own `id`.
  const data = normalize(body);
  const invalid = srcError(data.src);
  if (invalid) return bad(invalid);

  const patch = {
    src: data.src,
    title: data.title,
    category: data.category,
    size: data.size,
  };
  if (data.order !== null) patch.order = data.order;

  try {
    if (await ready()) {
      const doc = await Gallery.findOneAndUpdate({ id }, { $set: patch }, {
        runValidators: true,
        new: true,
      });
      if (!doc) return bad("Image not found", 404);
      await logActivity({ type: "gallery", action: "updated", title: doc.title || "Image" });
      return ok(doc.toObject());
    }

    const items = getGallery();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return bad("Image not found", 404);
    items[index] = { ...items[index], ...patch, id };
    saveGallery(items);
    await logActivity({ type: "gallery", action: "updated", title: items[index].title || "Image" });
    return ok(items[index]);
  } catch (err) {
    console.error("[gallery] update failed:", err);
    return bad(err.message || "Could not update the image", 400);
  }
}

export async function removeGalleryItem(id) {
  const { error } = await guardContent();
  if (error) return error;

  let removed;
  try {
    if (await ready()) {
      const doc = await Gallery.findOne({ id });
      if (!doc) return bad("Image not found", 404);
      await Gallery.deleteOne({ id });
      removed = doc;
    } else {
      const items = getGallery();
      const doc = items.find((i) => i.id === id);
      if (!doc) return bad("Image not found", 404);
      saveGallery(items.filter((i) => i.id !== id));
      removed = doc;
    }
  } catch (err) {
    console.error("[gallery] delete failed:", err);
    return bad("Could not remove the image", 500);
  }

  await logActivity({ type: "gallery", action: "deleted", title: removed.title || "Image" });
  return ok({ deleted: true });
}
