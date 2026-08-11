# Dave Brown — Brand Style Guide

The visual and verbal system used on davecto.com. Copy this file (and `tokens.css`) into any
project that needs to look like it belongs to the same brand.

**The one-sentence version:** warm paper, near-black ink, one deep teal accent, a serif for
statements and a sans for everything else, hairline rules instead of cards, and a lot of empty
space. Restraint is the brand. If a decision is ambiguous, choose the quieter option.

---

## 1. Design principles

These are the rules that generated everything below. When this guide doesn't cover a case,
derive the answer from these.

1. **Editorial, not app-like.** The reference points are a well-set book and a good print
   magazine, not a SaaS dashboard. Content sits on a page; it isn't packaged into widgets.
2. **Structure comes from rules and space, not boxes.** A 1px `border` line and generous padding
   separate things. Almost nothing has a filled background, a drop shadow, or a rounded card.
3. **One accent, used sparingly.** Deep teal appears a handful of times per page — an eyebrow, a
   highlighted phrase, a hover state. It never fills a large area. Scarcity is what makes it read
   as intentional.
4. **Type does the heavy lifting.** The hierarchy is serif-vs-sans, size, and letterspacing — not
   color chips or icons.
5. **Warmth, not sterility.** Every neutral is warm-shifted (paper, bone, ink). There is no pure
   `#fff` background and no pure `#000` text.
6. **Motion is a whisper.** Color transitions, a border fading in, one ambient background scene.
   Nothing slides, bounces, or announces itself. Reduced-motion is always honored.
7. **Understated confidence.** Both visually and verbally: state the thing plainly and stop. No
   hype, no exclamation points, no "revolutionary."

---

## 2. Color

Warm neutral base + a single deep teal accent. Full token list in `tokens.css`.

### Light theme (default)

| Token | Hex | Role |
|---|---|---|
| `--background` | `#f7f5f0` | Page background — warm bone/paper. Never white. |
| `--foreground` | `#181614` | Body and heading text — warm near-black ink. Never pure black. |
| `--surface` / `--popover` | `#ffffff` | The only place pure white appears: raised surfaces, sheets, popovers. |
| `--muted` / `--secondary` | `#f1ede6` | Quiet fills — hover states, subtle blocks. |
| `--muted-foreground` | `#6b655c` | Secondary text: descriptions, meta, eyebrows, inactive nav. |
| `--accent` | `#0f766e` | Deep teal. Highlighted phrases, eyebrows, hover, focus rings. |
| `--accent-foreground` | `#f7f5f0` | Text on accent fills (rare). |
| `--border` / `--input` | `#e4dfd5` | Hairline rules — the primary structural device. |
| `--ring` | `#0f766e` | Focus ring. |
| `--destructive` | `#8c3b2e` | Errors. Warm brick, not fire-engine red. |
| `--primary` / `--primary-foreground` | `#181614` / `#f7f5f0` | Solid button: ink fill, paper text. |

### Dark theme

| Token | Hex | Role |
|---|---|---|
| `--background` | `#141310` | Warm near-black. |
| `--foreground` | `#f3f0e9` | Warm off-white. |
| `--surface` / `--popover` | `#1c1a16` | Raised surfaces. |
| `--muted` / `--secondary` | `#211e19` | Quiet fills. |
| `--muted-foreground` | `#948c7f` | Secondary text. |
| `--accent` / `--ring` | `#3e8b82` | Lightened teal — `#0f766e` is too dark on ink. |
| `--accent-foreground` | `#0d1f1d` | Text on accent fills. |
| `--border` / `--input` | `#2c2822` | Hairline rules. |
| `--destructive` | `#c76a5c` | Errors. |
| `--primary` / `--primary-foreground` | `#f3f0e9` / `#141310` | Solid button, inverted. |

**Print / export accent:** `#1e4a46` — a darker teal used for the rule in the Open Graph image.
Use it where teal needs to hold up as a small mark on a light background at low fidelity.

### Rules for using color

- **Roughly 90 / 9 / 1.** Background and ink carry ~90% of the surface, muted greys ~9%, accent ~1%.
- **Never** put accent behind a large block of text or use it as a section background.
- Body copy that isn't the primary point goes in `--muted-foreground`. Emphasized body copy uses
  `--foreground/90` (90% opacity ink) — slightly softer than headings, which sit at full strength.
- Only two colors ever indicate interactivity: `--muted-foreground → --foreground` (nav, meta
  links) and `→ --accent` (serif titles, in-prose links).
