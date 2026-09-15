import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getTeam, saveTeam, logActivity } from "@/lib/store";

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

  const list = getTeam();
  const index = list.findIndex((m) => m.id === id);
  if (index === -1) return bad("Member not found", 404);

  const prev = list[index];
  const next = { ...prev, ...body, id: prev.id };
  if (next.status === "Active" && prev.status !== "Active") {
    next.lastActive = now();
  }
  if (body.permissions) next.permissions = body.permissions;

  list[index] = next;
  saveTeam(list);

  logActivity({
    type: "team",
    action: body.role && body.role !== prev.role ? "role-updated" : "updated",
    title: next.name,
    detail: `${next.role} · ${next.status}`,
  });

  return ok(next);
}

export async function DELETE(request, { params }) {
  if (!(await guard())) return unauthorized();
  const { id } = await params;
  const list = getTeam();
  const member = list.find((m) => m.id === id);
  if (!member) return bad("Member not found", 404);

  saveTeam(list.filter((m) => m.id !== id));
  logActivity({ type: "team", action: "removed", title: member.name, detail: member.role });

  return ok({ id });
}