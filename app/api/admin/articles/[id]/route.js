import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getArticles, saveArticles, logActivity, slugify } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function PATCH(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request body");
  }

  const list = getArticles();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) return bad("Article not found", 404);

  const prev = list[index];
  const next = {
    ...prev,
    ...body,
    id: prev.id,
    slug: body.title !== prev.title ? slugify(body.title) : prev.slug,
    updatedAt: now(),
  };
  if (next.status === "published" && !prev.publishedAt) {
    next.publishedAt = now();
  }

  list[index] = next;
  saveArticles(list);

  if (body.status && body.status !== prev.status) {
    logActivity({
      type: "article",
      action: body.status === "published" ? "published" : "unpublished",
      title: next.title,
      detail: next.category,
    });
  } else {
    logActivity({ type: "article", action: "updated", title: next.title, detail: next.category });
  }

  return ok(next);
}

export async function DELETE(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  const list = getArticles();
  const article = list.find((a) => a.id === id);
  if (!article) return bad("Article not found", 404);

  const next = list.filter((a) => a.id !== id);
  saveArticles(next);
  logActivity({ type: "article", action: "deleted", title: article.title, detail: next.length ? "" : "" });

  return ok({ id });
}