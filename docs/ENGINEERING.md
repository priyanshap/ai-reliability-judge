# Engineering workflow (AI Agents Assemble)

This document explains how AI Reliability Judge is built and maintained using AI engineering tools.

## Tools

- **Cline (VS Code autonomous dev)**  
  - Used to plan changes, refactor the evaluator pipeline, and generate new modules like `lib/githubMetrics.ts`.  
  - Runs inside VS Code with access to the full workspace and terminal.

- **CodeRabbit (AI PR reviewer)**  
  - Installed on the GitHub repo as a PR review bot.  
  - Reviews every pull request, leaving inline comments, severity labels, and a short summary/poem.

- **Vercel (deployment)**  
  - Connected to this GitHub repository.  
  - Automatically builds and deploys the app when changes are merged into `main`.

## Workflow

1. **Plan and implement with Cline**

   - Open the repository in VS Code and start Cline.  
   - Describe the task (for example: “Refactor lib/evaluator.ts into a cleaner pipeline and keep /app/api/run/route.ts as a thin handler.”).  
   - Let Cline propose edits, review the diffs, and approve the changes.  
   - Example Cline-authored pull requests:
     - `Refactor evaluator pipeline with Cline` (PR #2)  
     - `Add GitHub metrics scaffold via Cline` (PR #3)

2. **Create a feature branch and open a PR**

   - From the terminal:

     ```
     git checkout -b feature/<short-name>
     git status
     git add <changed files>
     git commit -m "<
