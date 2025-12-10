# Submission copy (Devpost / form)

## Project tagline
Paste any AI agent repo, get a reliability score and an auto-fix GitHub PR.

## Problem
AI agents are being shipped into production without a standard way to measure reliability. Incidents only appear as broken workflows and angry users, and teams have no quick signal for “Can we trust this agent version?”. [web:456]

## Solution
AI Reliability Judge is a reliability and auto-fix layer for AI agents:
- Stress-tests any public agent repo with scenario-based checks.
- Scores reliability from 0–100 across five dimensions.
- Opens a GitHub pull request with suggested fixes for failed checks.

This turns reliability from a gut feeling into a concrete, CI-friendly signal.

## What makes it different
- Works on any GitHub agent repo instead of one framework-specific playground.
- Combines evaluation + scoring + auto-generated PRs, so teams immediately see how to harden their agents.
- Shows a run history panel with scores and PR links, making reliability visible over time.

## How we built it
- Frontend: Next.js App Router UI with a single-screen flow for repo input, score, test breakdown, and history.
- Evaluator: TypeScript module that returns structured test results mapped to five reliability dimensions.
- GitHub integration: API helper that creates branches and pull requests with suggested changes.
- Run log: In-memory log and `/api/run-log` endpoint feeding the Recent runs panel.

## How to demo
1. Open the app.
2. Use the default repo URL: `https://github.com/langchain-ai/langgraph-example`.
3. Click **Run reliability evaluation**.
4. Show:
   - Reliability score and breakdown.
   - Warning if the repo did not look like an agent (for other repos).
   - GitHub PR link with fixes.
5. Point to the **Recent runs** panel and open one of the PR URLs.

## What we learned
- How reliability frameworks for AI agents break down into dimensions like robustness, safety, observability, and recovery.
- How to design structured evaluations and surface them in a way non-ML judges can understand quickly. [web:429][web:436]
