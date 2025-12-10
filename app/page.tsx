"use client";

import { useEffect, useState } from "react";

function isValidRepoUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return false;

    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return false;

    const [owner, repo] = parts;
    if (!owner || !repo) return false;

    if (
      parts[2] === "blob" ||
      parts[2] === "tree" ||
      parts[2] === "pull" ||
      parts[2] === "issues"
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

type RunResult = {
  score: number;
  status: string;
  message?: string;
  isAgentRepo?: boolean;
  tests?: {
    id: string;
    name: string;
    dimension: string;
    status: "pass" | "fail" | "not_run";
    impact: "low" | "medium" | "high";
  }[];
  prUrl?: string;
};

type RunHistoryItem = {
  id: string;
  repoUrl: string;
  status: "success" | "error";
  score?: number;
  prUrl?: string;
  errorMessage?: string;
  createdAt: string;
};

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [runHistory, setRunHistory] = useState<RunHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  async function loadRunHistory() {
    try {
      setLoadingHistory(true);
      const res = await fetch("/api/run-log");
      const data = await res.json();
      if (data.ok && Array.isArray(data.runs)) {
        setRunHistory(data.runs);
      }
    } catch {
      // best-effort only
    } finally {
      setLoadingHistory(false);
    }
  }

  async function handleRun() {
    if (!isValidRepoUrl(repoUrl)) {
      setError(
        "Please paste a GitHub repo URL like https://github.com/owner/repo, not a profile, file, or PR link. Make sure it is a public repository."
      );
      setStatus(null);
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setStatus("Running evaluation...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(
          data.error ||
            "Could not run evaluation. Check that this is a public GitHub repo and try again."
        );
      }

      setResult(data);
      setStatus("Done.");

      await loadRunHistory();
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRunHistory();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
        Can you really trust your AI agents?
      </h1>
      <p className="text-center text-gray-300 max-w-2xl mb-2">
        For founders, PMs, and engineers who need to prove their AI agents
        won&apos;t break in production.
      </p>
      <p className="text-center text-gray-400 max-w-2xl mb-8">
        Paste a GitHub repo, run realistic tasks, get a reliability score, and
        let AI open fix PRs for you.
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
        {/* Left: main panel */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-xl space-y-2">
            <label className="block text-sm font-medium">
              Enter your AI agent repo
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/your-user/your-agent-repo"

              className="w-full border border-gray-700 bg-black rounded-md px-3 py-2 text-sm"
            />
            <p className="text-xs text-gray-400">
              Paste a <span className="font-semibold">public GitHub repo</span>{" "}
              that contains an AI agent (TypeScript or Python) for the most
              accurate results.
            </p>

            <button
              onClick={handleRun}
              disabled={loading || !repoUrl}
              className={`w-full mt-2 py-2 rounded-md font-semibold transition ${
                repoUrl
                  ? "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white hover:shadow-lg"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Running evaluation..." : "Run reliability evaluation"}
            </button>
          </div>

          <div className="mt-8 max-w-xl text-sm text-gray-500">
            <p className="font-semibold mb-1">
              What happens when you click &quot;Run&quot;?
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                An evaluation flow runs realistic tasks against your agent.
              </li>
              <li>A 0–100 trust score is computed from logs and metrics.</li>
              <li>
                A fix is prepared and opened as a GitHub pull request for
                review.
              </li>
              <li>You get a clean summary here plus links back to your repo.</li>
            </ul>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
          )}

          {status && !error && (
            <p className="mt-6 text-sm text-green-400 text-center">{status}</p>
          )}

          {result && !error && result.score !== undefined && (
            <>
              <p className="mt-6 text-3xl md:text-4xl font-bold text-center text-white">
                {result.score}/100 reliability score for this agent.
              </p>

              {result.isAgentRepo === false && (
                <p className="mt-2 text-xs text-yellow-400 text-center">
                  This repo doesn&apos;t look like an AI agent project.
                  Reliability results may be less meaningful.
                </p>
              )}

              {result.prUrl && (
                <p className="mt-2 text-sm text-blue-400 text-center underline">
                  <a href={result.prUrl} target="_blank" rel="noreferrer">
                    View the suggested fix PR on GitHub
                  </a>
                </p>
              )}

              {result.tests && result.tests.length > 0 && (
                <div className="mt-6 w-full max-w-3xl">
                  <h2 className="text-lg font-semibold text-center mb-2">
                    Reliability breakdown
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-gray-800 bg-black/40">
                    <table className="min-w-full text-xs md:text-sm">
                      <thead className="bg-gray-900/70">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-gray-300">
                            Test
                          </th>
                          <th className="px-3 py-2 text-left font-medium text-gray-300">
                            Dimension
                          </th>
                          <th className="px-3 py-2 text-left font-medium text-gray-300">
                            Impact
                          </th>
                          <th className="px-3 py-2 text-left font-medium text-gray-300">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.tests.map((t) => (
                          <tr key={t.id} className="border-t border-gray-800">
                            <td className="px-3 py-2 text-gray-100">
                              {t.name}
                            </td>
                            <td className="px-3 py-2 text-gray-400">
                              {t.dimension}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={
                                  t.impact === "high"
                                    ? "text-red-400"
                                    : t.impact === "medium"
                                    ? "text-yellow-300"
                                    : "text-green-300"
                                }
                              >
                                {t.impact.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={
                                  t.status === "pass"
                                    ? "text-green-400"
                                    : t.status === "fail"
                                    ? "text-red-400"
                                    : "text-gray-400"
                                }
                              >
                                {t.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: run history panel */}
        <div className="w-full md:w-80 bg-black/40 border border-gray-800 rounded-xl p-4 max-h-[480px] overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-100">Recent runs</h2>
            <button
              type="button"
              onClick={loadRunHistory}
              className="text-xs text-blue-300 hover:text-blue-200"
            >
              {loadingHistory ? "Loading..." : "Refresh"}
            </button>
          </div>

          {runHistory.length === 0 && (
            <p className="text-xs text-gray-500">
              No runs yet. Paste a repo and run the judge to see history.
            </p>
          )}

          <ul className="space-y-3">
            {runHistory.map((run) => (
              <li
                key={run.id}
                className="border border-gray-800 rounded-lg p-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-gray-400">
                    {new Date(run.createdAt).toLocaleTimeString()}
                  </span>
                  <span
                    className={
                      run.status === "success"
                        ? "text-[11px] text-green-400"
                        : "text-[11px] text-red-400"
                    }
                  >
                    {run.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 truncate">
                  {run.repoUrl}
                </div>
                {run.status === "success" && (
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-yellow-300">
                      Score: {run.score}
                    </span>
                    {run.prUrl && (
                      <a
                        href={run.prUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-300 hover:text-blue-200"
                      >
                        PR →
                      </a>
                    )}
                  </div>
                )}
                {run.status === "error" && run.errorMessage && (
                  <p className="mt-1 text-[11px] text-red-300 line-clamp-2">
                    {run.errorMessage}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
