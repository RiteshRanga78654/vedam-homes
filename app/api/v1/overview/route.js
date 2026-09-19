import { authenticate } from "@/lib/middleware/auth";
import { getOverview } from "@/lib/controller/overview";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return getOverview();
}