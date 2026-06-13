#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting server..." >> /tmp/nextalive.log
  npx next dev -p 3000 >> /tmp/nextalive.log 2>&1
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE, restarting in 3s..." >> /tmp/nextalive.log
  sleep 3
done
