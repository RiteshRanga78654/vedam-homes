import { authenticate } from "@/lib/middleware/auth";
import { updateGalleryItem, removeGalleryItem } from "@/lib/controller/gallery";
import { unauthorized } from "@/lib/api";

export async function PATCH(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  return updateGalleryItem(request, { params });
}

export async function DELETE(request, { params }) {
  if (!(await authenticate())) return unauthorized();
  const { id } = await params;
  return removeGalleryItem(id);
}