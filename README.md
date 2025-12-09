# AI Reliability Judge
AI Reliability Judge is a platform that stress‑tests AI agents from any GitHub repo, scores how much you can trust them, and lets AI open fix PRs automatically. It combines Cline, Kestra, Oumi, Together AI, Vercel, and CodeRabbit into one end‑to‑end reliability pipeline.

AI Reliability Judge is for founders, PMs, and engineers who need to prove their AI agents will not break in production.

## How it works
1. Paste a public GitHub repo URL into the web UI.
2. The system runs an evaluation workflow against the agent and collects metrics and logs.
3. A reliability score (0–100) is produced along with a human‑readable summary.
4. An autonomous coding agent prepares fix PRs, which are reviewed to keep the repository clean and production‑ready.

## Try it in 10 seconds
1. Open the live demo: https://ai-reliability-judge.vercel.app  
2. Paste a public GitHub repo URL into the input box.  
3. Click **Run reliability evaluation**.  
4. You’ll see an evaluation status and a mock reliability score while the full agent pipeline runs in the background.

## Tech & sponsor tools
- **Vercel** – Hosts the production Next.js dashboard for a fast, smooth UX.
- **Cline** – Autonomous coding agent used to plan and generate fix PRs.
- **Kestra** – Orchestration layer for multi‑step evaluation workflows.
- **Oumi** – Reliability scoring and evaluation logic for LLM/VLM agents.
- **Together AI** – Model provider for running realistic agent tasks.
- **CodeRabbit** – Code review bot that keeps PRs clean and open‑source friendly.
  

## AI Engineering workflow
AI Reliability Judge is built and maintained using an AI‑first engineering process:

- **Cline (VS Code autonomous dev)**  
  - Used to refactor the evaluation pipeline and add new modules such as `lib/githubMetrics.ts`.  
  - Example Cline PRs: `Refactor evaluator pipeline with Cline` (PR #2) and `Add GitHub metrics scaffold via Cline` (PR #3).

- **CodeRabbit (AI PR reviewer)**  
  - Reviews every pull request before merge, adding walkthroughs, inline comments, and a short summary/poem.  
  - Keeps `main` production‑ready while still moving fast with AI‑generated changes.

- **Captain Code**
  - All changes go through GitHub pull requests reviewed by **CodeRabbit**.
  - PR #1 (evaluator module) was reviewed by CodeRabbit with no blocking issues, keeping `main` production-ready.
  - The evaluation pipeline lives in `lib/evaluator.ts`, making it easy for AI agents like Cline to extend.

- **Vercel (deploy from main)**  
  - Connected to this GitHub repository; every merge to `main` triggers a fresh deployment.  
  - Preview deployments are used to manually test Cline‑authored branches before merging.

- **Iron Intelligence – Oumi reliability brain**
To explore an “Oumi-style” reliability brain, AI Reliability Judge includes a small metrics-based scoring script:

  - The `oumi/github_score.py` script calls the public GitHub REST API for a given `<owner> <repo>` pair and reads basic repository metrics such as stars and open     issues. [web:126][web:132]
  - It converts these metrics into a rough 0–100 reliability score plus a Low / Medium / High risk label by rewarding popular repos (more stars) and penalizing        repos with many unresolved issues.
  - For the demo, this script is run manually on a few example repositories (for example, `python oumi/github_score.py vercel next.js`), and the resulting Oumi-       style scores are compared with the judgments produced by the in-app evaluator.

This `oumi/` module acts as a prototype “Oumi reliability brain” that can later be plugged directly into the `/api/run` evaluator pipeline for fully integrated scoring.

For more detail, see [`docs/ENGINEERING.md`](docs/ENGINEERING.md), which explains how Cline, CodeRabbit, and Vercel work together in this repo.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## UI preview
![AI Reliability Judge UI](screenshots/main-ui.png)


## Future work
- Use `parseRepoUrl` in the UI to show a friendly “Detected repo: owner/name” summary under the input field.
- Extend the evaluator to include a `githubMetricScore` field based on real GitHub repository metrics (stars, issues, CI status) instead of the current scaffold.



