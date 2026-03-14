/**
 * Adım 3-4 Test: SEO Kontrolü
 * 
 * Doğrular:
 * 1. Dead Metadata import'ları kaldırılmış
 * 2. Layout dosyalarında metadata mevcut
 * 3. Layout dosyalarında JSON-LD structured data mevcut
 * 4. Breadcrumb component oluşturulmuş
 * 5. Breadcrumb sayfalara eklenmiş
 * 6. Canonical URL tutarlı
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, condition) {
  if (condition) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    console.log(`  ❌ ${name}`);
    failed++;
  }
}

console.log('\n🔍 Adım 3-4: SEO Testi\n');

// 1. Dead Metadata imports kaldırılmış
const konteynerPage = fs.readFileSync(path.join(ROOT, 'app/konteyner/page.tsx'), 'utf8');
const modulerPage = fs.readFileSync(path.join(ROOT, 'app/moduler/page.tsx'), 'utf8');
const prefabrikPage = fs.readFileSync(path.join(ROOT, 'app/prefabrik-celik/page.tsx'), 'utf8');
const projelerPage = fs.readFileSync(path.join(ROOT, 'app/projeler/page.tsx'), 'utf8');

test('konteyner/page.tsx: Dead Metadata import yok', !konteynerPage.includes('import type { Metadata }'));
test('moduler/page.tsx: Dead Metadata import yok', !modulerPage.includes('import type { Metadata }'));
test('prefabrik-celik/page.tsx: Dead Metadata import yok', !prefabrikPage.includes('import type { Metadata }'));

// 2. Layout dosyalarında metadata mevcut
const konteynerLayout = fs.readFileSync(path.join(ROOT, 'app/konteyner/layout.tsx'), 'utf8');
const modulerLayout = fs.readFileSync(path.join(ROOT, 'app/moduler/layout.tsx'), 'utf8');
const prefabrikLayout = fs.readFileSync(path.join(ROOT, 'app/prefabrik-celik/layout.tsx'), 'utf8');
const projelerLayout = fs.readFileSync(path.join(ROOT, 'app/projeler/layout.tsx'), 'utf8');

test('konteyner/layout.tsx: Metadata tanımlı', konteynerLayout.includes('export const metadata'));
test('moduler/layout.tsx: Metadata tanımlı', modulerLayout.includes('export const metadata'));
test('prefabrik-celik/layout.tsx: Metadata tanımlı', prefabrikLayout.includes('export const metadata'));
test('projeler/layout.tsx: Metadata tanımlı', projelerLayout.includes('export const metadata'));

// 3. JSON-LD structured data
test('konteyner/layout.tsx: Service JSON-LD var', konteynerLayout.includes('@type') && konteynerLayout.includes('Service'));
test('moduler/layout.tsx: Service JSON-LD var', modulerLayout.includes('@type') && modulerLayout.includes('Service'));
test('prefabrik-celik/layout.tsx: Service JSON-LD var', prefabrikLayout.includes('@type') && prefabrikLayout.includes('Service'));
test('projeler/layout.tsx: CollectionPage JSON-LD var', projelerLayout.includes('@type') && projelerLayout.includes('CollectionPage'));

// 4. LocalBusiness bilgisi
test('konteyner: LocalBusiness bilgisi', konteynerLayout.includes('LocalBusiness'));
test('moduler: LocalBusiness bilgisi', modulerLayout.includes('LocalBusiness'));
test('prefabrik-celik: LocalBusiness bilgisi', prefabrikLayout.includes('LocalBusiness'));

// 5. Breadcrumb component
test('Breadcrumb.tsx dosyası mevcut', fs.existsSync(path.join(ROOT, 'components/site/Breadcrumb.tsx')));
const breadcrumbFile = fs.readFileSync(path.join(ROOT, 'components/site/Breadcrumb.tsx'), 'utf8');
test('Breadcrumb: JSON-LD BreadcrumbList var', breadcrumbFile.includes('BreadcrumbList'));
test('Breadcrumb: aria-label mevcut', breadcrumbFile.includes('aria-label'));

// 6. Sayfalardan Breadcrumb kullanılıyor
test('konteyner/page.tsx: Breadcrumb kullanılıyor', konteynerPage.includes('Breadcrumb'));
test('moduler/page.tsx: Breadcrumb kullanılıyor', modulerPage.includes('Breadcrumb'));
test('prefabrik-celik/page.tsx: Breadcrumb kullanılıyor', prefabrikPage.includes('Breadcrumb'));
test('projeler/page.tsx: Breadcrumb kullanılıyor', projelerPage.includes('Breadcrumb'));

// 7. Canonical URL tutarlı (absolute URL)
const rootLayout = fs.readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
test('Root layout: Absolute canonical URL', rootLayout.includes('canonical: "https://erdemprefabrik.com/"'));

// 8. OG Image tanımlı
test('konteyner: OG image tanımlı', konteynerLayout.includes('images:'));
test('moduler: OG image tanımlı', modulerLayout.includes('images:'));

console.log(`\n📊 Sonuç: ${passed} başarılı, ${failed} başarısız\n`);
process.exit(failed > 0 ? 1 : 0);
