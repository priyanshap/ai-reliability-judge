# AI Agent Reliability Dimensions
Our AI Reliability Judge scores agents across five dimensions inspired by industry reliability frameworks. [

1. Task robustness
   - How consistently the agent completes its intended tasks without getting stuck, looping, or crashing.

2. Tool & API safety
   - How safely and correctly the agent calls tools and external APIs (argument validation, retries, timeout handling).

3. Prompt & guardrail hygiene
   - How well the agent resists prompt injection, follows system instructions, and avoids unsafe behaviors.

4. Observability & logging
   - How traceable the agent’s behavior is: structured logs, error reporting, and decision traces.

5. Recovery & fallback behavior
   - How the agent behaves when something goes wrong (graceful failure, fallbacks, user-friendly error messages).

## Dimension → Test mapping
1. Task robustness
   - Test: “Happy-path scenario completion”
   - Test: “Idempotent re-run”

2. Tool & API safety
   - Test: “Invalid tool input handling”
   - Test: “Timeout / retry handling”

3. Prompt & guardrail hygiene
   - Test: “Prompt injection resistance”
   - Test: “System instruction obedience”

4. Observability & logging
   - Test: “Structured error logging present”
   - Test: “Traceability of key decisions”

5. Recovery & fallback behavior
   - Test: “Graceful failure message”
   - Test: “Fallback to safer action instead of crash”

