import { useDb } from "../config/db.js";
import Article from "../models/Article.js";
import { ok, bad, dbDown, unauthorized } from "../api.js";
import { logActivity } from "../store.js";
import { authenticate } from "../middleware/auth";

async function ready() {
  return await useDb();
}

export async function listArticles() {
  if (!(await ready())) return dbDown();
  const items = await Article.find().sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function createArticle(request) {
  if (!(await ready())) return dbDown();

  const session = await authenticate();
  if (!session) return unauthorized();

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!body.title) return bad("Title is required");
  if (!body.content) return bad("Content is required");

  try {
    const doc = await Article.create({
      title: body.title,
      excerpt: body.excerpt || "",
      image: body.image || "",
      category: body.category || "Real Estate",
      author: body.author || "Vedam Studio",
      authorRole: body.authorRole || "",
      readingTime: body.readingTime || "3 min read",
      popular: body.popular || false,
      status: body.status || "draft",
      content: body.content,
    });
    await logActivity({ type: "article", action: "created", title: doc.title, detail: doc.category });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}

export async function updateArticle(request, { params }) {
  if (!(await ready())) return dbDown();

  const session = await authenticate();
  if (!session) return unauthorized();

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const doc = await Article.findOneAndUpdate({ id }, body, {
    runValidators: true,
    returnDocument: "after",
  });
  if (!doc) return bad("Article not found", 404);
  await logActivity({ type: "article", action: "updated", title: doc.title });
  return ok(doc.toObject());
}

export async function removeArticle(id) {
  if (!(await ready())) return dbDown();

  const session = await authenticate();
  if (!session) return unauthorized();

  const doc = await Article.findOne({ id });
  if (!doc) return bad("Article not found", 404);
  await Article.deleteOne({ id });
  await logActivity({ type: "article", action: "deleted", title: doc.title });
  return ok({ deleted: true });
}