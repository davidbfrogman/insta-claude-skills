# LEAD//GEN ZINE — STYLE GUIDE v2

A portable specification of the visual system used in *Lead Gen Zine.html*. Hand this to any new project to reproduce the look: a risograph-printed editorial **zine** — warm paper stock, heavy display type, an electric spot color, and the trim/registration furniture of offset printing.

The whole thing rests on one idea: **this is a printed object, not a screen.** Every decision (grain, crop marks, barcodes, tonal strips, "FIG." labels) reinforces that the reader is holding a physical artifact.

---

## 1. Core concept & mood

- **Editorial print zine / risograph poster.** Think indie design quarterly, exhibition catalog, contact sheet.
- **Warm, analog, tactile.** Off-white recycled paper, multiply-blended grain, ink that sits *in* the page.
- **Loud display, quiet utility.** Enormous condensed headlines and high-contrast Didone serifs do the shouting; tiny uppercase monospace does the labeling.
- **One electric accent.** A single saturated hot pink carries all the energy. Everything else is paper and ink.
- **Constructed, not decorated.** Registration marks, crop corners, barcodes, and figure numbers are the ornament. No gradients, no rounded corners, no drop shadows on content.
- **Multinational print texture.** Japanese and Korean glyphs function as found-typography artifacts — the visual residue of a zine that passed through Tokyo and Seoul print shops before landing in your hands.

Canvas is **portrait poster format: 1080 × 1920px** (a 9:16 "page"). Designed to be exported one frame at a time.

---

## 2. Color

Warm neutral paper-and-ink palette plus one spot color. Saturation stays at zero everywhere except the accent.

```css
--paper:  #ECEAE3;   /* primary background — warm off-white newsprint */
--paper2: #E3E0D6;   /* secondary paper tone, slightly deeper */
--ink:    #15140F;   /* near-black, warm — primary text & dark backgrounds */
--ink2:   #36342B;   /* softened ink — secondary text, mono labels */
--faint:  #908C7E;   /* muted warm gray — tertiary / "enriching…" states */
--blue:   #FF2D78;   /* THE accent — electric hot-pink spot color */

--line:   rgba(21,20,15,0.22);   /* hairline rules on paper */
--line2:  rgba(21,20,15,0.10);   /* dot-grid / faint structure */
```

### Usage rules
- **Paper `#ECEAE3` is the default ground.** It is never pure white. Keep whites below ~0.02 chroma and warm.
- **Ink `#15140F` is never pure black.** Warm it slightly.
- **The accent is rationed.** It marks one or two things per page — an italic key phrase, a leading number, a single highlighted box. If everything is blue, nothing is. Treat it like a second ink on the press.
- **Dark frames invert.** Add `.dark` → background becomes `--ink`, text becomes `--paper`. On dark, hairlines become `rgba(236,234,227,0.25–0.4)`.
- **Tonal strip** is a recurring motif: 5 warm grays stepping dark→light, capped by one blue cell, as a "press tonal reference."

```
#15140F  #3a3930  #6a6759  #9b9786  #c9c5b6  → [--blue]
```

### Accent alternates (for theming)
Keep lightness/chroma family; vary hue only. Hot pink is the default.
`#FF2D78` hot pink · `#1F2BE8` ultramarine · `#2D5BFF` cobalt · `#6A2BE8` violet · `#15140F` mono/ink-only.

---

## 3. Typography

Four-voice system. Each voice has exactly one job — do not blur them.

| Voice | Family | Role |
|---|---|---|
| **Condensed display** | **Anton** (uppercase) | The shout. Giant headline slabs, leading numbers. |
| **High-contrast serif** | **Newsreader** (default; swappable) | Editorial headlines, spec values, elegant statements. Used in *italic* for emphasis. |
| **Micro / utility mono** | **JetBrains Mono** | All labels, captions, coordinates, barcodes, figure tags. |
| **Body sans** | **Archivo** | Connective tissue / rare running text. |

Display-serif is **swappable** within a high-contrast "Didone" family: Newsreader (default), Spectral, Playfair Display, Bodoni Moda. All are loaded so the look can be retuned without breaking layout.

