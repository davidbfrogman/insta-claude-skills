#!/usr/bin/env bash
# Dump all top-level HTML guides to markdown in ./markdown/
set -euo pipefail

cd "$(dirname "$0")"
outdir="markdown"
mkdir -p "$outdir"

shopt -s nullglob
for f in *.html; do
  base="${f%.html}"
  base="${base%.dc}"                 # strip .dc suffix
  base="${base// /_}"                # no spaces in output names
  pandoc "$f" \
    --from=html \
    --to=gfm-raw_html \
    --lua-filter=unwrap.lua \
    --wrap=none \
    --strip-comments \
    -o "$outdir/$base.md"
  printf '%s -> %s/%s.md\n' "$f" "$outdir" "$base"
done
