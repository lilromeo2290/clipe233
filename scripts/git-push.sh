#!/bin/bash
# ============================================================
# Clipe233 Engineers — Git Commit & Push Helper
# ============================================================
# Usage:
#   bash /home/z/my-project/scripts/git-push.sh "Your commit message"
#
# This script will:
#   1. Show current git status
#   2. Stage all changes (git add -A)
#   3. Commit with the provided message
#   4. Pull --rebase to sync with remote
#   5. Push to origin/main
#   6. Append an entry to /home/z/my-project/worklog.md
# ============================================================

set -e

# ── Colors ─────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ── Args ───────────────────────────────────────────────────
COMMIT_MSG="${1:-}"
REPO_DIR="/home/z/my-project"
WORKLOG="${REPO_DIR}/worklog.md"

if [ -z "$COMMIT_MSG" ]; then
  echo -e "${RED}Error: Commit message required${NC}"
  echo -e "Usage: bash $0 \"Your commit message\""
  exit 1
fi

cd "$REPO_DIR"

# ── Check for changes ─────────────────────────────────────
if git diff --quiet HEAD && git diff --cached --quiet HEAD && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo -e "${YELLOW}Nothing to commit — working tree is clean${NC}"
  exit 0
fi

# ── Step 1: Show status ───────────────────────────────────
echo -e "${CYAN}=== Git Status ===${NC}"
git status --short
echo ""

# ── Step 2: Stage ─────────────────────────────────────────
echo -e "${CYAN}=== Staging changes ===${NC}"
git add -A
echo -e "${GREEN}✓ Staged${NC}"

# ── Step 3: Commit ────────────────────────────────────────
echo -e "${CYAN}=== Committing ===${NC}"
git commit -m "$COMMIT_MSG"
COMMIT_SHA=$(git rev-parse --short HEAD)
echo -e "${GREEN}✓ Committed as ${COMMIT_SHA}${NC}"

# ── Step 4: Pull --rebase ─────────────────────────────────
echo -e "${CYAN}=== Syncing with remote ===${NC}"
if git pull --rebase origin main 2>&1 | grep -q "Successfully rebased"; then
  echo -e "${GREEN}✓ Rebased${NC}"
elif git pull --rebase origin main 2>&1 | grep -q "up to date"; then
  echo -e "${GREEN}✓ Already up to date${NC}"
else
  # Rebase may have already succeeded silently
  echo -e "${YELLOW}! Pull --rebase completed${NC}"
fi

# ── Step 5: Push ──────────────────────────────────────────
echo -e "${CYAN}=== Pushing to origin/main ===${NC}"
git push origin main
echo -e "${GREEN}✓ Pushed${NC}"

# ── Step 6: Append to worklog ─────────────────────────────
echo -e "${CYAN}=== Updating worklog ===${NC}"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Get list of changed files in this commit
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD)

# Build worklog entry
{
  echo ""
  echo "---"
  echo "Date: ${TIMESTAMP}"
  echo "Author: $(git config user.name 2>/dev/null || echo 'Developer')"
  echo "Commit: ${COMMIT_SHA}"
  echo "Task: ${COMMIT_MSG}"
  echo ""
  echo "Changes:"
  echo "$CHANGED_FILES" | while read -r file; do
    [ -n "$file" ] && echo "- ${file}"
  done
} >> "$WORKLOG"

echo -e "${GREEN}✓ Worklog updated${NC}"

# ── Final Summary ─────────────────────────────────────────
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  ✓ Done!${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "  Commit: ${COMMIT_SHA}"
echo -e "  Message: ${COMMIT_MSG}"
echo -e "  Files changed: $(echo "$CHANGED_FILES" | wc -l)"
echo -e "  Worklog: ${WORKLOG}"
echo -e "${GREEN}============================================${NC}"
