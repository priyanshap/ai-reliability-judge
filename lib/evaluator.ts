export type EvaluationResult = {
  score: number;
  status: "queued" | "done";
  message: string;
};

export function basicMockEvaluation(repoUrl: string): EvaluationResult {
  // Very simple heuristic: adjust score slightly based on repo length
  const baseScore = 82;
  const lengthBoost = Math.min(10, Math.floor(repoUrl.length / 10));
  const finalScore = Math.max(0, Math.min(100, baseScore + lengthBoost - 5));

  return {
    score: finalScore,
    status: "queued",
    message:
      "Evaluation queued. Mock reliability score is computed from simple repo heuristics (demo).",
  };
}
