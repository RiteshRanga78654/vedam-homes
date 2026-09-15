import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getQueries, saveQueries, logActivity, uid } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getQueries());
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
    phone: body.phone || "",
    interest: body.interest || "General inquiry",
    relatedProject: body.relatedProject || "",
    message: body.message || "",
    source: body.source || "Admin entry",
    status: "New",
    createdAt: now(),
    updatedAt: now(),
  };

  const list = getQueries();
  list.unshift(record);
  saveQueries(list);

  logActivity({ type: "query", action: "received", title: record.name, detail: `${record.interest} · ${record.email}` });

  return ok(record, 201);
}