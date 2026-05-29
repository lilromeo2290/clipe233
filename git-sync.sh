#!/bin/bash
# ============================================================
# Clipe233 Engineers - Git Auto-Sync Script
# Periodically commits and pushes changes to GitHub
# Repository: https://github.com/lilromeo2290/clipe233.git
# ============================================================

set -e

PROJECT_DIR="/home/z/my-project"
LOG_FILE="$PROJECT_DIR/git-sync.log"
REPO_URL="https://github.com/lilromeo2290/clipe233.git"

cd "$PROJECT_DIR"

# Ensure remote is configured
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ "$CURRENT_REMOTE" != "$REPO_URL" ]; then
    git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"
fi

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] No changes to commit." >> "$LOG_FILE"
    exit 0
fi

# Stage all changes
git add -A

# Generate commit message with timestamp
COMMIT_MSG="auto-sync: $(date '+%Y-%m-%d %H:%M:%S') - project update"

# Commit
git commit -m "$COMMIT_MSG" --allow-empty-message 2>/dev/null || {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Nothing to commit (possibly empty commit)." >> "$LOG_FILE"
    exit 0
}

# Push
PUSH_OUTPUT=$(git push origin main 2>&1) || {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] PUSH FAILED: $PUSH_OUTPUT" >> "$LOG_FILE"
    exit 1
}

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Committed and pushed: $COMMIT_MSG" >> "$LOG_FILE"

# Update worklog
cat >> "$PROJECT_DIR/worklog.md" << EOF

---
Task ID: auto-sync
Agent: git-sync.sh
Task: Periodic auto-commit and push to GitHub

Work Log:
- Staged all changes with git add -A
- Committed with message: $COMMIT_MSG
- Pushed to origin/main

Stage Summary:
- Successfully synced local changes to GitHub repository
- Repository: https://github.com/lilromeo2290/clipe233.git
EOF

echo "Sync complete: $COMMIT_MSG"
