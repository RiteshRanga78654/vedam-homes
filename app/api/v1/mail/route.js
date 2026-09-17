import { submitQuery } from "@/lib/controller/queries-public";

export async function POST(request) {
  return submitQuery(request);
}