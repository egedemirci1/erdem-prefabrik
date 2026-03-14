/**
 * Adım 1 Test: Supabase Key Güvenlik Kontrolü
 * 
 * Doğrular:
 * 1. supabase.ts dosyasında hardcoded key yok
 * 2. console.log debug satırları yok
 * 3. .env.example dosyası mevcut
 * 4. .env dosyası .gitignore'da
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

console.log('\n🔒 Adım 1: Supabase Key Güvenlik Testi\n');

// 1. supabase.ts içeriğini kontrol et
const supabaseFile = fs.readFileSync(path.join(ROOT, 'lib/supabase.ts'), 'utf8');

test('Hardcoded Supabase URL yok', !supabaseFile.includes('htzcbqevjyxyiyvqnujj'));
test('Hardcoded Anon Key yok', !supabaseFile.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
test('console.log satırı yok', !supabaseFile.includes('console.log'));
test('process.env kullanılıyor', supabaseFile.includes('process.env.NEXT_PUBLIC_SUPABASE_URL'));

// 2. .env.example mevcut mu
test('.env.example dosyası mevcut', fs.existsSync(path.join(ROOT, '.env.example')));

// 3. .env dosyası .gitignore'da mı
const gitignore = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf8');
test('.env dosyaları .gitignore\'da', gitignore.includes('.env'));

// 4. eslint-config-next güncel mi
const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
test('eslint-config-next 15.4.8', packageJson.devDependencies['eslint-config-next'] === '15.4.8');

console.log(`\n📊 Sonuç: ${passed} başarılı, ${failed} başarısız\n`);
process.exit(failed > 0 ? 1 : 0);
