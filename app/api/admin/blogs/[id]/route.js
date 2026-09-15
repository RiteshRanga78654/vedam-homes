import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getBlogs, saveBlogs, logActivity, slugify } from "@/lib/store";

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

  const list = getBlogs();
  const index = list.findIndex((b) => b.id === id);
  if (index === -1) return bad("Blog not found", 404);

  const prev = list[index];
  const next = {
    ...prev,
    ...body,
    id: prev.id,
    slug: body.title !== prev.title ? slugify(body.title) : prev.slug,
    updatedAt: now(),
  };

  list[index] = next;
  saveBlogs(list);

  if (body.status && body.status !== prev.status) {
    logActivity({
      type: "blog",
      action: body.status === "published" ? "published" : "unpublished",
      title: next.title,
      detail: next.category,
    });
  } else {
    logActivity({ type: "blog", action: "updated", title: next.title, detail: next.category });
  }

  return ok(next);
}

export async function DELETE(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  const list = getBlogs();
  const blog = list.find((b) => b.id === id);
  if (!blog) return bad("Blog not found", 404);

  saveBlogs(list.filter((b) => b.id !== id));
  logActivity({ type: "blog", action: "deleted", title: blog.title, detail: blog.category });

  return ok({ id });
}