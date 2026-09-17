import { authenticate } from "@/lib/middleware/auth";
import { updateQuery, removeQuery } from "@/lib/controller/queries";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateQuery(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeQuery(id);
}