```
font-family link:
Anton · Archivo · Bodoni Moda · JetBrains Mono · Newsreader · Playfair Display · Spectral
--serif: "Newsreader", serif;   /* the swappable display serif slot */
```

### Type rules & scale (at 1080×1920)
- **Anton headlines run HUGE and TIGHT.** 120–248px, `line-height: 0.78–0.84`, `letter-spacing: -0.02em`. Stacked two or three words deep, often with one word in the accent (`.blueink`).
- **Serif display:** 96–124px, `line-height: ~0.9`, `font-weight: 500–700`. Emphasis word set in **italic + accent** (`<span class="ital blueink">`).
- **Spec values (serif):** 34–36px, weight 600.
- **Micro labels (mono):** 16–21px, `letter-spacing: 0.1–0.14em`, `text-transform: uppercase`, color `--ink2`. This is the connective grammar of the whole zine — "FIG. 0X", section names, coordinates, ref numbers.
- **Pull quotes:** serif *italic*, 26–30px, in quotation marks, lowercase, set low on the page.
- **Never go below ~16px.** Mono micro-type is the floor.

### Signature type move
Headline = neutral ink phrase + **one word flipped to accent italic serif**:
> It **browses** the live web. → "browses" in `ital blueink`



### 4b. Rendering rules

#### Size tiers

| Tier | Size range | Opacity | Role |
|---|---|---|---|
| **Watermark** | 280–480px | 0.04–0.08 | Single massive glyph behind content, barely visible through grain |
| **Stamp** | 80–140px | 0.60–1.0 | Functional mark — like a press chop. Placed deliberately. |
| **Label** | 18–28px | 0.40–0.70 | Inline with micro mono text. Set in `--ink2` or `--faint`. |
| **Scatter** | 14–20px | 0.10–0.25 | Repeated in a loose grid or random cluster for background texture |

#### Styling

```css
.cjk-glyph {
    font-family: "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Noto Sans KR", sans-serif;
    color: var(--ink);
    /* No decorative transforms — let the glyph's own geometry do the work */
}

/* Watermark: massive, ghosted behind content */
.cjk-watermark {
    font-size: 360px;
    opacity: 0.05;
    color: var(--ink);
    position: absolute;
    z-index: 0; /* below dot grid */
    line-height: 1;
    /* Optional: slight rotation for pasted-on feel */
    transform: rotate(-3deg);
}

/* Stamp: deliberate, visible, functional */
.cjk-stamp {
    font-size: 96px;
    opacity: 0.85;
    color: var(--ink);
    line-height: 1;
    /* Can be set inside a border for a chop/seal feel */
}

/* Stamp with border — the "hanko" / seal treatment */
.cjk-seal {
    font-size: 64px;
    line-height: 1;
    color: var(--blue);
    border: 3px solid var(--blue);
    padding: 8px 10px;
    display: inline-block;
    /* Slight rotation sells the stamped-on feel */
    transform: rotate(-4deg);
}

/* Label: inline with mono micro-text */
.cjk-label {
    font-size: 21px;
    color: var(--ink2);
    letter-spacing: 0.08em;
    opacity: 0.55;
}

/* Scatter: ambient texture */
.cjk-scatter {
    font-size: 16px;
    opacity: 0.15;
    color: var(--ink);
    position: absolute;
}
```

#### Color rules — same as all other furniture
- On **paper** backgrounds: render in `--ink` or `--ink2`. Accent (`--blue`) reserved for the seal/stamp treatment only — max one per page.
- On **dark** backgrounds: render in `--paper` at reduced opacity (0.06–0.12 for watermarks, 0.50–0.70 for stamps).
- **Never full-color.** These are single-ink marks. They follow the same risograph logic as everything else.
- **Accent-colored CJK** is a power move — use it like the accent italic serif word: once per page, maximum, and only at stamp or seal size.

