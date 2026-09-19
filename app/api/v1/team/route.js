import { authenticate } from "@/lib/middleware/auth";
import { listTeam, createTeamMember } from "@/lib/controller/team";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listTeam();
}

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();
  return createTeamMember(request);
}