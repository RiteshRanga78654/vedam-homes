import bcrypt from "bcryptjs";
import { useDb } from "../config/db.js";
import Admin from "../models/Admin.js";
import Team from "../models/Team.js";
import { createSession, destroySession, getSession, adminCredentials } from "../session.js";
import { ok, bad, unauthorized } from "../api.js";
import { logActivity } from "../store.js";
import { authenticate } from "../middleware/auth";

export async function loginController(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email = (body.email || "").trim();
  const password = body.password || "";
  if (!email || !password) {
    return bad("Email and password are required");
  }

  // 1) Try the database admin.
  if (await useDb()) {
    const admin = await Admin.findOne({ email }).lean();
    if (admin && admin.password && (await bcrypt.compare(password, admin.password))) {
      await Admin.updateOne({ _id: admin._id }, { lastActive: new Date() });
      await createSession({
        email: admin.email,
        name: admin.name,
        role: admin.role,
      });
      await logActivity({ type: "system", action: "signed in", title: admin.name });
      return ok({ email: admin.email, name: admin.name, role: admin.role });
    }
  }

  // 2) Try a team member (email + password, active only).
  if (await useDb()) {
    const member = await Team.findOne({ email: email.toLowerCase(), status: "Active" }).lean();
    if (member && member.password && (await bcrypt.compare(password, member.password))) {
      await Team.updateOne({ _id: member._id }, { lastActive: new Date() });
      await createSession({
        email: member.email,
        name: member.name,
        role: member.role,
      });
      await logActivity({ type: "system", action: "signed in", title: member.name });
      return ok({ email: member.email, name: member.name, role: member.role });
    }
  }

  // 3) Fallback to the env credentials (admin@vedamhomes.com / vedamhomes).
  const creds = adminCredentials();
  if (email === creds.email && password === creds.password) {
    await createSession({
      email: creds.email,
      name: creds.name,
      role: creds.role,
    });
    await logActivity({ type: "system", action: "signed in", title: creds.name });
    return ok({ email: creds.email, name: creds.name, role: creds.role });
  }

  return unauthorized();
}

export async function sessionController() {
  const session = await getSession();
  if (!session) return unauthorized();
  return ok({ email: session.email, name: session.name, role: session.role });
}

export async function logoutController() {
  await destroySession();
  return ok({ loggedOut: true });
}