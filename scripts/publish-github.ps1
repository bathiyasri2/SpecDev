# Run after: gh auth login -h github.com -p https -w
$ErrorActionPreference = "Stop"

$owner = gh api user -q .login
if (-not $owner) {
  throw "Not logged in. Run: gh auth login -h github.com -p https -w"
}

$userSiteRepo = "$owner.github.io"
$repoRoot = Split-Path -Parent $PSScriptRoot

Push-Location $repoRoot
try {
  Write-Host "GitHub user: $owner"
  Write-Host "Creating SpecDev and $userSiteRepo if missing..."

  $specExists = $false
  $prevErr = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  gh repo view "$owner/SpecDev" *> $null
  $specExists = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $prevErr

  if (-not $specExists) {
    gh repo create "$owner/SpecDev" --public --description "Spec Kit podcast site + Next.js static export" --source=. --remote=origin --push
  } else {
    $remote = git remote get-url origin 2>$null
    if (-not $remote) {
      git remote add origin "https://github.com/$owner/SpecDev.git"
    }
    git push -u origin main
  }

  $siteExists = $false
  $ErrorActionPreference = "Continue"
  gh repo view "$owner/$userSiteRepo" *> $null
  $siteExists = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $prevErr

  if (-not $siteExists) {
    gh repo create "$owner/$userSiteRepo" --public --description "GitHub Pages user site"
  }

  Write-Host "Enable GitHub Pages on SpecDev (Actions)..."
  $ErrorActionPreference = "Continue"
  gh api -X POST "repos/$owner/SpecDev/pages" -f build_type=workflow *> $null
  gh api -X PUT "repos/$owner/SpecDev/pages" -f build_type=workflow *> $null
  $ErrorActionPreference = $prevErr

  Write-Host ""
  Write-Host "Done. Next steps:"
  Write-Host "1. SpecDev -> Settings -> Secrets -> add PAGES_DEPLOY_TOKEN (PAT with write on $userSiteRepo)"
  Write-Host "2. $userSiteRepo -> Settings -> Pages -> branch main, folder /"
  Write-Host "3. Push or re-run workflow for https://$userSiteRepo"
  Write-Host "Preview: https://$owner.github.io/SpecDev/ (after first workflow)"
} finally {
  Pop-Location
}