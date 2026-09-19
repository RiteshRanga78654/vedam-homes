import { loginController } from "@/lib/controller/auth";

export async function POST(request) {
  return loginController(request);
}