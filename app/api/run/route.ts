
import { NextRequest, NextResponse } from "next/server";
import { basicMockEvaluation } from "@/lib/evaluator";
import { createFixPr } from "@/lib/github";

export async function POST(req: NextRequest) {
  const { repoUrl } = await req.json();

  if (!repoUrl || typeof repoUrl !== "string") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Please provide a valid public GitHub repo URL like https://github.com/owner/repo.",
      },
      { status: 400 }
    );
  }

  const evalResult = await basicMockEvaluation(repoUrl);
  const prUrl = await createFixPr(repoUrl);

  return NextResponse.json({
    ok: true,
    message: evalResult.message,
    score: evalResult.score,
    status: evalResult.status,
    isAgentRepo: evalResult.isAgentRepo,
    tests: evalResult.tests,
    prUrl,
  });
}

