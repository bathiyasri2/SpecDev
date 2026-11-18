# Implementation Plan: Podcast Website

**Branch**: `001-podcast-website` | **Date**: 2026-11-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

## Summary

Deliver a distinctive four-page podcast marketing site (Home, Episodes, About, FAQ) with one featured episode on Home and a catalog of twenty mock episodes, fully responsive for mobile.

**Technical approach**: Next.js (App Router) with `output: 'export'` so the shipped site is static HTML, CSS, and JavaScript. All show, episode, About, and FAQ copy lives in embedded TypeScript content modules—no database and no live feed.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20 LTS (local build only)

**Primary Dependencies**: Next.js (App Router), React

**Storage**: Embedded mock content in `web/content/` modules. No database.

**Testing**: Manual browser verification on phone-width (≤390px) and laptop-width (≥1024px) viewports per constitution Principle IV.

**Target Platform**: Static files under `web/out/` (or equivalent export directory), servable from any static host.

**Project Type**: Static website (Next.js static export)

**Performance Goals**: First meaningful paint shows show name and featured episode without waiting on network data fetches.

**Constraints**: No database; no API routes required at runtime; no authentication; no audio playback in v1 per spec assumptions; responsive layout without horizontal scroll on main content.

**Scale/Scope**: 4 routes, 1 show record, 20 episodes, ≥6 FAQ items, shared site chrome (nav, footer optional).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution: `.specify/memory/constitution.md` **v1.1.0**.

| Gate | Result | Evidence |
|------|--------|----------|
| I. Static Delivery | PASS | `output: 'export'`; no server at visit time. |
| II. Static Web Output | PASS | Export emits HTML/CSS/JS assets. |
| III. No Required Backend | PASS | Content embedded; no fetch to live feed. |
| IV. Browser Verification | PASS | quickstart.md defines manual checks. |
| V. Simplicity | PASS | Next.js scoped to four pages + shared layout/components. |
| Embedded mock data | PASS | Delivery Constraints allow embedded episodes. |
| Quality gates | PASS | Plan uses approved static generator pattern. |

**Pre-design**: PASS  
**Post-design** (Phase 1): PASS — data model and contracts use build-time content only; no runtime server.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1
└── tasks.md             # /speckit-tasks (not created here)
```

### Source Code (repository root)

```text
web/
├── app/
│   ├── layout.tsx           # Site shell, fonts, global styles
│   ├── page.tsx             # Home (featured episode)
│   ├── episodes/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   └── globals.css
├── components/
│   ├── SiteNav.tsx
│   ├── FeaturedEpisode.tsx
│   ├── EpisodeCard.tsx
│   ├── EpisodeList.tsx
│   ├── FaqSection.tsx
│   └── PageHeader.tsx
├── content/
│   ├── show.ts
│   ├── episodes.ts
│   ├── about.ts
│   └── faq.ts
├── lib/
│   └── episodes.ts          # sort, featured selection helpers
├── public/                  # static assets (optional art)
├── next.config.ts           # output: 'export'
├── package.json
└── tsconfig.json
```

**Structure Decision**: Single Next.js app under `web/` keeps the repo root free for Spec Kit docs and matches constitution “smallest set of files” for this feature.

## Complexity Tracking

No constitution violations requiring justification.