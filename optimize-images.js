const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('🖼️  Resim optimizasyonu başlıyor...');
  
  // Orijinal boyutu hesapla
  const originalSize = await getDirectorySize('public/images');
  console.log(`📊 Orijinal boyut: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Optimize edilmiş klasör oluştur
  const outputDir = 'public/images-optimized';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Tüm resim dosyalarını bul
  const imageFiles = await findImageFiles('public/images');
  console.log(`📸 ${imageFiles.length} resim bulundu`);
  
  let processed = 0;
  let totalSaved = 0;
  
  for (const file of imageFiles) {
    try {
      const relativePath = path.relative('public/images', file);
      const outputPath = path.join(outputDir, relativePath);
      const outputDirPath = path.dirname(outputPath);
      
      // Klasör yapısını oluştur
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      
      // Resmi optimize et
      const originalSize = fs.statSync(file).size;
      
      await sharp(file)
        .jpeg({ quality: 70, progressive: true })
        .png({ quality: 70, compressionLevel: 9 })
        .webp({ quality: 70 })
        .toFile(outputPath);
      
      const optimizedSize = fs.statSync(outputPath).size;
      const saved = originalSize - optimizedSize;
      totalSaved += saved;
      
      processed++;
      if (processed % 50 === 0) {
        console.log(`⏳ İşlenen: ${processed}/${imageFiles.length} (${((processed/imageFiles.length)*100).toFixed(1)}%)`);
      }
      
    } catch (error) {
      console.error(`❌ Hata: ${file} - ${error.message}`);
    }
  }
  
  // Sonuçları göster
  const optimizedSize = await getDirectorySize(outputDir);
  const totalSavedMB = totalSaved / 1024 / 1024;
  const percentage = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  console.log('\n🎉 Optimizasyon tamamlandı!');
  console.log(`📊 Orijinal boyut: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Optimize edilmiş boyut: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Tasarruf: ${totalSavedMB.toFixed(2)} MB (%${percentage})`);
  console.log(`📁 Optimize edilmiş resimler: ${outputDir}`);
}

async function findImageFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

async function getDirectorySize(dir) {
  let totalSize = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }
  
  calculateSize(dir);
  return totalSize;
}

// Script'i çalıştır
optimizeImages().catch(console.error);