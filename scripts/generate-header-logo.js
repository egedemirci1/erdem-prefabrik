/**
 * Header için küçük logo üretir (47 KB yerine ~5 KB).
 * Çalıştırma: node scripts/generate-header-logo.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const src = path.join(publicDir, 'Logo.png');
const dest = path.join(publicDir, 'Logo-header.png');
const width = 210;
const height = 50;

async function main() {
  if (!fs.existsSync(src)) {
    console.error('public/images/Logo.png bulunamadı.');
    process.exit(1);
  }
  await sharp(src)
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  const stat = fs.statSync(dest);
  console.log('Oluşturuldu: public/images/Logo-header.png', (stat.size / 1024).toFixed(1), 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
