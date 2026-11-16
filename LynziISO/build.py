#!/usr/bin/env python3
"""Scan the ISO image folder and build manifest.js + thumbnails for index.html.

Usage:  python3 LynziISO/build.py            (scans LynziISO/ISO2)
        python3 LynziISO/build.py ISOs       (scan a different folder)
Re-run whenever images are added, then reload LynziISO/index.html.

Expected layout (ISO2):
  <Category>/<Brand - product types>/Photo <date>.jpg
  e.g. Fashion/⭐️ Selkie - Top 20 - clothing + handbags + swimwear/Photo ....jpg
       Home/Anthropologie/Photo ....jpg
       Clothing Logs/Photo ....jpg

Outputs (all gitignored):
  manifest.js   - window.ISO_DATA = [...] every image with brand, tags, dates
  .thumbs/      - ~480px JPEG thumbnails made with macOS `sips`
"""
import json
import os
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT_NAME = sys.argv[1] if len(sys.argv) > 1 else "ISO2"
SRC = os.path.join(HERE, ROOT_NAME)
THUMBS = os.path.join(HERE, ".thumbs")
OUT = os.path.join(HERE, "manifest.js")
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".gif"}
THUMB_PX = 480

# Filenames look like "Photo Aug 01 2025, 4 40 25 PM.jpg"
PHOTO_RE = re.compile(r"(\w{3}) (\d{1,2}) (\d{4}), (\d{1,2}) (\d{2}) (\d{2}) ([AP]M)")
STAR_RE = re.compile(r"^\s*⭐️?\s*")

# Fold near-duplicate product types together
TAG_ALIASES = {
    "accessorie": "accessories", "shoes": "footwear", "cowgirl boots": "footwear",
    "bags": "handbags", "novelty bags": "handbags", "beach bags": "handbags",
    "swim": "swimwear", "glasses": "eyewear", "pajamas": "sleepwear", "nightgowns": "sleepwear",
    "t-shirts": "shirts", "bookish shirts": "shirts", "tees & sweatshirts": "shirts",
    "lingerie": "intimates", "athleticwear": "activewear", "gowns": "dresses",
    "sweaters": "knitwear", "berets": "headwear", "denim": "jeans",
}


def photo_date(name):
    m = PHOTO_RE.search(name)
    if not m:
        return None
    mon, day, year, h, mi, s, ampm = m.groups()
    try:
        dt = datetime.strptime(f"{mon} {day} {year} {h}:{mi}:{s} {ampm}", "%b %d %Y %I:%M:%S %p")
    except ValueError:
        return None
    return int(dt.timestamp() * 1000)


def parse_brand_folder(name):
    """'⭐️ Selkie - Top 20 - clothing + handbags' -> ('Selkie', True, ['clothing', 'handbags'])"""
    top = bool(STAR_RE.match(name)) or " - Top 20" in name
    name = STAR_RE.sub("", name).strip()
    parts = [p.strip() for p in name.split(" - ")]
    brand = parts[0]
    tags = []
    if len(parts) > 1:
        raw = parts[-1] if parts[-1].lower() != "top 20" else ""
        for t in re.split(r"\s*(?:\+|,|\band\b)\s*", raw):
            t = t.strip().lower()
            if t:
                t = TAG_ALIASES.get(t, t)
                if t not in tags:
                    tags.append(t)
    return brand, top, tags


def make_thumb(job):
    src, dst = job
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return True
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    r = subprocess.run(
        ["sips", "-Z", str(THUMB_PX), "-s", "format", "jpeg",
         "-s", "formatOptions", "70", src, "--out", dst],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    return r.returncode == 0


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"Can't find {SRC}")

    # Thumbnails from an older folder layout are just clutter now
    if os.path.isdir(THUMBS):
        for d in os.listdir(THUMBS):
            if d != ROOT_NAME:
                shutil.rmtree(os.path.join(THUMBS, d), ignore_errors=True)

    items, jobs = [], []
    for root, dirs, files in os.walk(SRC):
        dirs.sort()
        for f in sorted(files):
            if os.path.splitext(f)[1].lower() not in EXTS:
                continue
            full = os.path.join(root, f)
            rel_src = os.path.relpath(full, SRC)
            folders = rel_src.split(os.sep)[:-1]          # ["Fashion", "⭐️ Selkie - Top 20 - ..."]
            category = folders[0].strip() if folders else "(top level)"
            if len(folders) >= 2:
                brand, top, tags = parse_brand_folder(folders[1])
            else:
                brand, top, tags = category, False, []
            st = os.stat(full)
            thumb_rel = os.path.join(".thumbs", ROOT_NAME, os.path.splitext(rel_src)[0] + ".jpg")
            jobs.append((full, os.path.join(HERE, thumb_rel)))
            items.append({
                "p": os.path.relpath(full, HERE).replace(os.sep, "/"),
                "t": thumb_rel.replace(os.sep, "/"),
                "c": category,
                "br": brand,
                "top": top,
                "tg": tags,
                "fd": "/".join(x.strip() for x in folders),   # raw folder path, for search
                "n": f,
                "m": int(st.st_mtime * 1000),                  # file last modified
                "d": photo_date(f),                            # date in filename (screenshot taken)
                "s": st.st_size,
            })

    print(f"Found {len(items)} images in {ROOT_NAME}/. Making thumbnails (first run takes a minute or two)...")
    done = ok = 0
    with ThreadPoolExecutor(max_workers=os.cpu_count() or 8) as ex:
        for res in ex.map(make_thumb, jobs):
            done += 1
            ok += bool(res)
            if done % 500 == 0 or done == len(jobs):
                print(f"  {done}/{len(jobs)}", flush=True)

    for it, (_, dst) in zip(items, jobs):
        if not os.path.exists(dst):
            it["t"] = it["p"]   # fall back to the full image

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// Generated by build.py - do not edit\n")
        fh.write(f"window.ISO_ROOT = {json.dumps(ROOT_NAME)};\n")
        fh.write(f"window.ISO_BUILT = {int(datetime.now().timestamp() * 1000)};\n")
        fh.write("window.ISO_DATA = ")
        json.dump(items, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")

    print(f"Wrote {OUT} ({len(items)} images, {len(items) - ok} thumbnail failures)")
    print(f"Open: {os.path.join(HERE, 'index.html')}")


if __name__ == "__main__":
    main()
