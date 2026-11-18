# Build Next.js static export and push to <user>.github.io (user site root).
# Uses your local gh login — no Actions secret required.
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$owner = gh api user -q .login
if (-not $owner) {
  throw "Not logged in. Run: gh auth login -h github.com -p https -w"
}

$userSite = "$owner/$owner.github.io"
$siteUrl = "https://$owner.github.io"
$workDir = Join-Path $env:TEMP "gh-pages-$owner"
$token = gh auth token

Write-Host "Building static site (no basePath)..."
Push-Location (Join-Path $repoRoot "web")
try {
  npm install
  if ($env:GITHUB_PAGES) { Remove-Item Env:GITHUB_PAGES }
  npm run build
  if (-not (Test-Path "out")) {
    throw "Build did not produce web/out"
  }
} finally {
  Pop-Location
}

Write-Host "Publishing to $userSite ..."
if (Test-Path $workDir) {
  Remove-Item -Recurse -Force $workDir
}

$remote = "https://x-access-token:${token}@github.com/$userSite.git"
git clone --depth 1 $remote $workDir

Get-ChildItem -Force $workDir | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

Copy-Item -Path (Join-Path $repoRoot "web\out\*") -Destination $workDir -Recurse -Force

# Avoid Jekyll processing on GitHub Pages
New-Item -ItemType File -Path (Join-Path $workDir ".nojekyll") -Force | Out-Null

Push-Location $workDir
try {
  git config user.name $owner
  git config user.email "$owner@users.noreply.github.com"
  git add -A
  $status = git status --porcelain
  if (-not $status) {
    Write-Host "No changes to publish."
  } else {
    git commit -m "Deploy podcast site from SpecDev"
    git push origin HEAD:main
  }
} finally {
  Pop-Location
}

Write-Host "Enable Pages (branch main / root) if not already..."
$ErrorActionPreference = "Continue"
gh api -X POST "repos/$userSite/pages" -f build_type=legacy -f source[branch]=main -f source[path]="/" 2>$null | Out-Null
gh api -X PUT "repos/$userSite/pages" -f build_type=legacy -f source[branch]=main -f source[path]="/" 2>$null | Out-Null
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Published. Site: $siteUrl"
Write-Host "(Pages can take 1–2 minutes to update.)"
