#!/bin/bash
# Stop the git sync daemon
PID_FILE="/home/z/my-project/.git-sync-daemon.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID" 2>/dev/null
        # Also kill child sleep processes
        pkill -P "$PID" 2>/dev/null
        echo "Stopped git sync daemon (PID $PID)"
    else
        echo "Daemon not running (stale PID file)"
    fi
    rm -f "$PID_FILE"
else
    echo "No PID file found - daemon not running"
fi
