---
description: "Task list for podcast website implementation"
---

# Tasks: Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested in spec—manual validation via quickstart.md only (final polish phase).

**Organization**: Tasks grouped by user story for independent delivery.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete-task dependencies)
- **[Story]**: User story label (US1–US5)

## Path Conventions

- Next.js app root: `web/` (per plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js static-export project

- [x] T001 Create directory tree `web/app/`, `web/components/`, `web/content/`, `web/lib/`, `web/public/` per `specs/001-podcast-website/plan.md`
- [x] T002 Initialize Next.js App Router with TypeScript in `web/package.json` (scripts: `dev`, `build`, `start`)
- [x] T003 Configure static export in `web/next.config.ts` (`output: 'export'`)
- [x] T004 Add TypeScript baseline in `web/tsconfig.json` and required Next.js config files in `web/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared layout, navigation, styles, and content helpers—**blocks all user stories**

**⚠️ CRITICAL**: No user story page work until this phase is complete

- [x] T005 Create `Show` mock in `web/content/show.ts` (`name`, `tagline`, `subject`, `audience`, `host`—all required non-empty per data-model.md)
- [x] T006 Implement `getEpisodesNewestFirst()` and `getFeaturedEpisode()` in `web/lib/episodes.ts` (sort `publishedAt` descending; featured = first; do not mutate source)
- [x] T007 Implement `SiteNav` in `web/components/SiteNav.tsx` with links to `/`, `/episodes`, `/about`, `/faq` and active-route styling (FR-003)
- [x] T008 Implement root layout with semantic shell (`header`, `nav`, `main`) in `web/app/layout.tsx` importing `SiteNav` and `globals.css`
- [x] T009 Add mobile-first sleek theme tokens and responsive breakpoints in `web/app/globals.css` (no horizontal scroll on `main` at 390px/1024px—FR-016)
- [x] T010 [P] Create reusable `PageHeader` in `web/components/PageHeader.tsx` using `show.name` from `web/content/show.ts`

**Checkpoint**: Layout and nav render; foundation ready for page routes

---

## Phase 3: User Story 1 - Land on a distinctive show (Priority: P1) 🎯 MVP

**Goal**: Home shows show identity and exactly one featured episode with CTA to Episodes

**Independent Test**: Open `/` only—see name, tagline, featured title/date/duration/summary; one link to `/episodes` (spec US1)

### Implementation for User Story 1

- [x] T011 [P] [US1] Create `FeaturedEpisode` in `web/components/FeaturedEpisode.tsx` (title, `publishedAt`, `durationMinutes`, `summary`; text wraps in card—FR-018)
- [x] T012 [US1] Implement Home in `web/app/page.tsx` (show `name`/`tagline`, one featured via `getFeaturedEpisode()`, CTA to `/episodes` before other episode lists—FR-004–FR-006)

**Checkpoint**: MVP home page verifiable via quickstart VS-001

---

## Phase 4: User Story 2 - Browse all episodes (Priority: P2)

**Goal**: Episodes page lists exactly 20 unique mock episodes, newest first, matching Home featured

**Independent Test**: Open `/episodes`—count 20; first item matches Home featured title (FR-007–FR-010)

### Implementation for User Story 2

- [x] T013 [P] [US2] Create 20 episodes in `web/content/episodes.ts` (`id`, unique `title`, ISO `publishedAt` `YYYY-MM-DD`, positive integer `durationMinutes`, `summary`; `episodes.length === 20`)
- [x] T014 [P] [US2] Create `EpisodeCard` in `web/components/EpisodeCard.tsx` (display date and duration; long titles wrap—FR-018)
- [x] T015 [US2] Create `EpisodeList` in `web/components/EpisodeList.tsx` using `getEpisodesNewestFirst()` from `web/lib/episodes.ts`
- [x] T016 [US2] Implement Episodes route in `web/app/episodes/page.tsx` rendering full list

**Checkpoint**: quickstart VS-002 passes (featured parity with Home)

---

## Phase 5: User Story 5 - Move between pages (Priority: P2)

**Goal**: All four pages reachable from any page; current page visually distinct; mobile nav usable

**Independent Test**: From each route, reach the other three; active state correct; no 404 (spec US5, FR-019)

### Implementation for User Story 5

- [x] T017 [US5] Add collapsible mobile menu control in `web/components/SiteNav.tsx` (all four routes reachable at ≤390px—edge case in spec.md)
- [x] T018 [US5] Wire `SiteNav` current-path detection for `/`, `/episodes`, `/about`, `/faq` in `web/components/SiteNav.tsx` (verify on all four `web/app/**/page.tsx` routes)

**Checkpoint**: quickstart VS-005 passes

---

## Phase 6: User Story 3 - Learn about the show (Priority: P3)

**Goal**: About states subject, audience, and host

**Independent Test**: Open `/about`—visitor can state what show covers, who it is for, who hosts (FR-011)

### Implementation for User Story 3

- [x] T019 [P] [US3] Create About copy in `web/content/about.ts` (`bodyParagraphs` array; at least one paragraph; conveys subject, audience, host)
- [x] T020 [US3] Implement About route in `web/app/about/page.tsx` rendering `web/content/about.ts` with shared layout

**Checkpoint**: quickstart VS-003 passes

---

## Phase 7: User Story 4 - Find a common answer (Priority: P4)

**Goal**: FAQ with ≥6 questions; answers revealed on same page

**Independent Test**: Open `/faq`—expand each Q/A without navigation (FR-012, FR-013)

### Implementation for User Story 4

- [x] T021 [P] [US4] Create ≥6 `FaqItem` records in `web/content/faq.ts` (unique `id`, non-empty `question` and `answer`)
- [x] T022 [US4] Implement client `FaqSection` accordion in `web/components/FaqSection.tsx` (`'use client'`; answers toggle without route change)
- [x] T023 [US4] Implement FAQ route in `web/app/faq/page.tsx` using `FaqSection`

**Checkpoint**: quickstart VS-004 passes

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Static export, consistency, constitution browser verification

- [x] T024 [P] Ensure consistent show branding (name, color, spacing) across `web/app/page.tsx`, `web/app/episodes/page.tsx`, `web/app/about/page.tsx`, `web/app/faq/page.tsx` (FR-017)
- [ ] T025 Run `npm run build` in `web/` and confirm static output includes `/`, `/episodes`, `/about`, `/faq` (contracts/routes.md)
- [ ] T026 Serve export and execute quickstart scenarios VS-001–VS-007 in `specs/001-podcast-website/quickstart.md` at 390px and 1024px widths
- [x] T027 Confirm no secrets in `web/` and all core text is embedded mock content (FR-014; constitution Delivery Constraints)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → User story phases (3–7) → **Phase 8**
- **Phase 2** blocks all story phases (T012+ need layout, nav, styles, `show.ts`, `lib/episodes.ts`)
- **US2** (T013–T016) should follow **US1** (T012) so Home can use episodes once `web/content/episodes.ts` exists—or implement T013 in parallel before T012 but T012 needs episodes for featured: **T013 before T012** if featured uses real data. **Order fix**: T013 should be before T012 or in Foundational.

**Execution note**: Move episode data before Home if featured reads from `episodes.ts`. Recommended order after Phase 2: **T013 → T011 → T012** (content before featured UI), or complete T013 immediately after T006 in parallel with T007–T010.

### User Story Dependencies

| Story | Depends on | Notes |
|-------|------------|-------|
| US1 | Phase 2, `episodes.ts` for featured | Run T013 before T012 |
| US2 | Phase 2, T013 | Catalog page |
| US5 | Phase 2, all four routes exist | T017–T018 after pages exist (T020–T023) |
| US3 | Phase 2 | Independent of US2/US4 |
| US4 | Phase 2 | Independent |

### Parallel Opportunities

- **Phase 1**: T003 and T004 [P] after T002
- **Phase 2**: T010 [P] while T007–T009
- **US2**: T013 and T014 [P]
- **US3/US4**: T019 and T021 [P] if different developers after Phase 2
- **Polish**: T024 [P] while preparing T025

### Parallel Example: User Story 2

```text
T013 — web/content/episodes.ts (20 episodes, typed fields)
T014 — web/components/EpisodeCard.tsx
Then T015 → T016 (list + page)
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 + Phase 2
2. **T013** (episodes data) then **T011–T012** (Home)
3. Validate VS-001
4. Stop and demo static home

### Incremental Delivery

1. Setup + Foundational
2. US1 Home (MVP)
3. US2 Episodes + US5 nav hardening
4. US3 About + US4 FAQ
5. Phase 8 polish and full quickstart

### Parallel Team Strategy

After Phase 2: Developer A — US1+US2; Developer B — US3+US4; Developer C — US5 + polish T024

---

## Notes

- No automated test tasks (constitution: browser verification only)
- Shipped artifact is static `web/out/` after build—not the dev server
- Each checkbox task includes an explicit file path for `/speckit-implement`