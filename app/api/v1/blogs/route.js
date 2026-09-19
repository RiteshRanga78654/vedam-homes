import { authenticate } from "@/lib/middleware/auth";
import { listBlogs, createBlog } from "@/lib/controller/blogs";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listBlogs();
}

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();
  return createBlog(request);
}