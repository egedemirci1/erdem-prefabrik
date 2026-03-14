/**
 * Ana sayfada kullanılan görseller için küçük sürümler (-opt) üretir.
 * Build öncesi çalıştırılır; Hero, CategoryCards, PortfolioGrid bu sürümleri kullanır.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const MAX_WIDTH = 1280;
const JPEG_QUALITY = 80;

// Hero (3), CategoryCards (3), featured-projects (8) = toplam 15 benzersiz path
const HERO_IMAGES = [
  '/images/projects/1-URUN-GORSELLERI/6-MODULER/bungalow1/bilinmeyenm2.JPG',
  '/images/projects/1-URUN-GORSELLERI/2-HAFIF-CELIK YAPILAR/casa erdem/2_Photo - 10.jpg',
  '/images/projects/1-URUN-GORSELLERI/6-MODULER/bungalow5/2_Photo - 1.jpg',
];

const CATEGORY_IMAGES = [
  '/images/projects/1-URUN-GORSELLERI/1-PREFABRIK YAPILAR/DURMUŞ ÜNER 97-M2/a26.jpg',
  '/images/projects/1-URUN-GORSELLERI/6-MODULER/OFIS-SHOWROOM/bilinmeyenm2.JPG',
  '/images/projects/1-URUN-GORSELLERI/3-KONTEYNERLAR/2-OZEL-TASARIM/4X10/1_22 - Foto.jpg',
];

function getOptPath(imagePath) {
  return imagePath.replace(/(\.(jpg|jpeg|png|JPG|JPEG|PNG))$/i, '-opt$1');
}

async function processOne(imagePath) {
  const fullPath = path.join(publicDir, imagePath.replace(/^\//, ''));
  const ext = path.extname(fullPath).toLowerCase();
  const optPath = getOptPath(imagePath);
  const fullOptPath = path.join(publicDir, optPath.replace(/^\//, ''));

  if (!fs.existsSync(fullPath)) {
    console.warn('Atlandı (dosya yok):', imagePath);
    return;
  }

  try {
    const buf = await fs.promises.readFile(fullPath);
    const pipeline = sharp(buf)
      .resize(MAX_WIDTH, MAX_WIDTH, { fit: 'inside', withoutEnlargement: true });
    const outBuf = ext === '.png'
      ? await pipeline.png({ quality: 80 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

    await fs.promises.mkdir(path.dirname(fullOptPath), { recursive: true });
    if (outBuf.length >= buf.length) {
      await fs.promises.writeFile(fullOptPath, buf);
      console.warn('  ', path.basename(fullPath), '->', path.basename(fullOptPath), '(kopya, zaten küçük)');
      return;
    }
    await fs.promises.writeFile(fullOptPath, outBuf);
    const saved = (buf.length - outBuf.length) / 1024;
    console.log('  ', path.basename(fullPath), '->', path.basename(fullOptPath), `(${saved.toFixed(0)} KB azaldı)`);
  } catch (e) {
    console.warn('Hata:', imagePath, e.message);
  }
}

async function main() {
  let featuredImages = [];
  const featuredPath = path.join(__dirname, '..', 'data', 'featured-projects.json');
  if (fs.existsSync(featuredPath)) {
    const featured = JSON.parse(fs.readFileSync(featuredPath, 'utf8'));
    featuredImages = featured.map((p) => p.image).filter(Boolean);
  }

  const allPaths = [...new Set([...HERO_IMAGES, ...CATEGORY_IMAGES, ...featuredImages])];
  console.log('Ana sayfa görselleri optimize ediliyor:', allPaths.length, 'dosya');
  for (const p of allPaths) {
    await processOne(p);
  }
  console.log('Bitti.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
