# Data Model: Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-11-16

All data is mock, embedded at build time. No persistence layer.

## Show

Represents the single fictional podcast brand.

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | yes | Non-empty; shown on every page header area |
| `tagline` | string | yes | Non-empty; Home hero |
| `subject` | string | yes | About copy: what the show covers |
| `audience` | string | yes | About copy: who it is for |
| `host` | string | yes | About copy: host name |

**Source**: `web/content/show.ts` (re-exported fields used on About via `web/content/about.ts` if split for clarity).

## Episode

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | yes | Unique stable id (slug) |
| `title` | string | yes | Unique among all 20 (FR-008) |
| `publishedAt` | string (ISO date) | yes | Parseable date; used for sort |
| `durationMinutes` | number | yes | Positive integer; displayed as duration |
| `summary` | string | yes | Short paragraph; wraps in UI |

**Derived (not stored)**:

- `featured`: `true` for exactly one episode — the episode with the greatest `publishedAt` after sort (FR-010).
- Display order: descending `publishedAt` (FR-009).

**Cardinality**: Exactly 20 episodes in `web/content/episodes.ts`.

## AboutContent

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `bodyParagraphs` | string[] | yes | At least one; must convey subject, audience, host (FR-011) |

May duplicate or reference `Show` fields; must satisfy FR-011 when rendered.

## FaqItem

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | yes | Unique |
| `question` | string | yes | Non-empty |
| `answer` | string | yes | Non-empty |

**Cardinality**: Minimum 6 items (FR-012).

## Relationships

```text
Show 1 ── presents ──> Episode 20
Show 1 ── described by ──> AboutContent 1
Show 1 ── explained by ──> FaqItem ≥6
```

## Invariants (enforced in `web/lib/episodes.ts` or build-time asserts)

1. `episodes.length === 20`
2. All episode `title` values unique
3. Exactly one episode is newest; Home featured block uses that episode
4. No empty FAQ answers
5. All dates valid ISO 8601 date strings (`YYYY-MM-DD`)

## Out of scope entities

Playback URL, RSS feed, user accounts, comments, transcripts, guest records.