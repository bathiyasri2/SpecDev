# UI Route Contract: Podcast Website

**Version**: 1.0 | **Feature**: 001-podcast-website

Visitors MUST reach exactly these routes. Static export maps each to an HTML file.

| Route | Page | Primary content (must be present in shipped HTML) |
|-------|------|--------------------------------------------------|
| `/` | Home | Show `name`, `tagline`, featured episode (title, date, duration, summary), CTA link to `/episodes` |
| `/episodes` | Episodes | Ordered list of 20 episodes (title, date, duration, summary each) |
| `/about` | About | What show covers, audience, host |
| `/faq` | FAQ | ≥6 questions; each answer reachable without leaving page |

## Navigation contract

On every route:

- Links to `/`, `/episodes`, `/about`, `/faq`
- Current route visually distinct (FR-003)
- No link targets a non-existent route (FR-019)

## Responsive contract

At viewport widths 390px and 1024px:

- `main` content readable without horizontal scroll (FR-016)
- Nav usable: either full links visible or menu control exposes all four destinations

## Static delivery contract

- All four routes exist as pre-rendered HTML in export output after `next build`
- Core text for show and all 20 episodes present without network calls to third-party APIs or databases