#!/usr/bin/env python3
"""
reddit_fetch.py — compact Reddit fetcher for qualitative research.

Fetches permitted public Reddit JSON, recursively flattens post/comment trees,
discards irrelevant metadata, and emits compact Markdown or JSON containing
body, score, date, depth and permalink.

Subcommands
-----------
  thread   Fetch one post + its comments, flattened.
  search   Find candidate threads (compact list, no comment bodies).
  listing  Pull hot/top/new from a subreddit.
  harvest  Run many queries, dedupe, fetch the best threads, write files + index.

Auth
----
Works unauthenticated against the public .json endpoints. If REDDIT_CLIENT_ID
and REDDIT_CLIENT_SECRET are set (a free "script" app), it uses the authenticated
OAuth endpoints instead, which have a far higher rate limit.

This script only reads publicly accessible data through documented endpoints.
It does not and must not be used to defeat authentication, rate limiting,
robots directives, blocking, or CAPTCHAs.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

PUBLIC_BASE = "https://www.reddit.com"
OAUTH_BASE = "https://oauth.reddit.com"
DEFAULT_UA = os.environ.get(
    "REDDIT_UA", "python:reddit-market-researcher:1.0 (qualitative research script)"
)

_token_cache: dict[str, object] = {}


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


class RedditError(RuntimeError):
    pass


# --------------------------------------------------------------------------
# HTTP
# --------------------------------------------------------------------------


def get_token() -> str | None:
    """Return an app-only OAuth token if credentials are configured."""
    cid = os.environ.get("REDDIT_CLIENT_ID")
    secret = os.environ.get("REDDIT_CLIENT_SECRET")
    if not cid or not secret:
        return None

    cached = _token_cache.get("token")
    if cached and float(_token_cache.get("expires", 0)) > time.time() + 60:
        return str(cached)

    data = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode()
    basic = base64.b64encode(f"{cid}:{secret}".encode()).decode()
    req = urllib.request.Request(
        f"{PUBLIC_BASE}/api/v1/access_token",
        data=data,
        headers={"Authorization": f"Basic {basic}", "User-Agent": DEFAULT_UA},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:  # noqa: BLE001 - fall back to anonymous
        log(f"[warn] OAuth token request failed ({exc}); continuing unauthenticated.")
        return None

    token = payload.get("access_token")
    if not token:
        return None
    _token_cache["token"] = token
    _token_cache["expires"] = time.time() + float(payload.get("expires_in", 3600))
    log("[info] using authenticated Reddit endpoints")
    return token


def api_get(path: str, params: dict | None = None, retries: int = 4, sleep: float = 1.0):
    """GET a Reddit JSON endpoint with polite retries. Returns parsed JSON."""
    token = get_token()
    params = dict(params or {})
    params.setdefault("raw_json", 1)

    if token:
        base, clean = OAUTH_BASE, path[:-5] if path.endswith(".json") else path
        headers = {"Authorization": f"bearer {token}", "User-Agent": DEFAULT_UA}
    else:
        base = PUBLIC_BASE
        clean = path if path.endswith(".json") else path.rstrip("/") + ".json"
        headers = {"User-Agent": DEFAULT_UA}

    url = f"{base}{clean}?{urllib.parse.urlencode(params)}"
    delay = sleep

    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=45) as resp:
                return json.loads(resp.read().decode("utf-8", "replace"))
        except urllib.error.HTTPError as exc:
            if exc.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                wait = delay * (2**attempt)
                log(f"[warn] HTTP {exc.code} on {clean}; retrying in {wait:.1f}s")
                time.sleep(wait)
                continue
            if exc.code in (401, 403):
                raise RedditError(
                    f"HTTP {exc.code} for {clean}. Reddit is refusing anonymous access from "
                    "this network. Set REDDIT_CLIENT_ID/REDDIT_CLIENT_SECRET, or fall back to "
                    "ordinary web fetch tools. Do not attempt to bypass this."
                ) from exc
            raise RedditError(f"HTTP {exc.code} for {clean}") from exc
        except urllib.error.URLError as exc:
            if attempt < retries - 1:
                time.sleep(delay * (2**attempt))
                continue
            raise RedditError(f"Network error for {clean}: {exc.reason}") from exc

    raise RedditError(f"Gave up on {clean}")


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------


def iso_date(created_utc) -> str:
    try:
        return datetime.fromtimestamp(float(created_utc), timezone.utc).strftime("%Y-%m-%d")
    except (TypeError, ValueError):
        return ""


def full_url(permalink: str) -> str:
    if not permalink:
        return ""
    return permalink if permalink.startswith("http") else f"https://www.reddit.com{permalink}"


def clean_body(text: str, max_chars: int) -> str:
    if not text:
        return ""
    text = text.replace("\r\n", "\n").replace("&amp;", "&").replace("&gt;", ">").replace("&lt;", "<")
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if max_chars and len(text) > max_chars:
        text = text[:max_chars].rstrip() + " […truncated]"
    return text


def parse_thread_id(ref: str) -> str:
    """Accept a full URL, a permalink, t3_xxx, or a bare post id."""
    ref = ref.strip()
    match = re.search(r"/comments/([a-z0-9]+)", ref, re.I)
    if match:
        return match.group(1)
    match = re.search(r"redd\.it/([a-z0-9]+)", ref, re.I)
    if match:
        return match.group(1)
    return re.sub(r"^t3_", "", ref)


# --------------------------------------------------------------------------
# Flattening
# --------------------------------------------------------------------------


def post_record(data: dict, max_body_chars: int) -> dict:
    return {
        "type": "post",
        "id": data.get("id", ""),
        "title": data.get("title", ""),
        "subreddit": data.get("subreddit", ""),
        "score": data.get("score", 0),
        "num_comments": data.get("num_comments", 0),
        "date": iso_date(data.get("created_utc")),
        "permalink": full_url(data.get("permalink", "")),
        "flair": data.get("link_flair_text") or "",
        "url": data.get("url_overridden_by_dest") or "",
        "body": clean_body(data.get("selftext", ""), max_body_chars),
    }


def flatten_comments(children, opts, depth=0, out=None, stats=None):
    """Recursively walk a comment forest, emitting compact records."""
    if out is None:
        out, stats = [], {"more": 0, "seen": 0}

    for child in children or []:
        kind = child.get("kind")
        data = child.get("data") or {}

        if kind == "more":
            stats["more"] += int(data.get("count") or len(data.get("children") or []))
            continue
        if kind != "t1":
            continue

        body = data.get("body") or ""
        stats["seen"] += 1
        score = data.get("score", 0) or 0
        dropped = body in ("[deleted]", "[removed]", "") or score < opts["min_score"]

        if not dropped:
            out.append(
                {
                    "type": "comment",
                    "depth": depth,
                    "score": score,
                    "date": iso_date(data.get("created_utc")),
                    "permalink": full_url(data.get("permalink", "")),
                    "body": clean_body(body, opts["max_body_chars"]),
                }
            )

        replies = data.get("replies")
        if isinstance(replies, dict) and depth + 1 <= opts["max_depth"]:
            flatten_comments(
                (replies.get("data") or {}).get("children"), opts, depth + 1, out, stats
            )

    return out, stats


def cap_comments(comments: list[dict], max_comments: int) -> tuple[list[dict], int]:
    """Keep the highest-scoring N comments, preserving thread order."""
    if not max_comments or len(comments) <= max_comments:
        return comments, 0
    keep = sorted(range(len(comments)), key=lambda i: comments[i]["score"], reverse=True)
    keep = set(keep[:max_comments])
    return [c for i, c in enumerate(comments) if i in keep], len(comments) - max_comments


def fetch_thread(ref: str, opts: dict) -> dict:
    if opts.get("input_file"):
        with open(opts["input_file"], encoding="utf-8") as fh:
            payload = json.load(fh)
    else:
        tid = parse_thread_id(ref)
        payload = api_get(
            f"/comments/{tid}.json",
            {"limit": opts["comment_limit"], "sort": opts["comment_sort"], "depth": opts["max_depth"] + 1},
            sleep=opts["sleep"],
        )

    if not isinstance(payload, list) or len(payload) < 2:
        raise RedditError(f"Unexpected payload shape for {ref}")

    post_children = (payload[0].get("data") or {}).get("children") or []
    if not post_children:
        raise RedditError(f"No post found for {ref}")
    post = post_record(post_children[0].get("data") or {}, opts["max_body_chars"])

    comments, stats = flatten_comments((payload[1].get("data") or {}).get("children"), opts)
    comments, capped = cap_comments(comments, opts["max_comments"])

    return {
        "post": post,
        "comments": comments,
        "stats": {
            "comments_returned": stats["seen"],
            "comments_kept": len(comments),
            "dropped_by_filters": stats["seen"] - len(comments) - capped,
            "dropped_by_cap": capped,
            "not_loaded": stats["more"],
        },
    }


# --------------------------------------------------------------------------
# Rendering
# --------------------------------------------------------------------------


def render_thread_md(thread: dict, md_links: str = "scored", link_min: int = 25) -> str:
    p, s = thread["post"], thread["stats"]
    lines = [
        f"# r/{p['subreddit']} — {p['title']}",
        f"score {p['score']} · {p['num_comments']} comments · {p['date']}"
        + (f" · flair: {p['flair']}" if p["flair"] else ""),
        p["permalink"],
    ]
    if p["url"]:
        lines.append(f"links out to: {p['url']}")
    if p["body"]:
        lines += ["", p["body"]]
    lines += [
        "",
        f"_{s['comments_kept']} comments shown of {s['comments_returned']} returned; "
        f"{s['not_loaded']} not loaded by Reddit._",
        "",
        "## Comments",
        "",
    ]

    for c in thread["comments"]:
        indent = "  " * min(c["depth"], 8)
        head = f"{indent}- [d{c['depth']} ▲{c['score']} {c['date']}]"
        if md_links == "all" or (md_links == "scored" and c["score"] >= link_min):
            head += f" ({c['permalink']})"
        body = c["body"].replace("\n", "\n" + indent + "  ")
        lines.append(f"{head} {body}")

    return "\n".join(lines) + "\n"


def summarize_listing(payload: dict, max_body_chars: int = 300) -> list[dict]:
    out = []
    for child in ((payload.get("data") or {}).get("children") or []):
        if child.get("kind") != "t3":
            continue
        d = child.get("data") or {}
        out.append(
            {
                "type": "thread",
                "id": d.get("id", ""),
                "title": d.get("title", ""),
                "subreddit": d.get("subreddit", ""),
                "score": d.get("score", 0),
                "num_comments": d.get("num_comments", 0),
                "date": iso_date(d.get("created_utc")),
                "permalink": full_url(d.get("permalink", "")),
                "snippet": clean_body(d.get("selftext", ""), max_body_chars),
            }
        )
    return out


def render_listing_md(items: list[dict], heading: str) -> str:
    lines = [f"# {heading}", f"_{len(items)} threads_", ""]
    for i, t in enumerate(items, 1):
        lines.append(f"{i}. **{t['title']}** — r/{t['subreddit']} · ▲{t['score']} · "
                     f"{t['num_comments']} comments · {t['date']}")
        lines.append(f"   {t['permalink']}")
        if t.get("snippet"):
            lines.append(f"   > {t['snippet'][:300]}")
        if t.get("queries"):
            lines.append(f"   _found by: {', '.join(t['queries'])}_")
        lines.append("")
    return "\n".join(lines)


def write_out(text: str, path: str | None) -> None:
    if path:
        os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)
        log(f"[ok] wrote {path}")
    else:
        sys.stdout.write(text)


# --------------------------------------------------------------------------
# Search
# --------------------------------------------------------------------------


def run_search(query: str, subreddits: list[str], args) -> list[dict]:
    results: list[dict] = []
    targets = subreddits or [None]
    for sub in targets:
        path = f"/r/{sub}/search.json" if sub else "/search.json"
        params = {
            "q": query,
            "sort": args.sort,
            "t": args.time,
            "limit": min(args.limit, 100),
            "type": "link",
        }
        if sub:
            params["restrict_sr"] = "on"
        try:
            payload = api_get(path, params, sleep=args.sleep)
        except RedditError as exc:
            log(f"[warn] search failed for {query!r} in {sub or 'all'}: {exc}")
            continue
        for item in summarize_listing(payload):
            item["queries"] = [query]
            results.append(item)
        time.sleep(args.sleep)
    return results


def dedupe(items: list[dict]) -> list[dict]:
    merged: dict[str, dict] = {}
    for item in items:
        key = item["id"] or item["permalink"]
        if key in merged:
            for q in item.get("queries", []):
                if q not in merged[key]["queries"]:
                    merged[key]["queries"].append(q)
        else:
            merged[key] = item
    return list(merged.values())


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------


def thread_opts(args) -> dict:
    return {
        "min_score": args.min_score,
        "max_depth": args.max_depth,
        "max_comments": args.max_comments,
        "max_body_chars": args.max_body_chars,
        "comment_limit": args.comment_limit,
        "comment_sort": args.comment_sort,
        "sleep": args.sleep,
        "input_file": getattr(args, "input", None),
    }


def add_thread_flags(p):
    p.add_argument("--min-score", type=int, default=1, help="drop comments below this score")
    p.add_argument("--max-depth", type=int, default=6, help="max comment nesting depth")
    p.add_argument("--max-comments", type=int, default=150,
                   help="keep only the N highest-scoring comments")
    p.add_argument("--max-body-chars", type=int, default=1500, help="truncate long bodies")
    p.add_argument("--comment-limit", type=int, default=500, help="comments requested from Reddit")
    p.add_argument("--comment-sort", default="top",
                   choices=["top", "best", "new", "controversial", "old", "qa"])
    p.add_argument("--md-links", default="scored", choices=["none", "scored", "all"],
                   help="include per-comment permalinks in Markdown")
    p.add_argument("--link-min", type=int, default=25,
                   help="score threshold for --md-links scored")


def add_search_flags(p):
    p.add_argument("--subreddit", "-r", action="append", default=[],
                   help="restrict to a subreddit (repeatable; omit to search all of Reddit)")
    p.add_argument("--sort", default="relevance",
                   choices=["relevance", "top", "new", "comments", "hot"])
    p.add_argument("--time", default="year",
                   choices=["hour", "day", "week", "month", "year", "all"])
    p.add_argument("--limit", type=int, default=25, help="results per query per subreddit")


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Compact Reddit fetcher for qualitative market research.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--format", default="md", choices=["md", "json"])
    p.add_argument("--out", "-o", help="write to this file instead of stdout")
    p.add_argument("--sleep", type=float, default=1.0, help="seconds between requests")
    sub = p.add_subparsers(dest="cmd", required=True)

    t = sub.add_parser("thread", help="fetch one post and its comments, flattened")
    t.add_argument("ref", help="thread URL, permalink, t3_id, or bare post id")
    t.add_argument("--input", help="parse this saved JSON payload instead of fetching")
    add_thread_flags(t)

    s = sub.add_parser("search", help="find candidate threads")
    s.add_argument("query")
    add_search_flags(s)

    l = sub.add_parser("listing", help="pull hot/top/new from a subreddit")
    l.add_argument("subreddit")
    l.add_argument("--listing", default="top", choices=["hot", "top", "new", "rising"])
    l.add_argument("--time", default="year",
                   choices=["hour", "day", "week", "month", "year", "all"])
    l.add_argument("--limit", type=int, default=50)

    h = sub.add_parser("harvest", help="multi-query search + fetch + write files")
    h.add_argument("--query", "-q", action="append", required=True,
                   help="search query (repeatable — pass a whole query family)")
    h.add_argument("--threads", type=int, default=15, help="how many threads to fetch")
    h.add_argument("--min-comments", type=int, default=5,
                   help="skip candidate threads with fewer comments")
    h.add_argument("--outdir", default="reddit_research",
                   help="directory for per-thread Markdown files")
    h.add_argument("--index", help="path for the index file (default <outdir>/index.md)")
    add_search_flags(h)
    add_thread_flags(h)
    return p


def cmd_thread(args):
    thread = fetch_thread(args.ref, thread_opts(args))
    text = (json.dumps(thread, indent=2, ensure_ascii=False)
            if args.format == "json"
            else render_thread_md(thread, args.md_links, args.link_min))
    write_out(text, args.out)


def cmd_search(args):
    items = dedupe(run_search(args.query, args.subreddit, args))
    items.sort(key=lambda t: t["num_comments"], reverse=True)
    text = (json.dumps(items, indent=2, ensure_ascii=False)
            if args.format == "json"
            else render_listing_md(items, f"Search: {args.query}"))
    write_out(text, args.out)


def cmd_listing(args):
    payload = api_get(f"/r/{args.subreddit}/{args.listing}.json",
                      {"limit": min(args.limit, 100), "t": args.time}, sleep=args.sleep)
    items = summarize_listing(payload)
    text = (json.dumps(items, indent=2, ensure_ascii=False)
            if args.format == "json"
            else render_listing_md(items, f"r/{args.subreddit} — {args.listing}"))
    write_out(text, args.out)


def slugify(text: str, limit: int = 60) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:limit] or "thread"


def cmd_harvest(args):
    candidates: list[dict] = []
    for query in args.query:
        log(f"[search] {query}")
        candidates += run_search(query, args.subreddit, args)

    candidates = [c for c in dedupe(candidates) if c["num_comments"] >= args.min_comments]
    # Rank by discussion volume and by how many query families surfaced the thread —
    # a thread found by several angles is usually more central to the topic.
    candidates.sort(key=lambda t: (len(t["queries"]), t["num_comments"]), reverse=True)
    selected = candidates[: args.threads]
    log(f"[info] {len(candidates)} unique candidates; fetching {len(selected)}")

    os.makedirs(args.outdir, exist_ok=True)
    opts = thread_opts(args)
    index_rows = []

    for i, cand in enumerate(selected, 1):
        log(f"[fetch {i}/{len(selected)}] r/{cand['subreddit']}: {cand['title'][:70]}")
        try:
            thread = fetch_thread(cand["permalink"], opts)
        except RedditError as exc:
            log(f"[warn] skipped: {exc}")
            continue
        name = f"{i:02d}-{cand['subreddit']}-{slugify(cand['title'])}"
        path = os.path.join(args.outdir, name + (".json" if args.format == "json" else ".md"))
        body = (json.dumps(thread, indent=2, ensure_ascii=False)
                if args.format == "json"
                else render_thread_md(thread, args.md_links, args.link_min))
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(body)
        row = dict(cand)
        row["file"] = path
        row["comments_kept"] = thread["stats"]["comments_kept"]
        index_rows.append(row)
        time.sleep(args.sleep)

    index_path = args.index or os.path.join(args.outdir, "index.md")
    lines = [
        "# Reddit harvest index",
        f"_queries: {'; '.join(args.query)}_",
        f"_subreddits: {', '.join(args.subreddit) or 'all of Reddit'} · "
        f"sort={args.sort} · window={args.time}_",
        f"_{len(index_rows)} threads fetched_",
        "",
    ]
    for row in index_rows:
        lines.append(f"- `{row['file']}` — **{row['title']}** (r/{row['subreddit']}, "
                     f"▲{row['score']}, {row['num_comments']} comments, {row['date']}, "
                     f"{row['comments_kept']} kept)")
        lines.append(f"  {row['permalink']}")
        lines.append(f"  _found by: {', '.join(row['queries'])}_")
    write_out("\n".join(lines) + "\n", index_path)
    log(f"[done] {len(index_rows)} threads in {args.outdir}")


def main() -> int:
    args = build_parser().parse_args()
    try:
        {"thread": cmd_thread, "search": cmd_search,
         "listing": cmd_listing, "harvest": cmd_harvest}[args.cmd](args)
    except RedditError as exc:
        log(f"[error] {exc}")
        return 2
    except KeyboardInterrupt:
        return 130
    return 0


if __name__ == "__main__":
    sys.exit(main())