#### Rotation & placement
- Watermarks: **−5° to +3°** rotation. Centered or slightly off-center on the page. One per frame, maximum.
- Stamps: **−6° to +2°** rotation. Placed in page margins (inside the 96px inset zone), often near a corner opposite to the barcode or registration marks.
- Labels: **No rotation.** Set on the same baseline as mono micro-text. Placed after a `·` separator or inside parentheses: `LOT No. LG-0001 · 印刷` or `(쇄판 002)`.
- Scatter: **−12° to +12°** random rotation per glyph. Cluster 5–12 glyphs in a loose formation, never touching content.

---

### 4c. Composition patterns

#### Pattern 1 — Corner stamp
A single Hangul block character (한, 인, 판) in a seal border, placed in the bottom-right margin at −4° rotation. Paired with a mono micro label beneath: `REF. 인쇄 · ED. 001`

#### Pattern 2 — Watermark layer
One massive Hiragana (あ or の) at 360–480px, ghosted at 0.05 opacity behind the content layer but above the dot grid. Slight rotation. The grain texture prints over it, pushing it deeper into the paper.

#### Pattern 3 — Katakana scatter field
8–15 Katakana glyphs (シ, ツ, ノ, メ) scattered across an empty zone of the page at 14–18px, 0.12–0.20 opacity, random rotations. Functions like the dot grid but with typographic texture. Use on pages that have fewer photos and need visual density.

#### Pattern 4 — Inline CJK label
Mixed into the existing mono micro-text system:
```
FIG. 07 — ENRICHMENT / データ収集
SCAN 100% ▓▓▓▓▓▓▓▓ · 完了
NET CONTENTS: 1 SKILL · 기술
LOT No. LG-0001 (인쇄판)
EST. 10–25 / RUN · 実行
```
The CJK word is set at the same size as the mono text, in `--faint` or `--ink2`, functioning as a "translation ghost" — not meant to be read, just to signal internationality.

#### Pattern 5 — Tonal strip extension
Append a CJK glyph cell to the existing tonal reference strip:
```
#15140F  #3a3930  #6a6759  #9b9786  #c9c5b6  [--blue]  [あ]
```
The final cell contains a single glyph in `--ink` on `--paper`, functioning as a "character registration test" — like a printer checking that CJK fonts loaded correctly.

#### Pattern 6 — Vertical margin text
A column of 3–5 Katakana or Hangul characters stacked vertically along the left or right margin edge, set in `--faint` at 18–24px with generous line-height (~2.0). Functions like a spine label on a bound volume.

---

### 4d. Specific phrase fragments for labels

These are short, real fragments that relate to printing/production — maintaining the "print shop artifact" fiction:

| Fragment | Script | Meaning | Use as |
|---|---|---|---|
| 印刷 | Kanji | "printing" | Micro label, stamp |
| 校正 | Kanji | "proofing" | Status label: `校正 · PROOF` |
| 初版 | Kanji | "first edition" | Colophon / edition mark |
| 試し刷り | Hiragana+Kanji | "test print" | Status label on draft frames |
| インク | Katakana | "ink" | Tonal strip label |
| データ | Katakana | "data" | Tech/process section label |
| プロセス | Katakana | "process" | Process section label |
| 인쇄 | Hangul | "printing" | Stamp / seal mark |
| 교정 | Hangul | "proofing" | Status label |
| 초판 | Hangul | "first edition" | Colophon / edition mark |
| 잉크 | Hangul | "ink" | Tonal strip label |
| 용지 | Hangul | "paper stock" | Paper reference label |

---

### 4e. Combination rules

- **Max CJK elements per page: 3–4.** One watermark OR one stamp, plus 1–2 inline labels, plus optionally one scatter field. Never all four tiers at once.
- **Mix scripts freely** on a single page — Katakana corner stamp + Hangul inline label is fine. The zine passed through multiple shops.
- **CJK elements never compete with the headline.** They are always quieter — lower opacity, smaller size, or in the margins. The hierarchy is: headline → content → print furniture → CJK marks.
- **Pair CJK stamps with existing furniture.** A Hangul seal next to a barcode. Katakana scatter behind a tonal strip. Hiragana watermark under a photo. They reinforce each other.
- **On dark frames**, CJK watermarks become more visible (raise to 0.08–0.10) and function as a stronger textural element. Stamps switch to `--paper` color.

