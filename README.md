# AI Reliability Judge
AI Reliability Judge is a platform that stress‑tests AI agents from any GitHub repo, scores how much you can trust them, and lets AI open fix PRs automatically. It combines Cline, Kestra, Oumi, Together AI, Vercel, and CodeRabbit into one end‑to‑end reliability pipeline.

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
