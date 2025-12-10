# AI Reliability Judge
AI Reliability Judge is a reliability and auto-fix layer for AI agents: paste a public GitHub repo, stress-test the agent, get a 0–100 trust score, and let AI open a GitHub PR with fixes.

## What it does
- Runs scenario-based evaluations against AI agent repos.
- Scores reliability across five dimensions: task robustness, tool & API safety, prompt & guardrail hygiene, observability & logging, and recovery & fallback behavior.
- Returns a 0–100 reliability score plus a breakdown of individual tests.
- Automatically creates a GitHub pull request with suggested fixes.

## Who it is for
Founders, PMs, and engineers who need to prove their AI agents will not break in production.


## Getting started

### 1. Prerequisites
- Node.js and npm installed.
- A GitHub personal access token with `repo` scope.

### 2. Clone and install
git clone https://github.com/priyanshap/ai-reliability-judge.git
cd ai-reliability-judge
npm install

### 3. Configure GitHub access
Create a `.env.local` file in the project root:
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_OWNER=your-github-username
GITHUB_REPO=ai-reliability-judge

### 4. Run locally
npm run dev
Then open `http://localhost:3000` in your browser.


## How to use
1. Paste a **public GitHub repo** URL in the form `https://github.com/owner/repo`.
2. Click **Run reliability evaluation**.
3. Wait for the evaluation to complete.
4. See:
   - A 0–100 reliability score.
   - A breakdown of tests grouped by reliability dimension.
   - A link to a suggested fix PR on GitHub.
   
If the repo does not look like an AI agent project, the app shows a warning and the score may be less meaningful.

### Recommended demo repo
For demos and screenshots, we use the official LangGraph example repo:

- https://github.com/langchain-ai/langgraph-example

This is a real AI agent project, so the reliability score and test breakdown are meaningful.


## Reliability dimensions
See `docs/reliability.md` for the detailed description of the five reliability dimensions and the tests mapped to each one.

## Architecture (high level)
- Frontend: Next.js app router UI for running evaluations and viewing results.
- Evaluator: orchestrates mock reliability tests and returns structured test results.
- GitHub integration: uses the GitHub API to create branches, commit changes, and open pull requests.

## Hackathon notes
This project was built for an AI agents hackathon to showcase:

- Practical impact: giving teams a concrete reliability score for any AI agent repo.
- Creativity: combining evaluation, scoring, and auto-generated GitHub PRs.
- Technical execution: end-to-end flow from repo URL to score, test breakdown, and PR.
- User experience: one-screen flow, clear guidance, and readable results.
- Learning: exploring reliability best practices for AI agents and encoding them into a reusable tool.