---

## 5. Texture & surface

What makes it read as *printed*:

1. **Film grain** — an SVG `feTurbulence` fractal-noise layer over every frame.
   - `mix-blend-mode: multiply`, `opacity: ~0.42` on paper.
   - On dark frames: `mix-blend-mode: screen`, opacity reduced to ~40%.
   - Grain opacity is a tunable parameter (`--grain-op`, range 0–0.6).
2. **Dot baseline grid** — `radial-gradient` dots, `--line2`, `background-size: 46px 46px`, `opacity ~0.5`. The faint structure under everything. (Dark frames drop it to ~0.25.)
3. **No soft shadows on content.** The only shadow in the system is the gallery thumbnail lift (`0 24px 60px rgba(0,0,0,0.6)`) — that's chrome, not content.

---

## 6. Print furniture (the ornament system)

These elements ARE the decoration. Use them instead of illustration.

- **Registration marks** (`.reg`) — crosshair targets in the four corners, 34px, inset 40px. Place 2–4 per frame; they don't all need to appear.
- **Crop corners** (`.corner`) — L-shaped brackets, 2px, framing the trim.
- **Barcode** (`.bar`) — `repeating-linear-gradient` of uneven bars, ~220×56px, with a spaced mono label beneath (`PA-9107217`, `LG-0001`).
- **Figure tags** — every page is labeled `FIG. 0X — TOPIC` in micro mono, usually top-left.
- **Masthead rules** — `.thinrule` (1.5px) and `.fatrule` (8px) full-width bars separating masthead from body.
- **Coordinates & ref strings** — GPS coordinates (`35.6987°N / 139.7730°E`), lot numbers, scan readouts (`SCAN 100% ▓▓▓▓▓▓▓▓`) scattered in corners as flavor.
- **Tonal reference strip** — see Color.
- **CJK stamps & marks** — see §4. Seals, watermarks, inline labels, and scatter fields functioning as international print-shop artifacts.
- **Micrographic diagrams** — see §6a. Schematic line-art figures for `FIG. 0X` illustrations.

---

### 6a. Micrographic diagrams

A library of 1080×1080 line-art technical/schematic diagrams lives in `micrographics-svgs/` (`17.svg`, `19.svg`, `22.svg`, `23.svg`, `28.svg`, `29.svg`, `31.svg`, `36.svg`, `38.svg`, `39.svg`, `40.svg`). These are the visual stock for the `FIG. 0X — TOPIC` illustrations.

- **Reference these files directly** — pull one per frame rather than drawing new diagram art.
- Recolor strokes to the system palette: `--ink`/`--ink2` for line work, `--blue` reserved for at most one element per diagram (same "ration the accent" rule as everywhere else).
- Treat like imagery (§7) — grayscale/duotone register, can be cropped, scaled, or rotated slightly (`-2°…1.2°`) for the pasted-on feel.
- Pair the diagram's geometry with the page's composition (e.g. circular/spiral diagrams near stamps or seals; grid/axonometric diagrams near spec cards).
- One micrographic diagram per frame, maximum — it's a `FIG.` illustration, not a texture layer.

---

## 7. Imagery treatment

Photography is always processed to look **printed in one or two inks** — never full color.

```css
filter: grayscale(1) contrast(1.32) brightness(1.04);   /* base halftone-ish */
.hi  → grayscale(1) contrast(1.7) brightness(1.12);     /* high-contrast */
.inv → grayscale(1) invert(1) contrast(1.25);           /* negative */
.lift→ grayscale(1) contrast(1.26) brightness(1.16);    /* lifted blacks */
```

- **Duotone the accent** with `.blue`: a `--blue` fill at `screen` (op 0.62) over another at `multiply` (op 0.4) — turns any photo into a blue/black risograph print.
- **Slice & scatter.** Images are cropped into strips and rectangles, oversized via `background-size`, hard-positioned, and rotated a degree or two (`rotate(-2deg … 1.2deg)`) so they feel pasted onto the page.
- Photos sit *behind* the content layer (`z-index` below the `.layer`), bleeding off the trim edge.

