import { NextResponse } from "next/server";
import { getRuns } from "@/lib/runLog";

export async function GET() {
  const runs = getRuns();
  return NextResponse.json({ ok: true, runs });
}
