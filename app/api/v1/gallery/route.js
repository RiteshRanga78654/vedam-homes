import { authenticate } from "@/lib/middleware/auth";
import { listGallery, createGalleryItem } from "@/lib/controller/gallery";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listGallery();
}

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();
  return createGalleryItem(request);
}