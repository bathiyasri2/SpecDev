# SpecDev

This repository carries out a **[Spec Kit](https://github.com/github/spec-kit)** tutorial: constitution → specify → plan → tasks → implement for a small static web app.

## What you get

A fictional podcast site (**Signal & Static**) built as a **Next.js static export** (no database, mock episode data embedded in source).

| Path | Role |
|------|------|
| `.specify/` | Spec Kit memory, templates, and scripts |
| `.cursor/skills/` | Spec Kit agent skills used in Cursor |
| `specs/001-podcast-website/` | Feature spec, plan, research, tasks, contracts |
| `web/` | Next.js App Router site (`output: 'export'`) |

## Spec Kit flow used here

1. **Constitution** — project rules (static delivery, browser verification)
2. **Specify** — podcast website feature in `specs/001-podcast-website/spec.md`
3. **Plan** — Next.js static site design (`plan.md`, `research.md`, `data-model.md`)
4. **Tasks** — ordered checklist in `tasks.md`
5. **Implement** — code under `web/`

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Static build:

```bash
cd web
npm run build
```

Output: `web/out/`

## Pages

- `/` — home + one featured episode  
- `/episodes` — 20 mock episodes  
- `/about` — show overview  
- `/faq` — accordion FAQ  

## GitHub Pages

See [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md).

- User site: publish with `powershell -File scripts/publish-user-site.ps1`  
- SpecDev preview: Actions deploy to `/SpecDev/` after push to `main`

## License

Tutorial / sample project — use freely for learning Spec Kit and static site workflows.
