/**
 * Adım 2 Test: İletişim Formu Güvenlik Kontrolü
 * 
 * Doğrular:
 * 1. Zod validation import edilmiş
 * 2. Sanitize fonksiyonu mevcut
 * 3. Honeypot anti-spam mekanizması var
 * 4. alert() kullanılmıyor
 * 5. Inline error gösterimi var
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

console.log('\n🛡️ Adım 2: İletişim Formu Güvenlik Testi\n');

const formFile = fs.readFileSync(path.join(ROOT, 'components/site/ContactForm.tsx'), 'utf8');

// 1. Zod validation
test('Zod import edilmiş', formFile.includes('from "zod') || formFile.includes("from 'zod"));
test('Validation schema tanımlı', formFile.includes('contactSchema') || formFile.includes('z.object'));

// 2. Sanitization
test('sanitize fonksiyonu mevcut', formFile.includes('function sanitize') || formFile.includes('const sanitize'));
test('XSS karakterleri escape ediliyor', formFile.includes('&lt;') || formFile.includes('replace(/</g'));

// 3. Honeypot
test('Honeypot alanı var', formFile.includes('honeypot'));
test('Honeypot görünmez (aria-hidden)', formFile.includes('aria-hidden'));

// 4. alert() kullanılmıyor
test('alert() kullanılmıyor', !formFile.includes('alert('));

// 5. Inline errors
test('Error state yönetimi var', formFile.includes('setErrors') || formFile.includes('errors'));
test('Hata mesajı UI bileşeni var', formFile.includes('text-red-500') || formFile.includes('AlertCircle'));

// 6. maxLength koruması
test('Telefon maxLength var', formFile.includes('maxLength={20}') || formFile.includes('maxLength={15}'));

console.log(`\n📊 Sonuç: ${passed} başarılı, ${failed} başarısız\n`);
process.exit(failed > 0 ? 1 : 0);
