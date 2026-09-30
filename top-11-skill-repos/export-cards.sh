#!/usr/bin/env bash
# Render all 11 cards to 1080x1920 PNGs (finished frame) in ./exports
# Usage: ./export-cards.sh     (uses Google Chrome on macOS; override with CHROME=...)
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p exports
for i in 01 02 03 04 05 06 07 08 09 10 11; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=5000 --window-size=1080,1920 \
    --screenshot="exports/card-$i.png" "file://$PWD/index.html?card=$i&still" >/dev/null 2>&1
  echo "exports/card-$i.png"
done
