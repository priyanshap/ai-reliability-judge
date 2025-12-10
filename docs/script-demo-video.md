# Demo video script (2–3 min)

## 1. Hook and setup (20–30 sec)
“Let’s see how AI Reliability Judge actually works.

Imagine you’re about to ship a new agent version. You have tests for your code, but nothing that tells you whether the agent itself is robust. Here’s how we turn that into a one-click check.”

[On screen: browser, app already open.]

## 2. Paste repo and run (30–40 sec)
“On the left, there’s just one main input: a GitHub URL.

For the demo, we use the official LangGraph example repo, which is a real agent project. I keep the default URL and click ‘Run reliability evaluation.’”

[On screen: show default `https://github.com/langchain-ai/langgraph-example`, click the button, brief loading.]

“As the run executes, the app runs a suite of reliability tests behind the scenes and calculates a score from 0 to 100.”

## 3. Read the score and breakdown (40–50 sec)
“When the run completes, we get a big reliability score at the top.

Below that is the breakdown table. Each row is a named test mapped to a reliability dimension like robustness, safety, or observability, with pass/fail icons and partial scores. This makes it easy for a judge or engineer to see not just the number, but why it looks like that.”

[On screen: slowly scroll through tests table, point with cursor to names, status, and impact.]

## 4. Open the auto-fix PR (30–40 sec)
“Next, we link directly to an auto-generated GitHub pull request.

Clicking the PR link opens GitHub in a new tab. Here you can see the branch, the diff, and the commit message. Each change is tied to a failed test — for example tightening a timeout, adding logging, or adjusting a risky config.”

[On screen: click PR link, show diff briefly.]

“This means the judge doesn’t just say ‘your agent is unreliable’; it actually proposes how to fix it.”

## 5. Show run history panel (20–30 sec)
“Back in the app, the Recent runs panel on the right shows the last few repos we evaluated, their scores, and quick links to their PRs.

This makes it easy to compare different versions or different repos, and to prove that teams actually used the tool during the hackathon.”

[On screen: hover over history items, show score and PR arrows.]

## 6. Close (15–20 sec)
“So that’s AI Reliability Judge in action: paste a repo, run the judge, read the score and breakdown, and open a ready-made PR to harden your agent.

It turns AI agent reliability from a guess into something you can measure, compare, and ship with confidence.”
