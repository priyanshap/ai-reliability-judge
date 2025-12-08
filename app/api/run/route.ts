import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { repoUrl } = await req.json();

  if (!repoUrl || typeof repoUrl !== "string") {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid GitHub repo URL." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    status: "queued",
    score: 82,
    message: "Evaluation queued. This is a mock response for the prototype."
  });
}
