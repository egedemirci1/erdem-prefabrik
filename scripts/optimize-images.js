/**
 * Görsel optimizasyon script'i.
 * public/images altındaki JPG/PNG dosyalarını yeniden boyutlandırır ve sıkıştırır.
 * Çalıştırma: node scripts/optimize-images.js
 * Not: Orijinalleri yedekleyin; script dosyaları yerinde günceller.
 * Windows: Dosya yolu yerine buffer kullanır, yazarken .tmp + rename kullanır.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return { skipped: true };

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (e) {
    return { error: e.message };
  }
  if (stat.size < 50 * 1024) return { skipped: true }; // 50KB altı dokunma

  let inputBuf;
  try {
    inputBuf = fs.readFileSync(filePath);
  } catch (e) {
    return { error: 'read: ' + e.message };
  }

  const image = sharp(inputBuf);
  let meta;
  try {
    meta = await image.metadata();
  } catch (e) {
    return { error: 'metadata: ' + e.message };
  }

  const w = meta.width || 0;
  const h = meta.height || 0;
  const needsResize = w > MAX_WIDTH || h > MAX_HEIGHT;
  if (!needsResize && stat.size < 300 * 1024) return { skipped: true };

  let pipeline = image;
  if (needsResize) {
    pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true });
  }

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  let buf;
  try {
    buf = await pipeline.toBuffer();
  } catch (e) {
    return { error: 'encode: ' + e.message };
  }

  if (buf.length >= stat.size) return { skipped: true };

  const tmpPath = filePath + '.tmp';
  try {
    fs.writeFileSync(tmpPath, buf);
    fs.renameSync(tmpPath, filePath);
  } catch (e) {
    try { fs.unlinkSync(tmpPath); } catch (_) {}
    return { error: 'write: ' + e.message };
  }

  return { saved: stat.size - buf.length };
}

const PROGRESS_EVERY = 100; // her 100 işlemde bir log

async function walk(dir, progress = { total: 0, processed: 0, skipped: 0, errors: 0, saved: 0 }) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, progress);
    } else if (e.isFile()) {
      const r = await processFile(full);
      progress.total++;
      if (r.saved) {
        progress.saved += r.saved;
        progress.processed++;
      } else if (r.error) {
        progress.errors++;
        if (progress.errors <= 5) console.error('Atlandı:', full, '-', r.error);
      } else {
        progress.skipped++;
      }
      if (progress.total % PROGRESS_EVERY === 0) {
        console.log(`  ... ${progress.total} dosya (${progress.processed} sıkıştırıldı, ${progress.skipped} atlandı, ${progress.errors} hata)`);
      }
    }
  }
  return progress;
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('public/images bulunamadı.');
    return;
  }
  console.log('Görseller işleniyor... (her', PROGRESS_EVERY, 'dosyada ilerleme yazılacak)');
  const progress = await walk(IMAGES_DIR);
  const { saved, processed, skipped, errors } = progress;
  console.log('Bitti. İşlenen:', processed, 'Atlanan:', skipped, 'Hata:', errors, 'Toplam kazanç:', (saved / 1024 / 1024).toFixed(2), 'MB');
  if (errors > 5) console.log('(İlk 5 hata gösterildi; toplam', errors, 'dosya atlandı)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
