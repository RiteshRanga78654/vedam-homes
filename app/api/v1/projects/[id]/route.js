import { authenticate } from "@/lib/middleware/auth";
import { updateProject, removeProject } from "@/lib/controller/projects";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateProject(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeProject(id);
}