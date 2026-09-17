import { authenticate } from "@/lib/middleware/auth";
import { updateBlog, removeBlog } from "@/lib/controller/blogs";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateBlog(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeBlog(id);
}