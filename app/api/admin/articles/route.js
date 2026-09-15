import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getArticles, saveArticles, logActivity, uid, slugify } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getArticles());
}

export async function POST(request) {
  if (!(await guard())) return unauthorized();
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request body");
  }
  if (!body.title || !body.title.trim()) return bad("Title is required");

  const id = uid();
  const record = {
    id,
    slug: slugify(body.title),
    title: body.title.trim(),
    excerpt: (body.excerpt || "").trim(),
    image: body.image || "",
    category: body.category || "Real Estate",
    author: body.author || "Vedam Studio",
    authorRole: body.authorRole || "",
    readingTime: body.readingTime || "3 min read",
    featured: !!body.featured,
    popular: !!body.popular,
    status: body.status || "draft",
    publishedAt: body.status === "published" ? now() : null,
    updatedAt: now(),
    content: Array.isArray(body.content) ? body.content : [],
  };

  const list = getArticles();
  list.unshift(record);
  saveArticles(list);

  logActivity({
    type: "article",
    action: body.status === "published" ? "published" : "created",
    title: record.title,
    detail: record.category,
  });

  return ok(record, 201);
}