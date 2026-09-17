import { useDb } from "../config/db.js";
import About from "../models/About.js";
import { ok, bad, dbDown } from "../api.js";

/**
 * About is a single document. We always keep one around so the
 * admin editor has something to load on first visit.
 */
async function getOrCreate() {
  const docs = await About.find().sort({ createdAt: 1 }).lean();

  // Old JSON-store docs look like { key: "site-about", data: {...} }.
  // If present, migrate it into the flat shape the editor expects,
  // then make sure we keep exactly one about document.
  const legacy = docs.find((d) => d.data && d.key);
  if (legacy) {
    const migrated = await About.findByIdAndUpdate(
      legacy._id,
      { $set: legacy.data, $unset: { key: 1, data: 1 } },
      { returnDocument: "after" }
    );
    await About.deleteMany({ _id: { $ne: migrated._id } });
    return migrated;
  }

  const first = docs.find(Boolean);
  if (first) {
    if (docs.length > 1) await About.deleteMany({ _id: { $ne: first._id } });
    return About.findById(first._id);
  }

  return About.create({
    hero: {},
    quote: {},
    story: {},
    overview: {},
    stats: [],
    faqs: [],
  });
}

export async function getAbout() {
  if (!(await useDb())) return dbDown();
  const doc = await getOrCreate();
  return ok(doc.toObject());
}

export async function putAbout(request) {
  if (!(await useDb())) return dbDown();
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (typeof body !== "object" || body === null) return bad("Invalid about content");
  const doc = await getOrCreate();
  doc.set(body);
  doc.markModified("hero");
  doc.markModified("quote");
  doc.markModified("story");
  doc.markModified("overview");
  doc.markModified("stats");
  doc.markModified("faqs");
  await doc.save();
  return ok(doc.toObject());
}