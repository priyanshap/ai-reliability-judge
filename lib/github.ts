import { Octokit } from "@octokit/core";

// Use the default GitHub REST base URL (https://api.github.com)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

export async function createFixPr(repoUrl: string) {
  // 1. Get default branch + latest commit
  const repoInfo = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  const baseBranch = repoInfo.data.default_branch;
  const branchName = `ai-reliability-fix-${Date.now()}`;

  // 2. Get latest commit SHA on default branch
  const ref = await octokit.request(
    "GET /repos/{owner}/{repo}/git/ref/{ref}",
    {
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    }
  );

  const latestSha = ref.data.object.sha;

  // 3. Create new branch from that commit (with logging)
  try {
    await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: latestSha,
    });
  } catch (error: any) {
    console.error(
      "GitHub create ref error:",
      error.status,
      error.message,
      error.response?.data
    );
    throw error;
  }

  // 4. Create or update a simple file in that branch
  const filePath = "ai-reliability-fix.txt";
  const content = Buffer.from(
    `Automated reliability fix suggestion for ${repoUrl} at ${new Date().toISOString()}\n`
  ).toString("base64");

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
    // @ts-expect-error - type narrowing simplified
    existingSha = existing.data.sha;
  } catch {
    existingSha = undefined;
  }

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
  const pr = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    title: "AI Reliability Judge – automated fix suggestion",
    head: branchName,
    base: baseBranch,
    body: `This PR was opened automatically as a demo fix for ${repoUrl}.`,
  });

  return pr.data.html_url;
}
