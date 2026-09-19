import { authenticate } from "@/lib/middleware/auth";
import { listQueries } from "@/lib/controller/queries";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listQueries();
}