// lib/github.ts
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

if (!owner || !repo || !process.env.GITHUB_TOKEN) {
  console.warn(
    "[GitHub] Missing GITHUB_OWNER, GITHUB_REPO, or GITHUB_TOKEN env vars. " +
      "PR creation will fail until these are configured."
  );
}

// Treat auth / permission / rate-limit issues as soft errors
function isSoftGitHubError(status?: number) {
  return status === 401 || status === 403 || status === 429;
}

export async function createFixPr(repoUrl: string) {
  console.log("[GitHub] Creating fix PR", { owner, repo, repoUrl });

  // 1. Get default branch + latest commit
  const repoInfo = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });
  const baseBranch = repoInfo.data.default_branch;
  console.log("[GitHub] Default branch:", baseBranch);

  // Generate a short, mostly unique branch suffix
  const safeSuffix = Date.now().toString(36);
  const branchName = `ai-reliability-fix-${safeSuffix}`;

  // 2. Get latest commit SHA on default branch
  const ref = await octokit.request(
    "GET /repos/{owner}/{repo}/git/ref/{ref}",
    {
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    }
  );
  const latestSha = (ref.data as any).object.sha as string;
  console.log("[GitHub] Latest commit SHA:", latestSha);

  // 3. Create new branch from that commit (with logging)
  try {
    await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: latestSha,
    });
    console.log("[GitHub] Created branch", branchName);
  } catch (error: any) {
    console.error(
      "[GitHub] create ref error:",
      error?.status,
      error?.message,
      error?.response?.data
    );
    if (isSoftGitHubError(error?.status)) {
      // Skip PR creation; caller will continue without prUrl
      return null;
    }
    throw error;
  }

  // 4. Create or update a simple file in that branch
  const filePath = "ai-reliability-fix.txt";
  const bodyText = `Automated reliability fix suggestion for ${repoUrl} at ${new Date().toISOString()}\n`;
  const content = Buffer.from(bodyText).toString("base64");

  // Try to fetch existing file to decide between create / update
  let existingSha: string | undefined;
  try {
    const existing = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: filePath,
        ref: branchName,
      }
    );
    // @ts-expect-error GitHub types are broad here
    existingSha = existing.data.sha;
    console.log("[GitHub] Updating existing file on branch", branchName);
  } catch {
    existingSha = undefined;
    console.log("[GitHub] Creating new file on branch", branchName);
  }

  try {
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: filePath,
      message: "Add AI reliability fix note",
      content,
      branch: branchName,
      sha: existingSha,
    });

    // 5. Create PR
    const prBodyLines = [
      `This PR was opened automatically as a demo fix for ${repoUrl}.`,
      "",
      "What this PR demonstrates:",
      "- The AI Reliability Judge evaluated your agent repository.",
      "- It created a branch and committed a small marker file.",
      "- It opened this pull request so you can review and iterate.",
    ];

    const pr = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner,
      repo,
      title: "AI Reliability Judge – automated fix suggestion",
      head: branchName,
      base: baseBranch,
      body: prBodyLines.join("\n"),
    });

    console.log("[GitHub] Created PR:", pr.data.html_url);
    return pr.data.html_url;
  } catch (error: any) {
    console.error(
      "[GitHub] file or PR error:",
      error?.status,
      error?.message,
      error?.response?.data
    );
    if (isSoftGitHubError(error?.status)) {
      return null;
    }
    throw error;
  }
}
