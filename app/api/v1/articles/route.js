import { authenticate } from "@/lib/middleware/auth";
import { listArticles, createArticle } from "@/lib/controller/articles";
import { unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await authenticate())) return unauthorized();
  return listArticles();
}

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();
  return createArticle(request);
}