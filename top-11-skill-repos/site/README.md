# Top 11 Skill Repos: web page

A self-contained landing page for the Top 11 Skill Repos reel. There are no external requests: fonts and images are bundled in `assets/`.

## Drop it on your site

**Option A: as its own page.** Upload this whole folder (for example to `yoursite.com/skills/`). You're done.

**Option B: inside an existing page.** Copy everything between `<!-- BEGIN T11 -->` and `<!-- END T11 -->` in `index.html` into your page. Then put the `assets/` folder next to that page, or find-and-replace `assets/` with wherever you host it (a CDN, `/images/t11/`, etc.). All CSS is scoped to `.t11`, so it won't restyle the rest of your site.

If your site builder strips `<script>` tags, the page still works. You only lose the Copy buttons.

## Before you publish

- Change `og:image` in `<head>` to an absolute URL (`https://yoursite.com/.../assets/og.png`). Social previews need a full URL.
- The footer has an `EDIT:` comment where you can add your Instagram or newsletter link.

## Files

- `index.html`: the page
- `assets/cards/card-01.png` … `card-11.png`: the 11 reel cards (1080×1920)
- `assets/og.png`: 1200×630 social share image
- `assets/fonts/`: Inter Tight, JetBrains Mono, VT323 (all under the SIL Open Font License)

Stars are as of Sep 29, 2026. Descriptions and install commands come from each repo's README.
