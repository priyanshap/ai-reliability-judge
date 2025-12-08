# AI Reliability Judge

AI Reliability Judge is a platform that stress-tests AI agents with realistic tasks, scores how much you can trust them, and then opens AI-generated fix PRs automatically. It combines Cline, Kestra, Oumi, Together AI, Vercel, and CodeRabbit into one end-to-end reliability pipeline. 

### Why we built this

AI agents are becoming the default way to build products, but most teams still test them manually with ad-hoc prompts. That makes reliability, safety, latency, and cost very hard to measure or improve. We wanted a globally accessible judge that can:

- Run repeatable task suites against any AI-agent GitHub repo  
- Summarize failures and metrics into a single “trust score”  
- Use autonomous coding agents to propose code fixes via pull requests  

### What it does

1. You paste a GitHub repo URL in the web UI and choose an evaluation suite.  
2. Kestra orchestrates a workflow that runs the agent on real tasks using Together AI models and collects logs/metrics.  
3. Oumi turns those metrics into a 0–100 trust score with explanations.  
4. Cline uses the failure summary to generate code changes and opens a PR, which is then reviewed by CodeRabbit.  
5. The Vercel dashboard shows you the score, failure cases, and links to the fix PRs.

**Live demo:** _link coming soon_  
**Demo video:** _link coming soon_

### How this aligns with AI Agents Assemble

- **Potential Impact:** Any team in the world can quickly understand if their AI agents are reliable, safe, and cost-efficient by running our judge on their GitHub repo.  
- **Creativity & Originality:** We use agents to evaluate agents – orchestration with Kestra, autonomous coding with Cline, model evaluation with Oumi, and OSS-quality workflows with CodeRabbit.  
- **Technical Implementation:** Each sponsor stone is a first-class part of the pipeline: Cline (coding agent), Kestra (data and workflow engine), Oumi (reliability scoring), Together AI (task execution), Vercel (deployment), CodeRabbit (reviews).  
- **Aesthetics & UX:** A simple Vercel dashboard that hides complexity and gives a single trust score plus clear next steps.  
- **Presentation & Communication:** Clear architecture, public repo, and a short demo video showing an end-to-end run.

We are targeting: **Infinity Build Award, Wakanda Data Award, Iron Intelligence Award, Stormbreaker Deployment Award, and Captain Code Award.**


