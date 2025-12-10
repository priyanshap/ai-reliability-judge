# Golden-path demo: LangGraph example
For the demo, we always start from this repo:

https://github.com/langchain-ai/langgraph-example

Why this repo?
- It is an official example from the LangGraph project, which focuses on building resilient AI agents as graphs.
- It contains a realistic agent setup with tools and prompts, so our reliability tests and auto-fix PR have something meaningful to analyze.

Demo flow:
1. Paste (or keep) the default URL: https://github.com/langchain-ai/langgraph-example.
2. Click "Run reliability evaluation".
3. Wait for the score and reliability breakdown table.
4. Open the suggested GitHub PR to see how AI Reliability Judge proposes to harden the agent.