- No gradients, no color-coded categories, no tinted status backgrounds.
- Contrast: `#0f766e` on `#f7f5f0` clears 4.5:1. Don't use accent for text below 12px, and don't
  use `--muted-foreground` for anything below 11px on a colored fill.

---

## 3. Typography

Two typefaces, both from Google Fonts.

| | Family | Fallback stack | Use |
|---|---|---|---|
| Serif | **Fraunces** (variable, `opsz` axis) | `Georgia, 'Times New Roman', serif` | Headlines, section titles, card titles, pull quotes, the wordmark, blockquotes. |
| Sans | **Inter** | `system-ui, -apple-system, 'Segoe UI', sans-serif` | Body copy, UI, nav, eyebrows, labels, metadata. |

Fraunces is always set at **`font-weight: 400`** (`font-normal`) with **`tracking-tight`** on large
sizes. Never bold a Fraunces headline — size and the serif itself supply the emphasis.

### The scale

| Role | Size | Family / treatment |
|---|---|---|
| Hero headline | `text-5xl` → `sm:text-6xl` → `lg:text-7xl`, `leading-[1.05]`, `tracking-tight`, `text-balance` | Serif |
| Page title (h1) | `text-4xl` → `sm:text-5xl`, `leading-tight`, `text-balance` | Serif |
| Section title (h2) | `text-3xl` → `sm:text-4xl`, `leading-tight`, `text-balance` | Serif |
| Pull quote / statement | `text-2xl` → `sm:text-3xl`, `leading-snug`, `text-balance` | Serif |
| Card / entry title (h3) | `text-2xl` (`text-xl` in dense lists, `text-3xl` for feature entries) | Serif |
| Lead paragraph | `text-lg`, `leading-relaxed`, `--muted-foreground` | Sans |
| Body | `text-base`, `leading-relaxed` | Sans |
| Secondary body / description | `text-sm`, `leading-relaxed`, `--muted-foreground` | Sans |
| Metadata | `text-xs`, `--muted-foreground` | Sans |

### The eyebrow — the brand's signature detail

A small uppercase label above almost every heading. Three letterspacing tiers, and the tier
carries meaning:

```
tracking-[0.2em]   text-xs   uppercase   font-medium   — section/page eyebrows, the widest, most formal
tracking-[0.15em]  text-xs   uppercase   font-medium   — nav links, field labels, list-item kickers
tracking-[0.1em]   text-xs   uppercase   font-medium   — inline metadata (dates, share labels)
tracking-[0.2em]   text-[0.65rem] uppercase            — micro-labels pinned in a corner of a frame
```

Color: `--muted-foreground` by default; `--accent` when the eyebrow leads a major section heading
and you want one point of color. Both are correct — accent is the stronger, rarer choice.

### Prose (long-form articles)

Tailwind Typography with these overrides: serif headings at `font-normal`/`tracking-tight`;
`h2` `text-2xl` with `mt-16`, `h3` `text-xl` with `mt-10`; paragraphs `leading-relaxed` at
`--foreground/90`; links in accent with `underline-offset-4` and `decoration-accent/40` deepening
to full accent on hover; blockquotes serif, `text-xl`, **not italic**, with an accent left border.

---

## 4. Space, layout, and shape

### Radius — near-square

`--radius: 0.125rem` (2px). Effectively sharp corners. The only exception is the button
component, which is a `rounded-lg` shadcn/Base-UI primitive — leave it alone, but don't propagate
large radii anywhere else. **Never** use `rounded-xl`, pill shapes, or circular avatars.

### Widths

| Token | Value | Use |
|---|---|---|
| `--content-width` | `80rem` | Default page container. |
| `--content-width-narrow` | `64rem` | Text-forward pages: about, media, writing index. |
| `--content-width-prose` | `42rem` | Article body — the reading measure. |

Container gutters: `px-6` → `sm:px-8` → `lg:px-12`.

### Vertical rhythm

`--space-section: clamp(4rem, 8vw, 8rem)` between major sections, with a `border-t border-border`
on each. Tighter strips use `py-16 sm:py-20`. List rows use `py-6` (compact) through `py-14`
(feature entries).

### The hairline-list pattern

The most-repeated layout in the system. Stacked items separated by a top rule, with the first
item's rule removed:

```html
<article class="border-t border-border py-8 first:border-t-0 first:pt-0"> … </article>
```

Variants: `border-y border-border py-10` for a standalone strip; `grid gap-px bg-border` with
`bg-background` children for a grid whose gaps read as 1px dividers.

