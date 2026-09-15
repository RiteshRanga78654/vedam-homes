import { NextResponse } from "next/server";
import { getQueries, saveQueries, logActivity, uid } from "@/lib/store";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Name and email are required" }, { status: 400 });
  }

  const query = {
    id: uid(),
    name,
    email,
    phone,
    message: (body.message || "").trim(),
    interest: (body.interest || body.keyRequest || "General inquiry").trim(),
    relatedProject: (body.relatedProject || "").trim(),
    source: (body.source || "Website").trim(),
    status: "New",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const list = getQueries();
  list.unshift(query);
  saveQueries(list);

  logActivity({
    type: "query",
    action: "received",
    title: `${query.name}`,
    detail: `${query.interest} · ${email}`,
  });

  return NextResponse.json({ ok: true, data: query }, { status: 201 });
}