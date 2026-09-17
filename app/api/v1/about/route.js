import { authenticate } from "@/lib/middleware/auth";
import { getAbout, putAbout } from "@/lib/controller/about";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return getAbout();
}

export async function PUT(request) {
  if (!(await authenticate())) return unauthorized();
  return putAbout(request);
}