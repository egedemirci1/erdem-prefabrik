const fs = require('fs');
const path = require('path');

// Proje verilerini oluşturmak için script
async function generateProjectsData() {
  console.log('🔄 Proje verileri oluşturuluyor...');
  
  // Kategori tanımları
  const CATEGORY_DIR_TO_ID = {
    '1-PREFABRIK YAPILAR': 'prefabrik',
    '2-HAFIF-CELIK YAPILAR': 'celik',
    '3-KONTEYNERLAR': 'konteyner',
    '4-TINY HOUSE VE MOBİL YAPILAR': 'tiny-house',
    '5-ŞANTIYE VE OZEL KULLANIM': 'santiye',
    '6-MODULER': 'moduler',
    '7-DEPREM': 'deprem',
  };

  const CATEGORY_DESCRIPTIONS = {
    'prefabrik': { title: 'Prefabrik Ev', specLabel: 'Prefabrik Ev', description: 'Dayanıklı ve hızlı kurulumlu prefabrik konut.', defaultLocation: 'Türkiye' },
    'celik': { title: 'Çelik Ev', specLabel: 'Çelik Ev', description: 'Hafif çelik taşıyıcı sistemli konut.', defaultLocation: 'Türkiye' },
    'konteyner': { title: 'Konteyner', specLabel: 'Standart Konteyner', description: 'Hızlı çözüm sunan konteyner yapı.', defaultLocation: 'Türkiye' },
    'tiny-house': { title: 'Tiny House', specLabel: 'Tiny House', description: 'Taşınabilir ve kompakt yaşam alanı.', defaultLocation: 'Türkiye' },
    'santiye': { title: 'Şantiye Yapısı', specLabel: 'Şantiye Yapısı', description: 'Şantiye kullanımına uygun modüler alanlar.', defaultLocation: 'Türkiye' },
    'moduler': { title: 'Modüler Yapı', specLabel: 'Modüler Yapı', description: 'Esnek modüler planlı yapı.', defaultLocation: 'Türkiye' },
    'deprem': { title: 'Deprem Projesi', specLabel: 'Deprem Projesi', description: 'Acil barınma ve sosyal alan çözümleri.', defaultLocation: 'Türkiye' },
  };

  const CITY_LIST = [
    'Konya','Hatay','Karaman','Mersin','Antalya','Ankara','İstanbul','Istanbul','İzmir','Izmir','Beyşehir','Yunak','Cihanbeyli','Karatay','Meram','Ereğli','Eregli','Karapınar','Karapinar','Kulu','Seydişehir','Seydisehir','Hüyük','Huyuk','Doğanhisar','Doganhisar','Ilgın','Ilgin','Bozkır','Bozkir','Kadınhanı','Kadinhanı','Piribeyli','Yunak','Karaman','Beysehir','Yalova','Osmaniye','Zeytinburnu'
  ];

  function guessLocationFromSegments(segments, fallback) {
    const joined = segments.join(' ').toLocaleUpperCase('tr-TR');
    for (const city of CITY_LIST) {
      const up = city.toLocaleUpperCase('tr-TR');
      if (joined.includes(up)) return city.replace('Istanbul','İstanbul').replace('Izmir','İzmir').replace('Eregli','Ereğli').replace('Karapinar','Karapınar').replace('Seydisehir','Seydişehir').replace('Huyuk','Hüyük').replace('Ilgin','Ilgın').replace('Bozkir','Bozkır').replace('Kadinhanı','Kadınhanı').replace('Beysehir','Beyşehir');
    }
    return fallback;
  }

  function parseAreaFromName(name) {
    const norm = name.replace(/_/g, ' ').replace(/-/g, ' ');
    const m2 = norm.match(/(\d+[\.,]?\d*)\s*[mM]\s*[²2]?\b/);
    if (m2) {
      const v = parseFloat(m2[1].replace(',', '.'));
      if (!Number.isNaN(v)) return Math.round(v * 10) / 10;
    }
    const multi = norm.match(/(\d+[\.,]?\d*)\s*[xX]\s*(\d+[\.,]?\d*)/);
    if (multi) {
      let a = parseFloat(multi[1].replace(',', '.'));
      let b = parseFloat(multi[2].replace(',', '.'));
      if (a > 50) a = a / 100;
      if (b > 50) b = b / 100;
      const v = a * b;
      if (!Number.isNaN(v)) return Math.round(v * 10) / 10;
    }
    return undefined;
  }

  function mapGroupLabel(projectName) {
    const name = projectName.toUpperCase();
    if (name.includes('EV') || name.includes('KONUT')) return 'Ev';
    if (name.includes('OFİS') || name.includes('OFIS')) return 'Ofis';
    if (name.includes('WC') || name.includes('DUŞ')) return 'WC/Duş';
    if (name.includes('GÜVENL') || name.includes('GUVENL')) return 'Güvenlik Kabini';
    if (name.includes('EKMEK')) return 'Ekmek Kabini';
    if (name.includes('BUNG')) return 'Bungalov';
    if (name.includes('SIFIR') || name.includes('ATIK')) return 'Sıfır Atık Merkezi';
    return undefined;
  }

  function getProjectSpecificDescription(projectName, area, group) {
    const name = projectName.toLowerCase();
    
    // Prefabrik projeler
    if (name.includes('ahmet ağıl')) return 'Kaba kurulum aşamasında prefabrik konut projesi';
    if (name.includes('ahmet saruhan')) return 'Modern tasarım prefabrik ev çözümü';
    if (name.includes('ali yavuz')) return 'Geniş alan prefabrik konut projesi';
    if (name.includes('ayşe güner')) return 'Çelik konstrüksiyonlu villa projesi';
    if (name.includes('durmuş ali yücel')) return 'Beyşehir bölgesi prefabrik konut';
    if (name.includes('durmuş üner')) return 'Detaylı kurulum prefabrik ev projesi';
    if (name.includes('ersin güneş')) return 'Kompakt prefabrik konut çözümü';
    if (name.includes('ismet kan')) return 'Standart prefabrik ev projesi';
    if (name.includes('kadriye tekneçukur')) return 'İkiz villa prefabrik konut sistemi';
    if (name.includes('mahmut yaşar')) return 'Cihanbeyli bölgesi prefabrik konut';
    if (name.includes('mülkiye yangel')) return 'Çoklu görsel prefabrik ev projesi';
    if (name.includes('mustafa doğan')) return 'Küçük alan prefabrik konut çözümü';
    if (name.includes('nurettin intepe')) return 'Orta boy prefabrik ev projesi';
    if (name.includes('önder hatipoğlu')) return 'Geniş kapsamlı prefabrik konut';
    if (name.includes('recep zengin')) return 'Kompakt prefabrik ev çözümü';
    if (name.includes('refik çelik')) return 'Standart prefabrik konut projesi';
    if (name.includes('sami kahya')) return 'Detaylı prefabrik ev projesi';
    if (name.includes('semih bozçalı')) return 'Modern prefabrik konut çözümü';
    
    // Modüler projeler
    if (name.includes('bungalow')) return 'Tek katlı bungalow modüler konut';
    if (name.includes('triana')) return 'Özel tasarım modüler konut projesi';
    if (name.includes('üçgen ev')) return 'Üçgen form modüler ev tasarımı';
    if (name.includes('l shape')) return 'L şekilli modüler konut sistemi';
    if (name.includes('dört parça')) return 'Dört modül birleşimli konut';
    if (name.includes('çerçeveli')) return 'Çerçeveli modüler konut projesi';
    if (name.includes('iki parça')) return 'İki modül birleşimli konut sistemi';
    if (name.includes('norway')) return 'Norway tarzı modüler konut';
    if (name.includes('lütfullah dikkaya')) return '9x9 metre modüler konut projesi';
    if (name.includes('ziya çepni')) return '74 m² modüler konut çözümü';
    if (name.includes('üç modül')) return 'Üç modül birleşimli konut';
    if (name.includes('halil dündar')) return 'Birleşimli modüler konut projesi';
    if (name.includes('kış bahçesi')) return 'Modüler kış bahçesi sistemi';
    if (name.includes('zeytinburnu')) return 'Zeytinburnu belediyesi sıfır atık tesisi';
    
    // Konteyner projeleri
    if (name.includes('ahmet kesepek')) return '4x11 konteyner konut projesi';
    if (name.includes('mehmet erdem')) return '3.5x9 konteyner konut çözümü';
    if (name.includes('temel peker')) return '3.5x9 konteyner konut projesi';
    if (name.includes('remzi nuray')) return '4x11 konteyner konut sistemi';
    if (name.includes('tuğrul erim')) return '4x11 konteyner konut projesi';
    if (name.includes('sergi galeri')) return '4.5x15 sergi galeri konteyneri';
    if (name.includes('ahmet kesepek-woody')) return 'Woody tasarım konteyner konut';
    if (name.includes('mehmet kale')) return '3.5x9 konteyner konut çözümü';
    if (name.includes('fray-savaş ay')) return '3.5x8 konteyner konut projesi';
    if (name.includes('hatice çağar')) return 'Konteyner konut çözümü';
    if (name.includes('serdar bey-earthen')) return 'Earthen tasarım konteyner konut';
    
    // Güvenlik kulübesi projeleri
    if (name.includes('300x500-güvenlik')) return '300x500 güvenlik kulübesi';
    if (name.includes('300x200-çağlayan')) return 'Çağlayan Plastik güvenlik kulübesi';
    if (name.includes('300x200 selçuker')) return 'Selçuker Center güvenlik kulübesi';
    if (name.includes('200x300 fabrika')) return 'Fabrika güvenlik kulübesi sistemi';
    if (name.includes('3x5')) return '3x5 güvenlik kulübesi';
    
    // Şantiye projeleri
    if (name.includes('hatay wc')) return 'Hatay bölgesi şantiye WC tesisi';
    if (name.includes('karaman karsel')) return 'Karaman şantiye idari binası';
    if (name.includes('tigem')) return 'TİGEM şantiye tesisi';
    if (name.includes('meram trafik')) return 'Meram trafik şantiye tesisi';
    if (name.includes('meram üzüm bağı')) return 'Meram üzüm bağı şantiye tesisi';
    if (name.includes('neka')) return 'NEKA A.Ş şantiye tesisi';
    if (name.includes('otobüs harekat')) return 'Otobüs harekat şantiye tesisi';
    
    // Çelik projeler
    if (name.includes('metin arıkan')) return '57 m² hafif çelik konut projesi';
    if (name.includes('casa erdem')) return 'Casa Erdem çelik konut tasarımı';
    if (name.includes('osman deveci')) return '115 m² çelik konut projesi';
    if (name.includes('osman hoşnut')) return '115 m² çelik konut çözümü';
    if (name.includes('bae-masjid')) return 'BAE Masjid özel çelik yapısı';
    
    // Tiny house projeleri
    if (name.includes('tinyempire')) return 'Tiny Empire mobil konut';
    if (name.includes('işçi karavanı')) return 'İşçi karavanı mobil konut';
    if (name.includes('karatay belediyesi-mobil wc')) return 'Karatay belediyesi mobil WC';
    if (name.includes('mobil wc-2')) return 'Mobil WC tesisi';
    if (name.includes('seyyar mutfak')) return 'Seyyar mutfak mobil tesisi';
    if (name.includes('tiny hills')) return 'Tiny Hills mobil konut';
    if (name.includes('wildgrey')) return 'Wildgrey mobil konut tasarımı';
    if (name.includes('nomads')) return 'Nomads mobil konut projesi';
    if (name.includes('hood')) return 'Hood mobil konut çözümü';
    
    // Ekmek kabini projeleri
    if (name.includes('beyşehir ekmek')) return 'Beyşehir ekmek kabini tesisi';
    if (name.includes('ekmek kabini-3x2')) return '3x2 ekmek kabini tesisi';
    
    // Genel fallback
    if (area && group) return `${area} m² ${group.toLowerCase()} projesi`;
    if (area) return `${area} m² özel proje`;
    if (group) return `${group.toLowerCase()} odaklı özel çözüm`;
    return 'Özel tasarım proje çözümü';
  }

  function chooseCoverImage(images) {
    const AREA_FILENAME_RE = /(\d+[\.,]?\d*)\s*m\s*(?:2|²)\b/i;
    const byArea = images.find((rel) => AREA_FILENAME_RE.test(path.basename(rel)));
    if (byArea) return byArea;

    const bilinmeyenm2 = images.find((rel) => /bilinmeyenm2/i.test(path.basename(rel)));
    if (bilinmeyenm2) return bilinmeyenm2;

    const hints = [/kapak/i, /cover/i, /front/i, /ana/i, /render/i];
    for (const re of hints) {
      const hit = images.find((rel) => re.test(path.basename(rel)));
      if (hit) return hit;
    }

    return images[0];
  }

  // Proje verilerini oluştur
  const projects = [];
  
  // Kategori klasörlerini tara
  const baseDir = path.join(process.cwd(), 'public', 'images', 'projects', '1-URUN-GORSELLERI');
  
  try {
    const categoryDirs = fs.readdirSync(baseDir, { withFileTypes: true });
    
    for (const categoryDir of categoryDirs) {
      if (!categoryDir.isDirectory()) continue;
      
      const categoryId = CATEGORY_DIR_TO_ID[categoryDir.name];
      if (!categoryId) continue;
      
      const categoryPath = path.join(baseDir, categoryDir.name);
      const meta = CATEGORY_DESCRIPTIONS[categoryId];
      
      console.log(`📁 Kategori: ${categoryDir.name}`);
      
      // Tüm seviyeleri tara (recursive)
      function findProjects(currentPath, currentSegments = []) {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });
        
        for (const item of items) {
          if (!item.isDirectory()) continue;
          
          const itemPath = path.join(currentPath, item.name);
          const newSegments = [...currentSegments, item.name];
          
          // Resim dosyalarını bul
          const files = fs.readdirSync(itemPath, { withFileTypes: true });
          const images = files
            .filter(file => file.isFile() && /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file.name))
            .map(file => `/images/projects/1-URUN-GORSELLERI/${categoryDir.name}/${newSegments.join('/')}/${file.name}`);
          
          if (images.length > 0) {
            // Proje bulundu
            const projectName = item.name;
            const segments = projectName.split(/[-_]/);
            const area = parseAreaFromName(projectName);
            const group = mapGroupLabel(projectName);
            const location = guessLocationFromSegments(segments, meta.defaultLocation);
            const description = getProjectSpecificDescription(projectName, area, group);
            
            const titleParts = [meta.title];
            if (group) titleParts.push(group);
            const title = titleParts.join(' • ');
            
            const project = {
              id: `projects/1-URUN-GORSELLERI/${categoryDir.name}/${newSegments.join('/')}`,
              category: categoryId,
              title,
              description,
              specs: description,
              location,
              image: chooseCoverImage(images),
              images,
              area,
              group
            };
            
            projects.push(project);
            console.log(`  ✅ ${newSegments.join('/')} (${images.length} resim)`);
          } else {
            // Alt klasörleri tara
            findProjects(itemPath, newSegments);
          }
        }
      }
      
      findProjects(categoryPath);
    }
    
    // Projeleri sırala
    projects.sort((a, b) => (b.area ?? -1) - (a.area ?? -1));
    
    // JSON dosyasına kaydet
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const outputPath = path.join(dataDir, 'projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    
    console.log(`\n🎉 ${projects.length} proje oluşturuldu!`);
    console.log(`📁 Dosya: ${outputPath}`);
    
    // Kategori sayılarını göster
    const categoryCounts = {};
    projects.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    
    console.log('\n📊 Kategori dağılımı:');
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count} proje`);
    });
    
  } catch (error) {
    console.error('❌ Hata:', error);
  }
}

generateProjectsData();