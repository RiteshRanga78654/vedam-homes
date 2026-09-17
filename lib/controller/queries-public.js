import { useDb } from "../config/db.js";
import Query from "../models/Query.js";
import { ok, bad, dbDown } from "../api.js";
import { logActivity } from "../store.js";

/**
 * Public contact form → saves a query. No auth needed.
 */
export async function submitQuery(request) {
  if (!(await useDb())) return dbDown("Database not connected. Set MONGO_URI in .env.local");
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !email) return bad("Name and email are required");

  try {
    const doc = await Query.create({
      name,
      email,
      phone: (body.phone || "").trim(),
      message: (body.message || "").trim(),
      interest: (body.interest || body.keyRequest || "General inquiry").trim(),
      relatedProject: (body.relatedProject || "").trim(),
      source: (body.source || "Website").trim(),
      status: "New",
    });
    await logActivity({ type: "query", action: "received", title: doc.name, detail: `${doc.interest} · ${doc.email}` });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}