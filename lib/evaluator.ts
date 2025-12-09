export type EvaluationTest = {
  id: string;
  name: string;
  dimension:
    | "Task robustness"
    | "Tool & API safety"
    | "Prompt & guardrail hygiene"
    | "Observability & logging"
    | "Recovery & fallback behavior";
  status: "pass" | "fail" | "not_run";
  impact: "low" | "medium" | "high";
};

export type EvaluationResult = {
  score: number;
  status: "queued" | "done";
  message: string;
  isAgentRepo: boolean;
  tests: EvaluationTest[];
};

// Lightweight heuristic to guess whether this looks like an AI agent repo
function looksLikeAgentRepo(repoUrl: string): boolean {
  const lower = repoUrl.toLowerCase();
  const agentIndicators = [
    "agent",
    "assistant",
    "langgraph",
    "autogen",
    "crewai",
    "ai-bot",
  ];

  return agentIndicators.some((token) => lower.includes(token));
}

export function basicMockEvaluation(repoUrl: string): EvaluationResult {
  // Very simple heuristic: adjust score slightly based on repo length
  const baseScore = 82;
  const lengthBoost = Math.min(10, Math.floor(repoUrl.length / 10));
  const finalScore = Math.max(0, Math.min(100, baseScore + lengthBoost - 5));

  const isAgentRepo = looksLikeAgentRepo(repoUrl);

  const tests: EvaluationTest[] = [
    {
      id: "happy-path",
      name: "Happy-path scenario completion",
      dimension: "Task robustness",
      status: "pass",
      impact: "high",
    },
    {
      id: "idempotent-rerun",
      name: "Idempotent re-run",
      dimension: "Task robustness",
      status: "pass",
      impact: "medium",
    },
    {
      id: "invalid-tool-input",
      name: "Invalid tool input handling",
      dimension: "Tool & API safety",
      status: "pass",
      impact: "high",
    },
    {
      id: "timeout-retry",
      name: "Timeout / retry handling",
      dimension: "Tool & API safety",
      status: "fail",
      impact: "high",
    },
    {
      id: "prompt-injection",
      name: "Prompt injection resistance",
      dimension: "Prompt & guardrail hygiene",
      status: "fail",
      impact: "high",
    },
    {
      id: "system-obedience",
      name: "System instruction obedience",
      dimension: "Prompt & guardrail hygiene",
      status: "pass",
      impact: "medium",
    },
    {
      id: "structured-logging",
      name: "Structured error logging present",
      dimension: "Observability & logging",
      status: "pass",
      impact: "medium",
    },
    {
      id: "traceability",
      name: "Traceability of key decisions",
      dimension: "Observability & logging",
      status: "pass",
      impact: "low",
    },
    {
      id: "graceful-failure",
      name: "Graceful failure message",
      dimension: "Recovery & fallback behavior",
      status: "pass",
      impact: "medium",
    },
    {
      id: "safe-fallback",
      name: "Fallback to safer action instead of crash",
      dimension: "Recovery & fallback behavior",
      status: "fail",
      impact: "high",
    },
  ];

  return {
    score: finalScore,
    status: "queued",
    message:
      "Evaluation queued. Mock reliability score is computed from simple repo heuristics (demo).",
    isAgentRepo,
    tests,
  };
}
