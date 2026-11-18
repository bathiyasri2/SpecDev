# Quickstart: Podcast Website

**Feature**: 001-podcast-website | **Plan**: [plan.md](../plan.md)

Validation guide for developers and reviewers. Implementation bodies belong in `tasks.md` / implement phase—not duplicated here.

## Prerequisites

- Node.js 20 LTS
- npm (or compatible package manager)

## Setup

From repository root:

```bash
cd web
npm install
```

## Development server (local authoring only)

```bash
npm run dev
```

Open `http://localhost:3000` — used for interactive development; constitution delivery target is the **static export**, not the dev server.

## Produce static site

```bash
npm run build
```

Expect `web/out/` (or path configured in `next.config.ts`) containing `index.html`, `episodes.html`, etc.

## Serve static export locally

```bash
npx serve out
```

Verify behavior matches production static hosting (no Next.js server).

## Validation scenarios

Run each after a build or via dev server; confirm on **390px** and **1024px** viewport widths.

### VS-001 Home featured episode

1. Open `/`
2. Confirm show name, tagline, one featured episode with title, date, duration, summary
3. Confirm one clear control links to `/episodes`

### VS-002 Episode catalog

1. Open `/episodes`
2. Count 20 episodes; titles all unique
3. Confirm newest episode matches featured block on Home (compare title)

### VS-003 About

1. Open `/about`
2. Confirm content states subject, audience, and host

### VS-004 FAQ

1. Open `/faq`
2. Confirm ≥6 questions
3. Activate each question; answer appears without route change

### VS-005 Navigation

1. From each of the four routes, follow nav to the other three
2. Confirm current page is highlighted; no 404

### VS-006 Responsive

1. At 390px width, repeat VS-001 and VS-005 (nav via menu if collapsed)
2. Confirm no horizontal scroll on `main`

### VS-007 Offline content

1. Serve static `out/` and disable network in browser devtools (optional)
2. Confirm Home and Episodes still show all mock episode text

## References

- Data shapes: [data-model.md](../data-model.md)
- Routes: [contracts/routes.md](../contracts/routes.md)
- Content exports: [contracts/content-modules.md](../contracts/content-modules.md)
- Spec functional requirements: [spec.md](../spec.md)

## Success alignment

| Success criterion | Quickstart check |
|-------------------|------------------|
| SC-002 | VS-001 step 3 |
| SC-003 | VS-005 |
| SC-004 | VS-002 |
| SC-005 | VS-004 |
| SC-006 | VS-006 |