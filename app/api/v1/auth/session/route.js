import { sessionController, logoutController } from "@/lib/controller/auth";

export async function GET() {
  return sessionController();
}

export async function POST() {
  return logoutController();
}