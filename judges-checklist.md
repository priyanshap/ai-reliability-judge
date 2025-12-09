# Judges Checklist
This file maps the official judging criteria to concrete aspects of AI Reliability Judge. [web:426]


## Potential Impact
- Addresses the problem of unreliable AI agents in production.
- Works with any public AI agent repo, making it broadly applicable.

## Creativity & Originality
- Treats agent reliability like test coverage / observability, not just another agent.
- Automatically opens GitHub PRs with suggested fixes for failed reliability tests.

## Technical Implementation
- Next.js frontend with clean UX for running evaluations and viewing results.
- Backend evaluator returning structured test results across five reliability dimensions.
- GitHub integration that creates branches and pull requests programmatically.

## Aesthetics & User Experience
- Single-screen flow with clear copy and guidance.
- Reliability breakdown table showing test names, dimensions, impact, and status.
- Warning when a repo does not appear to be an AI agent project.

## Learning & Growth
- Team explored industry frameworks for agent reliability and translated them into dimensions and tests.
- Documentation in `docs/reliability.md` and `docs/value-prop.md` captures this learning.

## Presentation & Communication
- README explains problem, solution, setup, and usage clearly.
- Demo flow: paste repo → run evaluation → review score and test breakdown → open PR.
