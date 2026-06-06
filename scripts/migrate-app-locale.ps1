$app = "c:\erdem-prefabrik\app"
$locale = "$app\[locale]"

New-Item -ItemType Directory -Force -Path $locale | Out-Null

# Move global files
$globalFiles = @("error.tsx", "loading.tsx", "not-found.tsx")
foreach ($f in $globalFiles) {
  if (Test-Path "$app\$f") {
    Move-Item "$app\$f" "$locale\$f" -Force
  }
}

# Route mappings: source -> destination under [locale]
$routes = @{
  "page.tsx" = "page.tsx"
  "hakkimizda" = "about"
  "iletisim" = "contact"
  "projeler" = "projects"
  "gizlilik" = "privacy"
  "kullanim-kosullari" = "terms"
  "konteyner" = "container"
  "moduler" = "modular"
  "prefabrik-celik" = "prefab-steel"
}

foreach ($src in $routes.Keys) {
  $dst = $routes[$src]
  $srcPath = if ($src -eq "page.tsx") { "$app\page.tsx" } else { "$app\$src" }
  $dstPath = if ($dst -eq "page.tsx") { "$locale\page.tsx" } else { "$locale\$dst" }
  if (Test-Path $srcPath) {
    if ($src -eq "page.tsx") {
      Move-Item $srcPath $dstPath -Force
    } else {
      Move-Item $srcPath $dstPath -Force
    }
  }
}

# Sub-route renames inside container
$containerSubs = @{
  "ev" = "home"
  "ofis" = "office"
  "guvenlik-kulubesi" = "security-booth"
  "wc-dus-kabini" = "wc-shower"
}
foreach ($src in $containerSubs.Keys) {
  $sp = "$locale\container\$src"
  $dp = "$locale\container\$($containerSubs[$src])"
  if (Test-Path $sp) { Move-Item $sp $dp -Force }
}

# Sub-route renames inside modular
$modularSubs = @{
  "ofis" = "office"
  "moduler-ev" = "modular-home"
  "sifir-atik" = "zero-waste"
}
foreach ($src in $modularSubs.Keys) {
  $sp = "$locale\modular\$src"
  $dp = "$locale\modular\$($modularSubs[$src])"
  if (Test-Path $sp) { Move-Item $sp $dp -Force }
}

# Sub-route renames inside prefab-steel
$prefabSubs = @{
  "prefabrik-ev-villa" = "prefab-home-villa"
  "santiye-ozel-kullanim" = "construction-special"
  "celik-ev-villa" = "steel-home-villa"
  "prefabrik-santiye-yapilari" = "construction-buildings"
}
foreach ($src in $prefabSubs.Keys) {
  $sp = "$locale\prefab-steel\$src"
  $dp = "$locale\prefab-steel\$($prefabSubs[$src])"
  if (Test-Path $sp) { Move-Item $sp $dp -Force }
}

Write-Host "App migration complete"
