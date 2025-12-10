type RunStatus = "success" | "error";

export type RunLogEntry = {
  id: string;
  repoUrl: string;
  status: RunStatus;
  score?: number;
  prUrl?: string | null;
  errorMessage?: string;
  createdAt: string;
};

const runLog: RunLogEntry[] = [];

export function addRun(entry: RunLogEntry) {
  runLog.unshift(entry);
  if (runLog.length > 20) {
    runLog.pop();
  }
}

export function getRuns(): RunLogEntry[] {
  return runLog;
}
