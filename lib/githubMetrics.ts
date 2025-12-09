// ============================================================================
// Types
// ============================================================================

export type GitHubRepo = {
  owner: string;
  name: string;
};

// ============================================================================
// URL Parsing
// ============================================================================

/**
 * Parses a GitHub repository URL and extracts owner and name.
 * 
 * Supports formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - github.com/owner/repo
 * - owner/repo
 * 
 * @param repoUrl - The GitHub repository URL to parse
 * @returns GitHubRepo object with owner and name, or null if invalid
 */
export function parseRepoUrl(repoUrl: string): GitHubRepo | null {
  if (!repoUrl || typeof repoUrl !== "string") {
    return null;
  }

  // Clean up the URL
  let url = repoUrl.trim();

  // Remove protocol if present
  url = url.replace(/^https?:\/\//, "");

  // Remove github.com/ prefix if present
  url = url.replace(/^github\.com\//, "");

  // Remove .git suffix if present
  url = url.replace(/\.git$/, "");

  // Remove trailing slashes
  url = url.replace(/\/$/, "");

  // Split by slash to get owner/repo
  const parts = url.split("/");

  // Valid GitHub repo should have exactly 2 parts (owner/name)
  if (parts.length !== 2) {
    return null;
  }

  const [owner, name] = parts;

  // Validate that both parts exist and are non-empty
  if (!owner || !name || owner.trim() === "" || name.trim() === "") {
    return null;
  }

  return {
    owner: owner.trim(),
    name: name.trim(),
  };
}