### The 3/9 label grid

Also heavily repeated: an eyebrow in a narrow left column, content in a wide right column.

```html
<div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
  <p class="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase lg:col-span-3">Label</p>
  <div class="lg:col-span-9"> … </div>
</div>
```

Everything is single-column on mobile and only splits at `sm:`/`lg:`. Never build a
three-column layout that survives to small screens.

### Shadow

`--shadow-subtle: 0 1px 2px rgb(24 22 20 / 0.04)` and essentially nothing else. Overlays and
sheets may use a `shadow-lg`; page content never does. Elevation is not part of this system.

---

## 5. Components and interaction

### Buttons

Two variants carry nearly all the work: `default` (ink fill, paper text, `hover:bg-primary/80`)
and `outline` (border, transparent, `hover:bg-muted`). `ghost` for icon buttons. Buttons are
small — `h-8` default — and text is `text-sm font-medium`. Pages generally have **one** solid
button; a second CTA is `outline`.

### Links

| Context | Resting | Hover |
|---|---|---|
| Nav / meta | `text-muted-foreground` | `text-foreground` |
| "More →" link | `text-muted-foreground underline decoration-border underline-offset-4` | `text-foreground decoration-foreground` |
| Serif title inside a `group` card | `text-foreground` | `text-accent` |
| In-prose link | `text-accent underline decoration-accent/40 underline-offset-4` | `decoration-accent` |

Every one uses `transition-colors`. Underlines are always `underline-offset-4` with a muted
decoration color that darkens on hover — never a default browser underline.

Arrows are text glyphs (`→`, `&rarr;`), not icons. Icons are Lucide, `size-4`, and rare.

### Focus and states

`focus-visible:ring-3 focus-visible:ring-ring/50` with `focus-visible:border-ring` on controls;
`outline-2 outline-offset-2 outline-ring` on bare buttons. A skip-to-content link is the first
focusable element on the page. `::selection` is accent on accent-foreground.

### Header

Sticky, `bg-background/95`, `h-16` → `sm:h-20`. Its bottom border is transparent at scroll
position 0 and fades in via `transition-[border-color] duration-300` once scrolled past 8px.
Serif wordmark left, uppercase `tracking-[0.15em]` nav center-right, theme toggle + one outline
CTA right, sheet-based nav below `md`.

### Decorative graphic language

When a page needs a visual, it's linework and grids — not photography or illustration:

- **Dot grid:** `radial-gradient(var(--border) 1px, transparent 1px)` at `22px 22px`, inside a
  bordered square frame.
- **Corner bracket:** a 40px `border-t border-r border-accent` square pinned to a frame's corner —
  the single accent mark in an otherwise neutral composition.
- **Micro-label in-frame:** `text-[0.65rem] tracking-[0.2em] uppercase` pinned bottom-left.
- **Rule as ornament:** an `h-px w-8` muted bar preceding a label ("— Scroll to explore").
- **Wireframe 3D:** the hero's orbital scene — wireframe star, muted spheres with two accent
  bodies, trails fading into the background color, faint guide ellipses. Line-art, monochrome plus
  accent, slow.

---

## 6. Motion

Slow, small, optional. Color/opacity transitions of 150–300ms are the default vocabulary;
`duration-200 ease-in-out` for sheets, which fade and translate ~2.5rem. Ambient animation (the
orbital scene) rotates at a rate you have to watch to notice, pauses when off-screen, and drops
to a single static frame under reduced motion.

A global `prefers-reduced-motion` block clamps every animation and transition to 0.01ms and
disables smooth scroll. Ship it with the tokens — it's in `tokens.css`.

---

## 7. Voice and tone

The writing is as much of the brand as the color. Rules, drawn from the live copy:

- **First person, plain, declarative.** "I've spent my career at the point where technical
  decisions become business decisions." No third-person bio voice on-site.
- **Headlines are sentences and end with a period.** "A small number of things, done well."
  "Available for a small number of conversations." Sentence case, never title case, never
  ALL CAPS outside the eyebrow treatment.
- **Concrete over superlative.** "over $100M in monthly revenue," "teams of twenty-plus
  engineers," "twenty years" — specifics instead of "world-class" or "cutting-edge."
- **Understatement as confidence.** Scarcity and restraint ("a small number of conversations")
  rather than urgency or persuasion. Never an exclamation point. Never "excited to announce."
- **Name the trade-off.** The brand's actual position is a bias toward clarity: name the real
  decision, be honest about costs. Copy should reflect that, including admitting the boring
  answer is usually right.
