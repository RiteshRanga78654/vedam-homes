import { useDb } from "../config/db.js";
import Blog from "../models/Blog.js";
import { ok, bad, dbDown } from "../api.js";
import { logActivity } from "../store.js";

async function ready() {
  return await useDb();
}

export async function listBlogs() {
  if (!(await ready())) return dbDown();
  const items = await Blog.find().sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function createBlog(request) {
  if (!(await ready())) return dbDown();
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body.title) return bad("Title is required");
  try {
    const doc = await Blog.create(body);
    await logActivity({ type: "blog", action: "created", title: doc.title, detail: doc.category });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}

export async function updateBlog(request, { params }) {
  if (!(await ready())) return dbDown();
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const doc = await Blog.findOneAndUpdate({ id }, body, { runValidators: true, returnDocument: "after" });
  if (!doc) return bad("Blog not found", 404);
  await logActivity({ type: "blog", action: "updated", title: doc.title });
  return ok(doc.toObject());
}

export async function removeBlog(id) {
  if (!(await ready())) return dbDown();
  const doc = await Blog.findOne({ id });
  if (!doc) return bad("Blog not found", 404);
  await Blog.deleteOne({ id });
  await logActivity({ type: "blog", action: "deleted", title: doc.title });
  return ok({ deleted: true });
}