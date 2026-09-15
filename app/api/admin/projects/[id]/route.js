import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getProjects, saveProjects, logActivity, slugify } from "@/lib/store";

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

  const list = getProjects();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return bad("Project not found", 404);

  const prev = list[index];
  const next = {
    ...prev,
    ...body,
    id: prev.id,
    slug: body.name && body.name !== prev.name ? slugify(body.name) : prev.slug,
    updatedAt: now(),
  };

  list[index] = next;
  saveProjects(list);

  logActivity({ type: "project", action: "updated", title: next.name, detail: next.location });

  return ok(next);
}

export async function DELETE(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  const list = getProjects();
  const project = list.find((p) => p.id === id);
  if (!project) return bad("Project not found", 404);

  saveProjects(list.filter((p) => p.id !== id));
  logActivity({ type: "project", action: "deleted", title: project.name, detail: project.location });

  return ok({ id });
}