import { useDb } from "../config/db.js";
import Project from "../models/Project.js";
import { ok, bad, dbDown } from "../api.js";
import { logActivity } from "../store.js";

async function ready() {
  return await useDb();
}

export async function listProjects() {
  if (!(await ready())) return dbDown();
  const items = await Project.find().sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function createProject(request) {
  if (!(await ready())) return dbDown();
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body.name) return bad("Project name is required");
  try {
    const doc = await Project.create(body);
    await logActivity({ type: "project", action: "created", title: doc.name, detail: doc.location });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}

export async function updateProject(request, { params }) {
  if (!(await ready())) return dbDown();
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const doc = await Project.findOneAndUpdate({ id }, body, { runValidators: true, returnDocument: "after" });
  if (!doc) return bad("Project not found", 404);
  await logActivity({ type: "project", action: "updated", title: doc.name });
  return ok(doc.toObject());
}

export async function removeProject(id) {
  if (!(await ready())) return dbDown();
  const doc = await Project.findOne({ id });
  if (!doc) return bad("Project not found", 404);
  await Project.deleteOne({ id });
  await logActivity({ type: "project", action: "deleted", title: doc.name });
  return ok({ deleted: true });
}