import { authenticate } from "@/lib/middleware/auth";
import { unauthorized, ok, bad } from "@/lib/api";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { uid } from "@/lib/store";

const ALLOWED = ["jpg", "jpeg", "png", "webp", "gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = "public/uploads";

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();

  const form = await request.formData();
  const file = form.get("file");
  if (!file || !file.name) return bad("No file provided");

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED.includes(ext)) return bad("Only jpg, png, webp, gif are allowed");
  if (file.size > MAX_SIZE) return bad("File too large (max 5MB)");

  const filename = `${Date.now()}-${uid()}.${ext}`;
  const dir = path.join(process.cwd(), UPLOAD_DIR);
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return ok({ url: `/uploads/${filename}` }, 201);
}