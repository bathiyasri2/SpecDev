# Content Module Contract: Podcast Website

**Version**: 1.0 | **Feature**: 001-podcast-website

Build-time modules MUST export the shapes defined in [data-model.md](../data-model.md).

## Module map

| Module path | Exports | Consumers |
|-------------|---------|-----------|
| `web/content/show.ts` | `show` object | `layout`, Home, shared headers |
| `web/content/episodes.ts` | `episodes` array (length 20) | Home (featured), Episodes page |
| `web/content/about.ts` | `about` content | About page |
| `web/content/faq.ts` | `faqItems` array (length ≥ 6) | FAQ page |
| `web/lib/episodes.ts` | `getEpisodesNewestFirst()`, `getFeaturedEpisode()` | Pages and components |

## Episode list function contract

`getEpisodesNewestFirst()`:

- Returns a new array sorted by `publishedAt` descending
- Does not mutate source data

`getFeaturedEpisode()`:

- Returns the first element of `getEpisodesNewestFirst()`
- MUST match first row on Episodes page and featured block on Home

## Display formatting (presentation only)

| Field | Display rule |
|-------|----------------|
| `publishedAt` | Human-readable date in visitor locale or fixed `en-US` long date |
| `durationMinutes` | e.g. "`{n}` min" |

Formatting is implementation detail; underlying data stays ISO in source.