import { NextRequest, NextResponse } from "next/server";
import { basicMockEvaluation } from "@/lib/evaluator";
import { createFixPr } from "@/lib/github";
import { addRun } from "@/lib/runLog";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const now = new Date().toISOString();

  try {
    const { repoUrl } = await req.json();

    if (!repoUrl || typeof repoUrl !== "string") {
      const errorMessage =
        "Please provide a valid public GitHub repo URL like https://github.com/owner/repo.";
      addRun({
        id,
        repoUrl: repoUrl || "",
        status: "error",
        errorMessage,
        createdAt: now,
      });
      return NextResponse.json(
        {
          ok: false,
          error: errorMessage,
        },
        { status: 400 }
      );
    }

    const evalResult = await basicMockEvaluation(repoUrl);

    let prUrl: string | null = null;
    try {
      prUrl = await createFixPr(repoUrl);
    } catch (error: any) {
      console.error(
        "API /api/run GitHub error:",
        error.status,
        error.message,
        error.response?.data
      );
      // still continue without PR so we see scoring working
    }

    addRun({
      id,
      repoUrl,
      status: "success",
      score: evalResult.score,
      prUrl: prUrl || undefined,
      createdAt: now,
    });

    return NextResponse.json({
      ok: true,
      message: evalResult.message,
      score: evalResult.score,
      status: evalResult.status,
      isAgentRepo: evalResult.isAgentRepo,
      tests: evalResult.tests,
      prUrl,
    });
  } catch (err: any) {
    console.error("API /api/run top-level error:", err?.message, err);
    const errorMessage =
      err?.message || "Unexpected error while running reliability evaluation.";

    addRun({
      id,
      repoUrl: "",
      status: "error",
      errorMessage,
      createdAt: now,
    });

    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
