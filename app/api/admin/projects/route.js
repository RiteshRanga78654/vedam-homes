import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getProjects, saveProjects, logActivity, uid, slugify } from "@/lib/store";

function now() {
  return new Date().toISOString();
}

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getProjects());
}

export async function POST(request) {
  if (!(await guard())) return unauthorized();
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request body");
  }
  if (!body.name || !body.name.trim()) return bad("Project name is required");

  const id = uid();
  const nowIso = now();
  const record = {
    id,
    slug: slugify(body.name),
    name: body.name.trim(),
    location: body.location || "",
    type: body.type || "Residence",
    status: body.status || "Active",
    statusLabel: body.statusLabel || "",
    description: body.description || "",
    price: body.price || "On Request",
    image: body.image || "",
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    details: body.details || "",
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const list = getProjects();
  list.unshift(record);
  saveProjects(list);

  logActivity({ type: "project", action: "created", title: record.name, detail: record.location });

  return ok(record, 201);
}