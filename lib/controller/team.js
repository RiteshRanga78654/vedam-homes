import { useDb } from "../config/db.js";
import Team from "../models/Team.js";
import { ok, bad, dbDown, unauthorized } from "../api.js";
import { logActivity } from "../store.js";
import bcrypt from "bcryptjs";
import { authenticate } from "../middleware/auth";
import { hasPermission } from "../permissions.js";

async function ready() {
  return await useDb();
}

/** Team access changes require the "team" permission. */
async function guardTeam() {
  const session = await authenticate();
  if (!session) return unauthorized();
  if (!hasPermission(session.role, "team")) {
    return bad("You do not have permission to manage team access", 403);
  }
  return null;
}

/** Fields that are safe to expose through the API. */
const PUBLIC_FIELDS = "-password";

export async function listTeam() {
  if (!(await ready())) return dbDown();

  const error = await guardTeam();
  if (error) return error;

  const items = await Team.find().select(PUBLIC_FIELDS).sort({ createdAt: -1 }).lean();
  return ok(items);
}

export async function createTeamMember(request) {
  if (!(await ready())) return dbDown();

  const error = await guardTeam();
  if (error) return error;

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body.name || !body.email) return bad("Name and email are required");
  if (!body.password) return bad("A password is required for login access");

  try {
    const doc = await Team.create({
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      role: body.role || "Content Manager",
      status: body.status || "Active",
    });
    await logActivity({ type: "team", action: "added", title: doc.name, detail: doc.role });
    return ok(doc.toObject(), 201);
  } catch (err) {
    return bad(err.message, 400);
  }
}

export async function updateTeamMember(request, { params }) {
  if (!(await ready())) return dbDown();

  const error = await guardTeam();
  if (error) return error;

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  // Only re-hash when a new password is provided; blank means "keep current".
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  } else {
    delete body.password;
  }

  const doc = await Team.findOneAndUpdate({ id }, body, {
    runValidators: true,
    returnDocument: "after",
  });
  if (!doc) return bad("Member not found", 404);
  await logActivity({ type: "team", action: "updated", title: doc.name });
  return ok(doc.toObject());
}

export async function removeTeamMember(id) {
  if (!(await ready())) return dbDown();

  const error = await guardTeam();
  if (error) return error;

  const doc = await Team.findOne({ id });
  if (!doc) return bad("Member not found", 404);
  await Team.deleteOne({ id });
  await logActivity({ type: "team", action: "removed", title: doc.name });
  return ok({ deleted: true });
}