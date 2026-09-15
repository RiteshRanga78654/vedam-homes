import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getTeam, saveTeam, logActivity, uid } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getTeam());
}

export async function POST(request) {
  if (!(await guard())) return unauthorized();
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request body");
  }
  if (!body.name || !body.name.trim()) return bad("Name is required");
  if (!body.email || !body.email.trim()) return bad("Email is required");

  const record = {
    id: uid(),
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    role: body.role || "Content Manager",
    status: body.status || "Active",
    lastActive: body.status === "Active" ? now() : null,
    createdAt: now(),
    permissions: body.permissions || null,
  };

  const list = getTeam();
  list.push(record);
  saveTeam(list);

  logActivity({ type: "team", action: "added", title: record.name, detail: record.role });

  return ok(record, 201);
}