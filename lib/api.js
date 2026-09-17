import { NextResponse } from "next/server";
import { getSession } from "./session.js";

export function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export function ok(data, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function bad(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function dbDown(message = "Database not connected. Set MONGO_URI in .env.local") {
  return NextResponse.json({ ok: false, error: message }, { status: 503 });
}

export async function guard() {
  const session = await getSession();
  return session || null;
}