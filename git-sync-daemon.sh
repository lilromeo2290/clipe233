#!/bin/bash
# ============================================================
# Clipe233 Engineers - Git Auto-Sync Daemon
# Runs in background, commits and pushes every 5 minutes
# Repository: https://github.com/lilromeo2290/clipe233.git
# ============================================================

PROJECT_DIR="/home/z/my-project"
SYNC_SCRIPT="$PROJECT_DIR/git-sync.sh"
PID_FILE="$PROJECT_DIR/.git-sync-daemon.pid"
LOG_FILE="$PROJECT_DIR/git-sync-daemon.log"
INTERVAL=300  # 5 minutes

# Check if already running
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "Daemon already running with PID $OLD_PID"
        exit 0
    fi
fi

# Start daemon loop
(
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Git sync daemon started (PID $$)" >> "$LOG_FILE"
    echo $$ > "$PID_FILE"

    while true; do
        bash "$SYNC_SCRIPT" >> "$LOG_FILE" 2>&1
        sleep "$INTERVAL"
    done
) &

DAEMON_PID=$!
echo $DAEMON_PID > "$PID_FILE"
echo "Git sync daemon started with PID $DAEMON_PID"
echo "Syncing every $INTERVAL seconds (5 minutes)"
echo "Log file: $LOG_FILE"
echo ""
echo "To stop: kill $DAEMON_PID"
echo "To check status: cat $PID_FILE"