- **Some self-aware humanity.** The garden, the golden retriever, fly fishing, "building an
  audience from zero, in public, and saying so plainly." Keep one such note per long page —
  no more.
- **Typographic punctuation.** Curly quotes and apostrophes (`’` `“ ”`), em dashes with spaces
  ( — ) for asides, `·` as an inline separator. In JSX, use entities (`&rsquo;`, `&mdash;`).
- **Avoid:** "leverage," "synergy," "passionate," "game-changing," "unlock," "10x," "guru,"
  "thought leader," emoji in body copy, and any sentence that could appear in a pitch deck.

---

## 8. Accessibility

Non-negotiable, and already baked into the tokens:

- Skip-to-content link first in tab order; `aria-current="page"` on active nav; `aria-label` on
  every icon-only control; `aria-hidden` on decorative glyphs and graphics.
- Landmark `aria-label`s on each `nav` ("Primary", "Footer", "Table of contents").
- Full reduced-motion support; ambient animation degrades to a static frame, never disappears.
- Both themes meet contrast targets; theme follows system by default with a manual toggle.
- One `h1` per page; headings never skip levels; a `level` prop pattern lets a shared heading
  component render `h1` or `h2` as needed.

---

## 9. Applying this off the web

For slides, PDFs, social posts, and video:

- **Canvas:** `#f7f5f0` light or `#141310` dark. Never white, never black.
- **Type:** Fraunces 400 for the statement, Inter for everything supporting it. One idea per
  slide/frame, set large, left-aligned, with a lot of margin. Aim for ~40% of the canvas empty.
- **Eyebrow:** Inter, uppercase, `+0.2em` letterspacing, `#6b655c`, above the headline. Carry it
  everywhere — it's the fastest brand identifier you have.
- **Accent:** one teal element per frame, maximum — a highlighted phrase, a short rule, or a
  corner bracket. Use `#1e4a46` if it needs to hold up small or in print.
- **Structure:** hairline rules in `#e4dfd5` (light) / `#2c2822` (dark). No boxes, no drop
  shadows, no rounded cards, no icon sets.
- **Numbering:** zero-padded (`01`, `02`, `03`) in the `tracking-[0.15em]` uppercase style.
- **Never:** stock photography of handshakes or laptops, gradient meshes, neon, drop-shadowed
  text, multiple accent colors, centered-everything layouts. (The one place centering is correct
  is a final call-to-action.)

---

## 10. Implementation

1. Copy `tokens.css` into the new project and import it after Tailwind. It carries the CSS custom
   properties, the Tailwind v4 `@theme` mapping, base layer, and the reduced-motion block. Non-
   Tailwind projects can use just the `:root` / `.dark` blocks.
2. Load the fonts. In Next.js:
   ```ts
   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"], display: "swap" });
   const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
   ```
   Elsewhere, the Google Fonts CSS for `Fraunces:opsz@9..144` and `Inter` is equivalent.
3. Dark mode is a `.dark` class on `<html>` (`next-themes`, `attribute="class"`,
   `defaultTheme="system"`), with a `@custom-variant dark (&:is(.dark *))` in Tailwind v4.
4. Build with semantic tokens only — `bg-background`, `text-muted-foreground`, `border-border`.
   Never a raw hex or a Tailwind palette color (`text-gray-500`, `bg-slate-100`) in a component.

### Prompting an AI agent with this guide

Point the agent at this file and add:

> Follow `brand/STYLE-GUIDE.md`. Use only semantic tokens from `tokens.css` — no raw hex, no
> Tailwind palette colors. Serif (Fraunces 400) for headings and pull quotes, Inter for
> everything else. Separate content with `border-t border-border` hairlines, not cards or
> shadows. Accent teal at most a couple of times per screen. Every section gets an uppercase
> `tracking-[0.2em]` eyebrow. Headlines are sentence case and end in a period. When in doubt,
> remove something.

---

## Quick reference

```
Paper #f7f5f0   Ink #181614   Muted #6b655c   Rule #e4dfd5   Teal #0f766e
Dark:  #141310        #f3f0e9        #948c7f        #2c2822        #3e8b82

Serif  Fraunces 400, tracking-tight        Sans  Inter
Radius 2px      Sections clamp(4rem,8vw,8rem)     Widths 80 / 64 / 42rem
Eyebrow  text-xs uppercase font-medium tracking-[0.2em] text-muted-foreground
Row      border-t border-border py-8 first:border-t-0
Hover    muted→foreground, or serif title →accent
```
