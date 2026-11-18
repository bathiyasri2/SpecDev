# GitHub Pages setup

## Repositories

| Repo | Purpose |
|------|---------|
| `<your-user>/SpecDev` | Source (Spec Kit + `web/` Next.js app) |
| `<your-user>/<your-user>.github.io` | User site root — **https://\<your-user\>.github.io** |

## Recommended: publish user site from your machine

`GITHUB_TOKEN` cannot push to another repository. Cross-repo Actions deploy needs a PAT, and a wrong/incomplete PAT causes `403 Permission denied`.

From the repo root (after `gh auth login`):

```powershell
powershell -File scripts/publish-user-site.ps1
```

This builds `web/` without `basePath` and pushes to `<user>.github.io`.

Then open **https://\<your-user\>.github.io** (e.g. https://bathiyasri2.github.io).

## SpecDev preview (Actions)

On every push to `main`, Actions deploys SpecDev GitHub Pages with `/SpecDev` basePath:

- **https://\<your-user\>.github.io/SpecDev/**

Enable: SpecDev → Settings → Pages → **GitHub Actions**.

## Optional: Actions deploy to user site

Only if you want CI to push to `<user>.github.io`:

1. Create a **classic** PAT with the **`repo`** scope (fine-grained tokens often fail with “Permission denied” unless Contents: Write is granted on the `.github.io` repo).
2. SpecDev → Settings → Secrets → Actions → `PAGES_DEPLOY_TOKEN` = that PAT (not `GITHUB_TOKEN`).
3. `.github.io` → Settings → Pages → Deploy from branch **main**, folder **/**.

If the secret is missing or lacks write access, the user-site job soft-fails; SpecDev preview still deploys.
