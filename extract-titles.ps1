$pages = @{
    "Home" = "http://localhost:3000/"
    "Projeler" = "http://localhost:3000/projeler"
    "Konteyner" = "http://localhost:3000/konteyner"
    "Moduler" = "http://localhost:3000/moduler"
    "Prefabrik Celik" = "http://localhost:3000/prefabrik-celik"
    "Hakkimizda" = "http://localhost:3000/hakkimizda"
    "Iletisim" = "http://localhost:3000/iletisim"
    "Gizlilik" = "http://localhost:3000/gizlilik"
    "Kullanim Kosullari" = "http://localhost:3000/kullanim-kosullari"
    "404 Test" = "http://localhost:3000/nonexistent-page"
}

Write-Host "`n=== Page Titles and Details ===`n" -ForegroundColor Cyan

foreach ($page in $pages.GetEnumerator() | Sort-Object Name) {
    Write-Host "Page: $($page.Key)" -ForegroundColor Yellow
    Write-Host "URL: $($page.Value)" -ForegroundColor Gray
    
    try {
        $html = curl.exe -s -L --max-time 10 $page.Value
        
        if ($html -match '<title>([^<]+)</title>') {
            Write-Host "  Title: $($matches[1])" -ForegroundColor Green
        } else {
            Write-Host "  Title: NOT FOUND" -ForegroundColor Red
        }
        
        # Check for h1 tags
        $h1Count = ([regex]::Matches($html, '<h1[^>]*>')).Count
        Write-Host "  H1 tags: $h1Count" -ForegroundColor Cyan
        
        # Check for navigation
        if ($html -match '<nav') {
            Write-Host "  Navigation: Present" -ForegroundColor Green
        } else {
            Write-Host "  Navigation: Missing" -ForegroundColor Yellow
        }
        
        # Check for footer
        if ($html -match '<footer') {
            Write-Host "  Footer: Present" -ForegroundColor Green
        } else {
            Write-Host "  Footer: Missing" -ForegroundColor Yellow
        }
        
        # Check for meta description
        if ($html -match 'meta name="description"') {
            Write-Host "  Meta Description: Present" -ForegroundColor Green
        } else {
            Write-Host "  Meta Description: Missing" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}