---

## 8. Layout system

- **Margin:** content furniture sits at **96px** inset; large type blocks at **80px**. Marks at 38–40px.
- **Absolute, anchored composition.** Elements are positioned absolutely (`.abs`) and **anchored low** — big headlines and content cluster in the bottom 60% of the page; masthead pins to the top; flavor pins to corners. This bottom-weighting is a signature.
- **Spec rows** (`.specrow`) — the workhorse list unit: mono key on the left, serif value on the right, baseline-aligned, separated by a 1.5px rule. Used for forms, indexes, step lists.
- **Packaging "spec card"** — a double border (2px outer ink frame + 8px gap + 1px inner hairline) wrapping a titled spec block, like product packaging.
- **Two-column "vs" spreads** — split layout with a vertical divider rule and an italic accent "vs" straddling it.
- **Layered structure** per frame: `grid` (dots) → CJK watermark → scattered `ph` photos → `layer` (all content + marks + CJK stamps/labels) → `grain` on top.

---

## 9. Voice & copy

- **Labels are typeset like a catalog.** `FIG. 05 — PROCESS / 1:1`, `NET CONTENTS: 1 SKILL`, `EST. 10–25 / RUN`, `LOT No. LG-0001`.
- **Headlines are short and declarative**, two to four words, frequently split across lines with one accent word.
- **Pull quotes are lowercase, philosophical, in quotes:** *"the web is the database — you just have to read it."*
- **Mono micro-copy narrates the mechanism** in the corners: `TELL IT WHO YOU SELL TO →`, `ONE RUN, START TO FINISH`.
- Numbers, statuses and tags lean mono + accent (`SOLD · $600K`, `✓ done`, `enriching…`).
- **CJK fragments appear as production metadata**, not content: `校正 · PROOF`, `인쇄판 002`, `試し刷り`. They whisper in the margins.

---

## 10. Tunable parameters (theming knobs)

The system is built to be retuned via four controls without touching layout:

| Knob | Range / options | Default |
|---|---|---|
| **Display serif** | Newsreader · Spectral · Playfair · Bodoni | Newsreader |
| **Accent** | hot pink · ultramarine · cobalt · violet · ink | `#FF2D78` |
| **Grain** | 0 – 0.6 | 0.42 |
| **CJK density** | none · minimal (1–2 marks) · standard (3–4) · heavy (scatter fields) | minimal |

Wire these to `--serif`, `--blue`, `--grain-op`, and a CJK-visibility class respectively.

---

## 11. Quick-start checklist for a new project

1. Set ground to `--paper #ECEAE3`, text to `--ink #15140F`. Never pure white/black.
2. Load Anton + a Didone serif + JetBrains Mono. Assign the four type voices.
3. Lay grain (multiply, ~0.42) and a 46px dot grid over the canvas.
4. Anchor big type **low**; pin masthead high; scatter mono flavor in corners.
5. Add print furniture: 2–4 registration marks, crop corners, one barcode, a `FIG.` tag.
6. **Add CJK marks:** one watermark or stamp per page, 1–2 inline labels in mono micro-text, optional scatter field on sparse pages.
6a. For pages needing a `FIG.` illustration, pull one diagram from `micrographics-svgs/` (§6a) and recolor to the system palette — don't draw new diagram art.
7. Process all photography to grayscale high-contrast or accent duotone; slice, oversize, rotate slightly.
8. Ration the accent — one or two hits per page, ideally an italic serif word + a leading number.
9. Keep everything sharp-cornered, flat, and printed. No gradients, no rounded corners, no content shadows.

---

### One-line summary
> *Warm newsprint, four sharp type voices, one electric ink, low-anchored giant headlines, international print-shop marks in three scripts, and the crop-mark-and-barcode furniture of an offset press — grainy, constructed, and unmistakably a printed object that traveled the world.*
