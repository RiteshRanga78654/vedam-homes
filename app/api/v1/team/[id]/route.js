import { authenticate } from "@/lib/middleware/auth";
import { updateTeamMember, removeTeamMember } from "@/lib/controller/team";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateTeamMember(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeTeamMember(id);
}