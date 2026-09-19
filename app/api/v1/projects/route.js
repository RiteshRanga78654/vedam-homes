import { authenticate } from "@/lib/middleware/auth";
import { listProjects, createProject } from "@/lib/controller/projects";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listProjects();
}

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();
  return createProject(request);
}