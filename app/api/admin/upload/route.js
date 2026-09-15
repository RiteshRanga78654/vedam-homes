import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { guard, unauthorized } from "@/lib/api";
import { UPLOAD_DIR } from "@/lib/store";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request) {
  const session = await guard();
  if (!session) return unauthorized();

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const name = String(file.name || "image");
  const ext = path.extname(name).toLowerCase();
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ ok: false, error: "Only JPG, PNG, WEBP or GIF images are allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Image must be under 5 MB" }, { status: 400 });
  }

  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ ok: true, data: { url: `/uploads/${filename}`, name } });
}