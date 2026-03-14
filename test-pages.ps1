# Test script for checking pages with redirect following
$pages = @(
    @{Name="Home"; URL="http://localhost:3000/"},
    @{Name="Projeler"; URL="http://localhost:3000/projeler"},
    @{Name="Konteyner"; URL="http://localhost:3000/konteyner"},
    @{Name="Moduler"; URL="http://localhost:3000/moduler"},
    @{Name="Prefabrik Celik"; URL="http://localhost:3000/prefabrik-celik"},
    @{Name="Hakkimizda"; URL="http://localhost:3000/hakkimizda"},
    @{Name="Iletisim"; URL="http://localhost:3000/iletisim"},
    @{Name="Gizlilik"; URL="http://localhost:3000/gizlilik"},
    @{Name="Kullanim Kosullari"; URL="http://localhost:3000/kullanim-kosullari"},
    @{Name="404 Test"; URL="http://localhost:3000/nonexistent-page"}
)

Write-Host "`n=== Page Testing Results ===`n" -ForegroundColor Cyan

foreach ($page in $pages) {
    Write-Host "Testing: $($page.Name)" -ForegroundColor Yellow
    Write-Host "URL: $($page.URL)" -ForegroundColor Gray
    
    try {
        # Follow redirects automatically
        $response = Invoke-WebRequest -Uri $page.URL -TimeoutSec 30 -MaximumRedirection 5
        $statusCode = $response.StatusCode
        $contentLength = $response.Content.Length
        
        Write-Host "  Status: $statusCode" -ForegroundColor Green
        Write-Host "  Content Length: $contentLength bytes" -ForegroundColor Green
        Write-Host "  Final URL: $($response.BaseResponse.ResponseUri)" -ForegroundColor Gray
        
        # Check for title
        if ($response.Content -match '<title>([^<]+)</title>') {
            Write-Host "  Title: $($matches[1])" -ForegroundColor Cyan
        }
        
        # Check for errors in content
        $errorMatches = ([regex]::Matches($response.Content, "error|Error|ERROR")).Count
        if ($errorMatches -gt 5) {
            Write-Host "  WARNING: Found multiple 'error' mentions ($errorMatches times)" -ForegroundColor Red
        }
        
        # Check for React hydration errors
        if ($response.Content -match "Hydration failed|hydration error") {
            Write-Host "  ERROR: React hydration error detected!" -ForegroundColor Red
        }
        
        # Check if there's actual content
        if ($contentLength -lt 500) {
            Write-Host "  WARNING: Very small content size" -ForegroundColor Red
        } else {
            Write-Host "  Content: OK" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "  Status: FAILED" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "=== Test Complete ===" -ForegroundColor Cyan
