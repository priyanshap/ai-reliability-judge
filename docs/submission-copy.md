# Submission copy (Devpost / form)

## Project tagline

Paste any AI agent repo, get a reliability score and an auto‑fix GitHub PR.

## Problem

AI agents are being shipped into production without a standard way to measure reliability. Incidents show up as broken workflows and angry users, and teams have no quick signal for “Can we trust this agent version?”.

## Solution

AI Reliability Judge is a reliability and auto‑fix layer for AI agents:

- Stress‑tests any public agent repo with scenario‑based checks.  
- Scores reliability from 0–100 across five dimensions.  
- Opens a GitHub pull request with a small “fix suggestion” change for failed checks.

This turns reliability from a gut feeling into a concrete, CI‑friendly signal that can gate deploys.

## What makes it different

- Works on any GitHub agent repo instead of being locked to a single framework playground.  
- Combines evaluation + scoring + auto‑generated PRs, so teams immediately see where the agent failed and how to harden it.  
- Shows a Recent runs panel with scores, statuses, and PR links, making reliability visible over time.

## How we built it

- **Frontend:** Next.js App Router UI with a single‑screen flow for repo input, score, test breakdown, and history.  
- **Evaluator:** TypeScript module that runs a suite of checks and returns structured test results mapped to five reliability dimensions.  
- **GitHub integration:** API helper using Octokit to create branches and pull requests with the suggested change.  
- **Run log:** In‑memory log and `/api/run-log` endpoint that powers the Recent runs sidebar.

## How to demo

1. Open the app.  
2. Paste the public repo URL: `https://github.com/priyanshap/ai-reliability-judge`
3. Click **Run reliability evaluation**.  
4. Walk through:
   - The 0–100 reliability score and breakdown table.  
   - The warning banner if the repo does not look like an agent.  
   - The GitHub PR link with the automatically opened “AI Reliability Judge – automated fix suggestion” pull request.  
5. Open the **Recent runs** panel and click into a previous PR link to show history over time.


## What we learned

- How reliability frameworks for AI agents decompose into dimensions like robustness, tool/API safety, prompt hygiene, observability, and recovery.  
- How to design structured evaluations and surface them in a way non‑ML judges can understand in seconds, not minutes.
