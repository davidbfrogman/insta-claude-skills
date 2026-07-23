#!/usr/bin/env bash
# Merge markdown/*.md into one master doc with a table of contents.
set -euo pipefail

cd "$(dirname "$0")"
srcdir="markdown"
# Written outside srcdir so re-running never folds the master into itself.
out="MASTER_GUIDE.md"

shopt -s nullglob
files=("$srcdir"/*.md)
if [ ${#files[@]} -eq 0 ]; then
  echo "No markdown files in $srcdir/ — run ./html2md.sh first." >&2
  exit 1
fi

{
  printf '# Master Guide Collection\n\n'
  printf '%d guides, merged %s.\n\n' "${#files[@]}" "$(date '+%Y-%m-%d')"

  printf '## Contents\n\n'
  for f in "${files[@]}"; do
    base="$(basename "$f" .md)"
    printf -- '- %s\n' "$base"
  done
  printf '\n'

  for f in "${files[@]}"; do
    base="$(basename "$f" .md)"
    printf -- '\n---\n\n'
    printf '# GUIDE: %s\n\n' "$base"
    cat "$f"
    printf '\n'
  done
} > "$out"

printf 'Merged %d guides -> %s (%s)\n' "${#files[@]}" "$out" "$(du -h "$out" | cut -f1)"
