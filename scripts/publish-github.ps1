# Run after: gh auth login -h github.com -p https -w
$ErrorActionPreference = "Stop"

$owner = "bathiyaspecs"

Write-Host "Creating SpecDev (source) and bathiyaspecs.github.io (user site) if missing..."
gh repo view "$owner/SpecDev" 2>$null
if ($LASTEXITCODE -ne 0) {
  gh repo create "$owner/SpecDev" --public --description "Spec Kit podcast site + Next.js static export"
}
gh repo view "$owner/bathiyaspecs.github.io" 2>$null
if ($LASTEXITCODE -ne 0) {
  gh repo create "$owner/bathiyaspecs.github.io" --public --description "GitHub Pages user site"
}

$remote = git remote get-url origin 2>$null
if (-not $remote) {
  git remote add origin "https://github.com/$owner/SpecDev.git"
}

git push -u origin main

Write-Host "Enable GitHub Pages on SpecDev (Actions)..."
gh api -X PUT "repos/$owner/SpecDev/pages" -f build_type=workflow 2>$null
gh api -X POST "repos/$owner/SpecDev/pages" -f build_type=workflow 2>$null

Write-Host ""
Write-Host "Done. Next steps:"
Write-Host "1. SpecDev -> Settings -> Secrets -> Add PAGES_DEPLOY_TOKEN (PAT with write on bathiyaspecs.github.io)"
Write-Host "2. bathiyaspecs.github.io -> Settings -> Pages -> Deploy from branch main / (root)"
Write-Host "3. Re-run Actions workflow or push again for https://bathiyaspecs.github.io"
Write-Host "Preview until then: https://bathiyaspecs.github.io/SpecDev/ (after first workflow)"