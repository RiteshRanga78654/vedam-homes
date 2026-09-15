import { NextResponse } from "next/server";
import { adminCredentials, createSession, getSession } from "@/lib/session";

export async function POST(request) {
  const session = await getSession();
  if (session) {
    return NextResponse.json({ ok: true, data: session });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const credentials = adminCredentials();
  const email = (body.email || "").trim().toLowerCase();
  const password = (body.password || "").trim();

  if (email === credentials.email && password === credentials.password) {
    const created = await createSession();
    return NextResponse.json({ ok: true, data: created });
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}