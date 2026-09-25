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

function normalize(body = {}) {
  return {
    src: body.src || "",
    title: body.title || "",
    category: body.category || "Architecture",
    size: body.size || "regular",
    order: typeof body.order === "number" ? body.order : 0,
  };
}

export async function listGallery() {
  if (await ready()) {
    const items = await Gallery.find().sort({ order: 1, createdAt: 1 }).lean();
    return ok(items);
  }
  // Fallback: file-backed store keeps the gallery usable without Mongo.
  const items = [...getGallery()].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  return ok(items);
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
  if (!data.src) return bad("An image is required");

  try {
    if (await ready()) {
      const count = await Gallery.countDocuments();
      const doc = await Gallery.create({ ...data, order: data.order || count });
      await logActivity({ type: "gallery", action: "added", title: doc.title || "Image" });
      return ok(doc.toObject(), 201);
    }
    const items = getGallery();
    const doc = { id: uid(), ...data, order: data.order || items.length, createdAt: new Date().toISOString() };
    saveGallery([...items, doc]);
    await logActivity({ type: "gallery", action: "added", title: doc.title || "Image" });
    return ok(doc, 201);
  } catch (err) {
    return bad(err.message, 400);
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

  if (await ready()) {
    const doc = await Gallery.findOneAndUpdate({ id }, body, {
      runValidators: true,
      returnDocument: "after",
    });
    if (!doc) return bad("Image not found", 404);
    await logActivity({ type: "gallery", action: "updated", title: doc.title || "Image" });
    return ok(doc.toObject());
  }

  const items = getGallery();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return bad("Image not found", 404);
  items[index] = { ...items[index], ...body, id };
  saveGallery(items);
  await logActivity({ type: "gallery", action: "updated", title: items[index].title || "Image" });
  return ok(items[index]);
}

export async function removeGalleryItem(id) {
  const { error } = await guardContent();
  if (error) return error;

  if (await ready()) {
    const doc = await Gallery.findOne({ id });
    if (!doc) return bad("Image not found", 404);
    await Gallery.deleteOne({ id });
    await logActivity({ type: "gallery", action: "deleted", title: doc.title || "Image" });
    return ok({ deleted: true });
  }

  const items = getGallery();
  const doc = items.find((i) => i.id === id);
  if (!doc) return bad("Image not found", 404);
  saveGallery(items.filter((i) => i.id !== id));
  await logActivity({ type: "gallery", action: "deleted", title: doc.title || "Image" });
  return ok({ deleted: true });
}