import sys
import requests

def fetch_repo_metrics(owner: str, name: str):
    url = f"https://api.github.com/repos/{owner}/{name}"
    try:
        resp = requests.get(
            url,
            headers={"Accept": "application/vnd.github+json"},
            timeout=10,
        )
    except requests.RequestException:
        return None

    if resp.status_code != 200:
        return None

    try:
+       data = resp.json()
+   except ValueError:
+       return None
+    
    stars = data.get("stargazers_count", 0)
    issues = data.get("open_issues_count", 0)
    return {"stars": stars, "open_issues": issues}


def score_repo(metrics):
    stars = metrics["stars"]
    issues = metrics["open_issues"]

    base = min(stars / 50.0, 5.0)
    penalty = min(issues / 25.0, 5.0)
    raw = max(base - penalty, 0.0)
    score = round(raw * 20)

    if score >= 70:
        risk = "Low"
    elif score >= 40:
        risk = "Medium"
    else:
        risk = "High"

    return {"score": score, "risk": risk}

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: python {sys.argv[0]} <owner> <repo>")
        sys.exit(1)

    owner, name = sys.argv[1], sys.argv[2]
    metrics = fetch_repo_metrics(owner, name)
    if metrics is None:
        print("Error: could not fetch metrics for that repo.")
        sys.exit(1)

    result = score_repo(metrics)
    print(f"Stars: {metrics['stars']}, Open issues: {metrics['open_issues']}")
    print(f"Oumi-style reliability score: {result['score']}/100 ({result['risk']} risk)")
