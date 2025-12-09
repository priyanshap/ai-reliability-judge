"use client";

import { useState } from "react";

import Image from "next/image";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
const [status, setStatus] = useState<string | null>(null);

async function handleRun() {
  if (!repoUrl || !repoUrl.startsWith("https://github.com/")) {
    setStatus("Please paste a valid public GitHub repository URL.");
    return;
  }
  setStatus("Running evaluation...");

  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setStatus(data.message || "Something went wrong. Please try again.");
      return;
    }

    setStatus(
      `Evaluation queued. Mock reliability score: ${data.score}/100 (demo).`
    );
  } catch (err) {
    setStatus("Network error. Please try again.");
  }
}

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
        Can you really trust your AI agents?
      </h1>
      <p className="text-center text-gray-300 max-w-2xl mb-2">
        For founders, PMs, and engineers who need to prove their AI agents won&apos;t break in production.
       </p>
      <p className="text-center text-gray-400 max-w-2xl mb-8">
        Paste a GitHub repo, run realistic tasks, get a reliability score, and let AI open fix PRs for you.
      </p>

      <div className="w-full max-w-xl space-y-4">
        <label className="block text-sm font-medium">
          Enter your AI agent repo
        </label>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          className="w-full border border-gray-700 bg-black rounded-md px-3 py-2 text-sm"
        />
        <button 
        onClick={handleRun}
        className={`w-full py-2 rounded-md font-semibold transition
          ${repoUrl
            ? "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95 cursor-pointer"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Run reliability evaluation
        </button>
        
      </div>

      <div className="mt-8 max-w-xl text-sm text-gray-500">
        <p className="font-semibold mb-1">
          What happens when you click &quot;Run&quot;?
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Kestra orchestrates an evaluation flow with Together AI models.</li>
          <li>Oumi computes a 0–100 trust score from metrics and logs.</li>
          <li>Cline prepares a fix and opens a GitHub pull request, reviewed by CodeRabbit.</li>
          <li>You get a clean dashboard showing results and links.</li>
        </ul>
      </div>
      {status && (
        <p className="mt-6 text-sm text-green-400 text-center">{status}</p>
)}

    </main>
  );
}
