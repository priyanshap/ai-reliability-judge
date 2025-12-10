// lib/runLog.ts

export type RunStatus = "success" | "error";

export type RunLogEntry = {
  id: string;
  repoUrl: string;
  status: RunStatus;
  score?: number;
  prUrl?: string;
  errorMessage?: string;
  createdAt: string;
};

let runs: RunLogEntry[] = [];

export function addRun(run: RunLogEntry) {
  runs.unshift(run);
  runs = runs.slice(0, 20); // keep latest N
}

export function listRuns(): RunLogEntry[] {
  return runs;
}

