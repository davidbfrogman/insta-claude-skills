#!/usr/bin/env bash
# Render every Instagram template in index.html to a 1:1 PNG in ./exports
# Usage: ./export-cards.sh            (uses Google Chrome on macOS)
#        CHROME=/path/to/chrome ./export-cards.sh
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p exports
# id:width:height
for spec in reel-cover:1080:1920 stat:1080:1350 race:1080:1920 steps:1080:1350 manifesto:1080:1350 faq:1080:1350 end:1080:1350; do
  IFS=: read -r id w h <<<"$spec"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=6000 --window-size="$w,$h" \
    --screenshot="exports/$id.png" "file://$PWD/index.html?card=$id" >/dev/null 2>&1
  echo "exports/$id.png  (${w}x${h})"
done
