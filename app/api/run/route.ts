import { NextRequest, NextResponse } from "next/server";
import { basicMockEvaluation } from "@/lib/evaluator";

export async function POST(req: NextRequest) {
  const { repoUrl } = await req.json();

  if (!repoUrl || typeof repoUrl !== "string") {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid GitHub repo URL." },
      { status: 400 }
    );
  }

  const result = basicMockEvaluation(repoUrl);

  return NextResponse.json({
    ok: true,
    status: result.status,
    score: result.score,
    message: result.message,
  });
}

