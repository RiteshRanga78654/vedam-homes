import { useDb } from "../config/db.js";
import Query from "../models/Query.js";
import { ok, bad, dbDown } from "../api.js";
import { logActivity } from "../store.js";

async function ready() {
  return await useDb();
}

export async function listQueries() {
  if (!(await ready())) return dbDown();
  const items = await Query.find().sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function updateQuery(request, { params }) {
  if (!(await ready())) return dbDown();
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const doc = await Query.findOneAndUpdate({ id }, body, { runValidators: true, returnDocument: "after" });
  if (!doc) return bad("Query not found", 404);
  if (body.status) {
    await logActivity({ type: "query", action: `marked ${body.status}`, title: doc.name });
  }
  return ok(doc.toObject());
}

export async function removeQuery(id) {
  if (!(await ready())) return dbDown();
  const doc = await Query.findOne({ id });
  if (!doc) return bad("Query not found", 404);
  await Query.deleteOne({ id });
  await logActivity({ type: "query", action: "deleted", title: doc.name });
  return ok({ deleted: true });
}