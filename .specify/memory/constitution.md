<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Bump rationale: MINOR — materially expanded Principle II, V, and Quality Gates
  to allow static-site tooling (e.g. Next.js static export) while keeping runtime
  delivery as static files only.
- Modified principles:
  - II. Plain Web Files → II. Static Web Output (runtime); build-time generators allowed
  - V. Simplicity → libraries allowed when required for an approved static build
- Quality Gates: plans may specify static generators; shipped pages remain HTML/CSS/JS
- Deferred TODOs: none
-->

# My Simple Web App Constitution

## Core Principles

### I. Static Delivery

The shipped app MUST be a set of static files: HTML, CSS, JavaScript, and
assets. It MUST be servable by any static file host. An application server,
database, or runtime build service MUST NOT be required to open the site.

Source MAY use a static-site generator or framework (for example Next.js with
static export) if the published artifact is still static files only.

Rationale: the product is a static web app; runtime infrastructure is out of
scope. Build-time tooling is allowed when visitors still receive plain static
files.

### II. Static Web Output

What visitors receive MUST be HTML, CSS, browser JavaScript, and assets.
Implementation MAY use a static-site toolchain (including Next.js configured for
static export) to produce those files. The toolchain MUST NOT be required at
visit time.

Rationale: portability depends on the shipped files, not on how they were
authored or built.

### III. No Required Backend

Every page MUST render and every in-site link MUST resolve from the static
files alone. Network calls MAY enhance a page, but core content and navigation
MUST work when those calls are absent.

Rationale: a static app that depends on an API is no longer static.

### IV. Browser Verification

A UI change is complete only after the affected pages are opened in a browser
and the main path is exercised (open, click, type, navigate). Shared pages
that read the same content MUST be checked together. Empty and broken-link
states MUST be checked when the change can produce them.

Rationale: appearance of the markup is not evidence that the page works.

### V. Simplicity

Each change MUST be the smallest set of files that meets the current spec.
New pages and assets MUST NOT be added unless the spec requires them.

Dependencies (including a framework or static-site generator) MAY be added when
needed to meet the spec or an approved plan, and MUST be kept to what that
delivery requires.

Rationale: unused surface area is the main way a simple static site grows
past its purpose.

## Delivery Constraints

- Source MUST stay free of secrets, API keys, tokens, and credentials.
- Local assets MUST be referenced with paths that work when the site is
  served from a static root.
- Pages MUST use semantic HTML elements for their structure (headings, nav,
  main, lists, buttons, links).
- User-visible text MUST be in the HTML, not only in images.
- Mock or sample content (for example podcast episodes) MAY be embedded in
  source or generated at build time. A database MUST NOT be required.

## Quality Gates

- Specs, plans, and tasks MAY specify static-site generators (for example
  Next.js static export with embedded mock data) when Principle I and II
  are satisfied.
- The shipped site MUST still be static HTML, CSS, JavaScript, and assets.
- Automated tests are not required. Browser verification under Principle IV
  is the gate.
- A page MUST NOT ship with a known broken in-site link or a blank main
  region when content exists.

## Governance

This constitution overrides informal practice for this repository. Specs,
plans, tasks, and implementation MUST comply with it.

Amendments MUST be written into this file, MUST include a version bump, and
MUST set Last Amended to the change date. Versioning follows:

- MAJOR: a principle is removed or redefined so existing work would violate it.
- MINOR: a principle or section is added or materially expanded.
- PATCH: wording clarifications that do not change the rule.

**Version**: 1.1.0 | **Ratified**: 2026-11-16 | **Last Amended**: 2026-11-16