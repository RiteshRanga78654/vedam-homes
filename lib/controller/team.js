import { useDb } from "../config/db.js";
import Team from "../models/Team.js";
import { ok, bad, dbDown } from "../api.js";
import { logActivity } from "../store.js";

async function ready() {
  return await useDb();
}

export async function listTeam() {
  if (!(await ready())) return dbDown();
  const items = await Team.find().sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function createTeamMember(request) {
  if (!(await ready())) return dbDown();
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body.name || !body.email) return bad("Name and email are required");
  try {
    const doc = await Team.create(body);
    await logActivity({ type: "team", action: "added", title: doc.name, detail: doc.role });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}

export async function updateTeamMember(request, { params }) {
  if (!(await ready())) return dbDown();
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const doc = await Team.findOneAndUpdate({ id }, body, { runValidators: true, returnDocument: "after" });
  if (!doc) return bad("Member not found", 404);
  await logActivity({ type: "team", action: "updated", title: doc.name });
  return ok(doc.toObject());
}

export async function removeTeamMember(id) {
  if (!(await ready())) return dbDown();
  const doc = await Team.findOne({ id });
  if (!doc) return bad("Member not found", 404);
  await Team.deleteOne({ id });
  await logActivity({ type: "team", action: "removed", title: doc.name });
  return ok({ deleted: true });
}