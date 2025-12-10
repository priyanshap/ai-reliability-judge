# FAQs

## 1. What does your project do?
AI Reliability Judge is a web app that evaluates the reliability of AI agent repos on GitHub.

You paste a repo URL, click one button, and the app:
- Runs a suite of scenario-based reliability tests.
- Scores the repo from 0–100 across multiple reliability dimensions.
- Opens a GitHub pull request with suggested code or config changes to harden the agent.

The UI shows a big reliability score, a breakdown table of tests, and a recent runs panel with links to all generated PRs.

## 2. What problem does it solve?
AI agents are being shipped into production without a standard reliability bar.

Teams and hackathon judges see impressive demos, but they cannot quickly answer:
- “Is this agent robust to real-world failures?”
- “What are its weakest reliability dimensions?”
- “What should we change before shipping?”

Today, reliability problems only appear later as flaky workflows, silent failures, and confused users. There is no simple, repeatable way to measure or compare agent reliability between teams.

AI Reliability Judge turns reliability into a concrete score and a set of actionable fixes.

## 3. What is your solution?
Our solution is a reliability and auto-fix layer that sits in front of any agent repo.

Given a public GitHub URL, the system:
- Detects whether the repo looks like an AI agent project.
- Runs structured tests that simulate failure modes such as timeouts, bad retries, missing logging, unsafe defaults, or brittle prompts.
- Aggregates partial results into a 0–100 reliability score and a clear breakdown table.
- Generates a GitHub pull request that applies safe defaults or configuration tweaks for failed checks.

This works as a one-click web app for judges and as a building block for future CI integration.

## 4. How did you build it?
- **Frontend:** Next.js App Router single-page UI for repo input, score display, test breakdown, and a Recent runs side panel.
- **Evaluator:** TypeScript module that defines named tests, their reliability dimensions, and partial scoring logic.
- **GitHub integration:** Helper functions that create branches and pull requests with suggested fixes tied to failed tests.
- **Run log:** In-memory log and `/api/run-log` endpoint that feed the run history panel with timestamps, scores, and PR URLs.

The golden-path demo uses the official LangGraph example repo, a real AI agent project hosted on GitHub.

## 5. What makes it different or innovative?
- Works with any public GitHub agent repo instead of a single framework playground.
- Combines three steps in one flow: evaluation, scoring, and auto-generated PRs with changes.
- Surfaces reliability in a way non-ML judges can understand in seconds: a big score, human-readable test names, and color-coded status.
- The Recent runs history proves usage during the hackathon and encourages teams to iterate on reliability, not just show a single happy-path demo.

## 6. Challenges you ran into
- Designing reliability tests that are realistic enough to matter but lightweight enough to run during a live judging session.
- Mapping individual test results into a single score that still preserves interpretability for judges.
- Keeping the GitHub PR creation robust, so the demo never blocks on integration errors.
- Making the UI show enough information (score, table, PR link, history) without overwhelming first-time viewers.

## 7. Accomplishments you are proud of
- A clean golden-path demo where judges only need to click one button on a real agent repo.
- A reliability score that is backed by named tests and dimensions, not just a magic number.
- A working GitHub integration that creates meaningful PRs instead of placeholders.
- A run history view that makes the tool feel like a real diagnostic surface, not just a static demo.

### 8. How did you use the sponsor tools?
- **Cline CLI:** Scaffolding and refactoring of our Next.js app and API routes with an AI coding agent in the terminal.
- **Oumi:** Experimentation with open-source models and prompts used in our reliability evaluation pipeline.
- **Vercel:** Production deployment target for the app that judges will use during evaluation.
- **CodeRabbit:** Automated GitHub code reviews on our repo, especially for evaluator logic and API error-handling PRs.

## 9. What did you learn?
- How to translate abstract reliability principles (robustness, safety, observability, recovery) into concrete, testable checks for AI agents. 
- How to present technical evaluation results in a way that non-specialist judges can scan quickly during a short demo window. 
- How much value teams get from an auto-fix PR rather than just a red “fail” signal.

## 10. What’s next for your project
- Add more reliability dimensions such as latency SLOs, load tests, guardrail checks, and red-team style prompts.
- Support private repos via a GitHub App and team-specific configuration.
- Export scores to CI checks and dashboards so agents cannot be deployed below a chosen reliability threshold.
- Build a small catalog of recommended “reliability hardening” patterns for common agent frameworks.
