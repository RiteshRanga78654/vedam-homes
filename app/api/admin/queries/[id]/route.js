import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getQueries, saveQueries, logActivity } from "@/lib/store";

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

  const list = getQueries();
  const index = list.findIndex((q) => q.id === id);
  if (index === -1) return bad("Query not found", 404);

  const prev = list[index];
  const next = { ...prev, ...body, id: prev.id, updatedAt: now() };
  list[index] = next;
  saveQueries(list);

  if (body.status && body.status !== prev.status) {
    logActivity({
      type: "query",
      action: "status",
      title: `${next.name} → ${next.status}`,
      detail: next.interest,
    });
  }
  if (body.assignedTo !== undefined) {
    // placeholder for future assignment flow
  }

  return ok(next);
}

export async function DELETE(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  const list = getQueries();
  const query = list.find((q) => q.id === id);
  if (!query) return bad("Query not found", 404);

  saveQueries(list.filter((q) => q.id !== id));
  logActivity({ type: "query", action: "deleted", title: query.name, detail: query.interest });

  return ok({ id });
}