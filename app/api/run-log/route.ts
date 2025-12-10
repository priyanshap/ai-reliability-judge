// app/api/run-log/route.ts
import { NextResponse } from "next/server";
import { listRuns } from "@/lib/runLog";

export async function GET() {
  const runs = listRuns();
  return NextResponse.json({ runs });
}
