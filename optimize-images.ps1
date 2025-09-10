# Resim optimizasyon script'i
Write-Host "🖼️  Resim optimizasyonu başlıyor..." -ForegroundColor Green

# Orijinal boyutu hesapla
$originalSize = (Get-ChildItem -Path "public\images" -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Host "📊 Orijinal boyut: $([math]::Round($originalSize / 1MB, 2)) MB" -ForegroundColor Yellow

# Optimize edilmiş klasör oluştur
$outputDir = "public\images-optimized"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Resim sayısını say
$imageCount = (Get-ChildItem -Path "public\images" -Recurse -Include "*.jpg", "*.jpeg", "*.png").Count
Write-Host "📸 Toplam $imageCount resim bulundu" -ForegroundColor Cyan

Write-Host "⚠️  Bu işlem uzun sürebilir..." -ForegroundColor Red
Write-Host "💡 Alternatif: Online araçlar kullanabilirsiniz:" -ForegroundColor Blue
Write-Host "   - https://tinypng.com" -ForegroundColor Blue
Write-Host "   - https://squoosh.app" -ForegroundColor Blue
Write-Host "   - https://compressor.io" -ForegroundColor Blue

# Kullanıcıya seçenek sun
$choice = Read-Host "Devam etmek istiyor musunuz? (y/n)"
if ($choice -eq "y" -or $choice -eq "Y") {
    Write-Host "🚀 Optimizasyon başlıyor..." -ForegroundColor Green
    # Burada gerçek optimizasyon kodu olacak
} else {
    Write-Host "❌ İptal edildi" -ForegroundColor Red
}
