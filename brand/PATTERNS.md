# Brand patterns — copy-paste markup

Tailwind + the tokens in `tokens.css`. These are the recurring compositions; building new pages
out of them is what keeps things on-brand. Rules behind them: `STYLE-GUIDE.md`.

## Section shell

```jsx
<section className="border-t border-border py-(--space-section)">
  <div className="mx-auto w-full max-w-(--width-content-narrow) px-6 sm:px-8 lg:px-12">
    {children}
  </div>
</section>
```

Widths: `--width-content` (80rem) default, `--width-content-narrow` (64rem) text-forward,
`--width-content-prose` (42rem) article body.

## Section heading (eyebrow + title + description)

```jsx
<div className="max-w-2xl">
  <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">How I help</p>
  <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">
    A small number of things, done well.
  </h2>
  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
    One or two sentences of context. Sentence case, ends in a period.
  </p>
</div>
```

Swap `text-accent` → `text-muted-foreground` for a quieter eyebrow. Use `h1` and
`text-4xl sm:text-5xl` when it's the page's main heading.

## Heading + "more" link row

```jsx
<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
  {/* SectionHeading */}
  <a href="/writing" className="shrink-0 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
    All writing &rarr;
  </a>
</div>
```

## Hairline list row

```jsx
<a href="…" className="group block border-t border-border py-8 first:border-t-0 first:pt-0">
  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-8">
    <h3 className="font-serif text-2xl transition-colors group-hover:text-accent">Title</h3>
    <p className="shrink-0 text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
      March 4, 2026
    </p>
  </div>
  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Summary line.</p>
</a>
```

## 3/9 label grid

```jsx
<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase lg:col-span-3">
    Beyond the work
  </p>
  <div className="lg:col-span-9">
    <p className="font-serif text-2xl leading-snug text-balance sm:text-3xl">
      The statement, set large in serif.
    </p>
    <p className="mt-4 text-base leading-relaxed text-muted-foreground">Supporting line.</p>
  </div>
</div>
```

## Numbered card grid

```jsx
<div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
  {items.map((item, i) => (
    <a key={item.slug} href={`#${item.slug}`} className="group border-t border-border pt-6">
      <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-serif text-2xl transition-colors group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
    </a>
  ))}
</div>
```

## Bordered strip (stats / credibility)

```jsx
<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-y border-border py-10 sm:grid-cols-3">
  {items.map((item) => (
    <div key={item.id}>
      <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
        {item.period}
      </p>
      <p className="mt-2 font-serif text-lg">{item.role}</p>
      <p className="text-sm text-muted-foreground">{item.org}</p>
    </div>
  ))}
</div>
```

## Label/value grid (case study fields)

```jsx
<dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
  {fields.map(({ key, label }) => (
    <div key={key}>
      <dt className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-foreground/90">{value}</dd>
    </div>
  ))}
</dl>
```

## Closing CTA — the one place centering is right

```jsx
<section className="border-t border-border py-(--space-section) pb-28 sm:pb-36">
  <div className="mx-auto w-full max-w-(--width-content-narrow) px-6 text-center sm:px-8 lg:px-12">
    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Get in touch</p>
    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
      Available for a small number of conversations.
    </h2>
    <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
      One sentence of qualification.
    </p>
    <div className="mt-10">{/* one solid Button */}</div>
  </div>
</section>
```

## Divider grid (1px gaps, e.g. prev/next)

```jsx
<nav className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
  <a className="group flex flex-col justify-center gap-2 bg-background p-8"> … </a>
  <a className="group flex flex-col justify-center gap-2 bg-background p-8 sm:items-end sm:text-right"> … </a>
</nav>
```

## Framed graphic (dot grid + corner bracket)

```jsx
<div className="relative mx-auto aspect-square w-full max-w-lg border border-border">
  <div
    aria-hidden="true"
    className="absolute inset-0"
    style={{
      backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}
  />
  <span aria-hidden="true" className="absolute -top-px -right-px h-10 w-10 border-t border-r border-accent" />
  <div className="relative h-full w-full p-6">{/* content */}</div>
  <span className="absolute bottom-4 left-4 text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
    New York, NY
  </span>
</div>
```

## Rule-prefixed label

```jsx
<div className="flex items-center gap-3 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
  <span aria-hidden="true" className="block h-px w-8 bg-muted-foreground" />
  Scroll to explore
</div>
```

## Prose wrapper (MDX / long-form)

```jsx
<div className={cn(
  "prose prose-neutral dark:prose-invert max-w-none",
  "prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight",
  "prose-h2:mt-16 prose-h2:mb-4 prose-h2:text-2xl prose-h2:scroll-mt-24",
  "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-xl prose-h3:scroll-mt-24",
  "prose-p:leading-relaxed prose-p:text-foreground/90",
  "prose-a:text-accent prose-a:underline prose-a:underline-offset-4 prose-a:decoration-accent/40 hover:prose-a:decoration-accent",
  "prose-strong:text-foreground prose-strong:font-semibold",
  "prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-foreground",
  "prose-hr:border-border",
  "prose-li:marker:text-muted-foreground",
)} />
```

## Open Graph / social card

Paper `#f7f5f0`, ink `#181614`, 96px padding, left-aligned: uppercase eyebrow at 28px /
`letterSpacing: 6` in `#6b655c`, name at 76px / `lineHeight: 1.05`, then a 64×3px rule in
`#1e4a46`. That's the whole card — no logo, no photo, no border.
