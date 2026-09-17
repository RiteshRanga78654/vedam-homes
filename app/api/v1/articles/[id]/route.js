import { authenticate } from "@/lib/middleware/auth";
import { updateArticle, removeArticle } from "@/lib/controller/articles";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateArticle(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeArticle(id);
}