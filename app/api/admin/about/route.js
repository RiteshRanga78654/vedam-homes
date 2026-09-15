import { guard, unauthorized, ok, bad } from "@/lib/api";
import { getAbout, saveAbout } from "@/lib/store";

export async function GET() {
  if (!(await guard())) return unauthorized();
  return ok(getAbout());
}

export async function PUT(request) {
  if (!(await guard())) return unauthorized();
  let body;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request body");
  }
  if (!body || typeof body !== "object") return bad("Invalid content");

  const current = getAbout();
  const merged = {
    ...current,
    ...body,
    hero: { ...(current.hero || {}), ...(body.hero || {}) },
    quote: { ...(current.quote || {}), ...(body.quote || {}) },
    story: { ...(current.story || {}), ...(body.story || {}) },
    overview: { ...(current.overview || {}), ...(body.overview || {}) },
    stats: Array.isArray(body.stats) ? body.stats : current.stats,
    faqs: Array.isArray(body.faqs) ? body.faqs : current.faqs,
    updatedAt: new Date().toISOString(),
  };

  saveAbout(merged);
  return ok(merged);
}