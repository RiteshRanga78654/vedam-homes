import { logoutController } from "@/lib/controller/auth";

export async function POST() {
  return logoutController();
}