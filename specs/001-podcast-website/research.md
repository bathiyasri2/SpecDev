# Research: Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-11-16

## 1. Static site generator choice

**Decision**: Next.js App Router with `output: 'export'` in `next.config.ts`.

**Rationale**: Matches user direction and constitution v1.1.0 (build-time tooling, static output at visit time). App Router gives file-based routes for the four required pages and a shared root layout for consistent nav and styling.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Plain HTML/CSS/JS | User explicitly requested Next.js for this feature. |
| Next.js with SSR | Violates static delivery; requires Node at visit time. |
| Vite + React SPA only | Possible, but user asked for Next.js; file-based routing maps cleanly to four pages. |

## 2. Mock data location

**Decision**: TypeScript modules under `web/content/` exporting typed objects and arrays (`show`, `episodes`, `about`, `faq`).

**Rationale**: Constitution allows embedded mock data; types catch missing fields during build. No JSON fetch at runtime, satisfying FR-014 and Principle III.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Markdown + MDX | Extra parsing setup; not required by spec. |
| External JSON fetched at runtime | Fails no-backend requirement for core content. |
| CMS | Out of scope; database not allowed. |

## 3. Featured episode selection

**Decision**: Sort episodes by `publishedAt` descending; featured = first item; Episodes list uses same sorted array.

**Rationale**: Implements FR-009, FR-010 with one source of truth in `lib/episodes.ts`.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Separate `featuredId` field | Risk of drift from “newest first” rule. |
| Hard-coded featured on Home only | Would break FR-010 parity with catalog. |

## 4. FAQ interaction (FR-013)

**Decision**: Client component accordion/disclosure pattern (`FaqSection`) with `'use client'`; answers toggled in-page without navigation.

**Rationale**: Spec requires reveal on same page; static export supports client hydration for light interactivity.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Separate page per answer | Violates FR-013. |
| Details/summary only (no JS) | Viable fallback; accordion keeps sleek UX aligned with design goals. |

## 5. Responsive layout

**Decision**: Mobile-first CSS in `globals.css` with breakpoints (~640px, ~1024px); collapsed nav via button on narrow viewports.

**Rationale**: FR-016, edge case for narrow nav; no third-party UI kit required.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Tailwind | Adds dependency; plain CSS is sufficient for four pages. |
| Fixed desktop-only layout | Fails spec and constitution browser verification. |

## 6. Visual direction (“sleek, stand out”)

**Decision**: Dark theme, strong typographic hierarchy, accent color for featured episode card, generous whitespace, subtle borders/gradients—no stock podcast template layout.

**Rationale**: Spec qualitative goal; implemented via CSS tokens in `globals.css` (not a separate design system package).

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Generic Bootstrap theme | Conflicts with “stand out” positioning. |
| Heavy animation libraries | Out of scope for simplicity gate. |

## 7. Static export constraints (Next.js)

**Decision**: No `fetch` to internal APIs, no dynamic server features, no `cookies()`/`headers()` in server components for core pages. Image optimization uses static `img` or `unoptimized` if using `next/image`.

**Rationale**: Ensures `next build` → static `out/` without server.

**Alternatives considered**:

| Option | Rejected because |
|--------|------------------|
| Default Next image optimizer on static host | May need config; document in quickstart. |