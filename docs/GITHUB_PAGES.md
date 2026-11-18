# GitHub Pages setup

## Repositories

| Repo | Purpose |
|------|---------|
| `<your-user>/SpecDev` | Source (Spec Kit + `web/` Next.js app) |
| `<your-user>/<your-user>.github.io` | User site root — **https://\<your-user\>.github.io** |

## Automatic deploy

On every push to `main` of **SpecDev**:

1. **Preview** (always): builds with `basePath` `/SpecDev` and deploys to SpecDev GitHub Pages  
   - URL: `https://bathiyaspecs.github.io/SpecDev/` (after Pages is enabled on SpecDev)

2. **User site** (when configured): builds without `basePath` and pushes `web/out` to `bathiyaspecs.github.io`  
   - URL: **https://bathiyaspecs.github.io**

### One-time: enable user site deploy

1. Create an empty public repo: `bathiyaspecs.github.io`
2. Create a fine-grained PAT with **Contents: Read and write** on that repo (or classic `repo` scope).
3. In **SpecDev** → Settings → Secrets → Actions, add `PAGES_DEPLOY_TOKEN` with the PAT.
4. On `bathiyaspecs.github.io` → Settings → Pages, set source to **Deploy from branch** → branch `main` → folder `/ (root)`.

Without `PAGES_DEPLOY_TOKEN`, only the `/SpecDev/` preview job runs.