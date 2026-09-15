import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getBlogs, saveBlogs, logActivity, uid, slugify } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getBlogs());
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
    content: (body.content || "").trim(),
    image: body.image || "",
    author: body.author || "Vedam Studio",
    category: body.category || "Company",
    status: body.status || "draft",
    createdAt: now(),
    updatedAt: now(),
  };

  const list = getBlogs();
  list.unshift(record);
  saveBlogs(list);

  logActivity({
    type: "blog",
    action: body.status === "published" ? "published" : "created",
    title: record.title,
    detail: record.category,
  });

  return ok(record, 201);
}