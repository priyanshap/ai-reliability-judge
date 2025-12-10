# AI Reliability Judge
AI Reliability Judge is a reliability and auto-fix layer for AI agents: paste a public GitHub repo, stress-test the agent, get a 0–100 trust score, and let AI open a GitHub PR with fixes.

## What it does
- Runs scenario-based evaluations against AI agent repos.
- Scores reliability across five dimensions: task robustness, tool & API safety, prompt & guardrail hygiene, observability & logging, and recovery & fallback behavior.
- Returns a 0–100 reliability score plus a breakdown of individual tests.
- Automatically creates a GitHub pull request with suggested fixes.

## Who it is for
Founders, PMs, and engineers who need to prove their AI agents will not break in production.

## Prerequisites
- Node.js and npm installed.
- A GitHub personal access token with `repo` scope.

## Getting started
1. Clone and install:
git clone https://github.com/priyanshap/ai-reliability-judge.git
cd ai-reliability-judge
npm install

2. Add environment variables in `.env.local`:
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_OWNER=your-github-username
GITHUB_REPO=ai-reliability-judge

3. Run the app:
npm run dev
Open `http://localhost:3000` in your browser.

## How to use
1. Keep or paste a public GitHub repo URL (recommended demo: `https://github.com/langchain-ai/langgraph-example`). [web:474]  
2. Click **Run reliability evaluation**.  
3. Read:
   - Big 0–100 reliability score.
   - Reliability breakdown table grouped by five dimensions.
   - GitHub PR link with suggested fixes.
4. Check the **Recent runs** panel to see past scores and PR URLs.
   
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

## Sponsor tools we used
- **Cline CLI** – Used as our local AI coding agent in the terminal to scaffold the initial Next.js pages, API routes, and TypeScript types for the evaluator and run log. Cline CLI helped us move faster on boilerplate and keep a clean, consistent file structure. 

- **Oumi** – Used to run and iterate on the open-source model setup behind our reliability evaluator, so we could quickly adjust prompts and scoring behaviour while staying on an OSS stack. 

- **Vercel** – Used to deploy the AI Reliability Judge production app, giving judges a fast, globally available demo with simple CI-style redeploys. Vercel is the hosting backbone for our golden-path demo. 

- **CodeRabbit** – Used as our GitHub-integrated code review assistant to automatically review PRs and highlight potential issues in our evaluator and API routes, helping us harden reliability logic and keep PRs clean. 

## Hackathon notes
This project was built for an AI agents hackathon to showcase:

- Practical impact: giving teams a concrete reliability score for any AI agent repo.
- Creativity: combining evaluation, scoring, and auto-generated GitHub PRs.
- Technical execution: end-to-end flow from repo URL to score, test breakdown, and PR.
- User experience: one-screen flow, clear guidance, and readable results.
- Learning: exploring reliability best practices for AI agents and encoding them into a reusable tool.

