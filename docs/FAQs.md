# FAQs


**Q. What does AI Reliability Judge actually do?**  
It runs a set of scenario‑based checks against an AI agent repo, then returns a 0–100 reliability score plus a breakdown of which tests passed or failed. It also opens a small, auto‑generated GitHub PR to demonstrate how fixes can plug into your normal dev workflow.

**Q. What counts as an “AI agent repo”?**  
Any repository where an LLM (or chain/graph around an LLM) makes decisions based on tools, prompts, or workflows. If the repo does not look like an agent project, the app shows a warning so you know the score is less meaningful.

**Q. Does this run real end‑to‑end tests on my production systems?**  
No. The current hackathon version runs mock reliability checks designed to illustrate how an agent *would* be evaluated. The structure is real (dimensions, impact levels, pass/fail), but the checks are intentionally lightweight and safe.

**Q. Will this modify my repository?**  
Only the repo you configure via `GITHUB_OWNER` and `GITHUB_REPO` in `.env.local`. The judge always opens PRs into that target repo, even if you paste someone else’s repo URL into the UI, so you control exactly where changes land.

**Q. Can I use this in CI?**  
Yes in spirit, with caveats. The evaluator already returns a structured JSON result and a 0–100 score, which can be wired into a CI job. For the hackathon, the focus is on the interactive web flow; turning it into a headless CI action is a natural next step.

**Q. Which reliability dimensions do you cover?**  
Task robustness, tool & API safety, prompt & guardrail hygiene, observability & logging, and recovery & fallback behavior. Each row in the breakdown table maps to one of these dimensions and has an impact level (low/medium/high).

**Q. Does AI Reliability Judge depend on a specific framework like LangGraph or LangChain?**  
No. It is framework‑agnostic: you paste any public GitHub repo URL and the judge runs the same structured evaluation, then warns you if the repo does not look like an agent.

**Q. How hard is it to extend the checks?**  
Each test is a small, typed function that returns a result object. Adding a new check is as simple as adding one more function and wiring it into the evaluator’s test list, so teams can customize the judge for their own agents.
