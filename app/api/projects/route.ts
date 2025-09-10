import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

type Project = {
  id: string;
  category: 'prefabrik' | 'celik' | 'konteyner' | 'tiny-house' | 'santiye' | 'moduler' | 'deprem';
  title: string;
  description: string;
  specs: string;
  location: string;
  image: string;
  images: string[];
  area?: number;
  group?: string;
};

const CATEGORY_DIR_TO_ID: Record<string, Project['category']> = {
  '1-PREFABRIK YAPILAR': 'prefabrik',
  '2-HAFIF-CELIK YAPILAR': 'celik',
  '3-KONTEYNERLAR': 'konteyner',
  '4-TINY HOUSE VE MOBİL YAPILAR': 'tiny-house',
  '5-ŞANTIYE VE OZEL KULLANIM': 'santiye',
  '6-MODULER': 'moduler',
  '7-DEPREM': 'deprem',
};

const CATEGORY_DESCRIPTIONS: Record<Project['category'], { title: string; specLabel: string; description: string; defaultLocation: string }> = {
  'prefabrik': { title: 'Prefabrik Ev', specLabel: 'Prefabrik Ev', description: 'Dayanıklı ve hızlı kurulumlu prefabrik konut.', defaultLocation: 'Türkiye' },
  'celik': { title: 'Çelik Ev', specLabel: 'Çelik Ev', description: 'Hafif çelik taşıyıcı sistemli konut.', defaultLocation: 'Türkiye' },
  'konteyner': { title: 'Konteyner', specLabel: 'Standart Konteyner', description: 'Hızlı çözüm sunan konteyner yapı.', defaultLocation: 'Türkiye' },
  'tiny-house': { title: 'Tiny House', specLabel: 'Tiny House', description: 'Taşınabilir ve kompakt yaşam alanı.', defaultLocation: 'Türkiye' },
  'santiye': { title: 'Şantiye Yapısı', specLabel: 'Şantiye Yapısı', description: 'Şantiye kullanımına uygun modüler alanlar.', defaultLocation: 'Türkiye' },
  'moduler': { title: 'Modüler Yapı', specLabel: 'Modüler Yapı', description: 'Esnek modüler planlı yapı.', defaultLocation: 'Türkiye' },
  'deprem': { title: 'Deprem Projesi', specLabel: 'Deprem Projesi', description: 'Acil barınma ve sosyal alan çözümleri.', defaultLocation: 'Türkiye' },
};

const CITY_LIST = [
  'Konya','Hatay','Karaman','Mersin','Antalya','Ankara','İstanbul','Istanbul','İzmir','Izmir','Beyşehir','Yunak','Cihanbeyli','Karatay','Meram','Ereğli','Eregli','Karapınar','Karapinar','Kulu','Seydişehir','Seydisehir','Hüyük','Huyuk','Doğanhisar','Doganhisar','Ilgın','Ilgin','Bozkır','Bozkir','Kadınhanı','Kadinhanı','Piribeyli','Yunak','Karaman','Beysehir','Yalova','Osmaniye'
];

function guessLocationFromSegments(segments: string[], fallback: string): string {
  const joined = segments.join(' ').toLocaleUpperCase('tr-TR');
  for (const city of CITY_LIST) {
    const up = city.toLocaleUpperCase('tr-TR');
    if (joined.includes(up)) return city.replace('Istanbul','İstanbul').replace('Izmir','İzmir').replace('Eregli','Ereğli').replace('Karapinar','Karapınar').replace('Seydisehir','Seydişehir').replace('Huyuk','Hüyük').replace('Ilgin','Ilgın').replace('Bozkir','Bozkır').replace('Kadinhanı','Kadınhanı').replace('Beysehir','Beyşehir');
  }
  return fallback;
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);

function toPublicPath(absPath: string): string {
  const norm = absPath.split(path.sep).join('/');
  const idx = norm.indexOf('/public/');
  return idx >= 0 ? norm.slice(idx + '/public'.length) : norm;
}

function parseAreaFromName(name: string): number | undefined {
  // Normalize separators
  const norm = name.replace(/_/g, ' ').replace(/-/g, ' ');
  // 1) Look for patterns like "86 M2", "86M2", "86 m²"
  const m2 = norm.match(/(\d+[\.,]?\d*)\s*[mM]\s*[²2]?\b/);
  if (m2) {
    const v = parseFloat(m2[1].replace(',', '.'));
    if (!Number.isNaN(v)) return Math.round(v * 10) / 10;
  }
  // 2) Look for patterns like "3X9", "3,5x8", "300x500"
  const multi = norm.match(/(\d+[\.,]?\d*)\s*[xX]\s*(\d+[\.,]?\d*)/);
  if (multi) {
    let a = parseFloat(multi[1].replace(',', '.'));
    let b = parseFloat(multi[2].replace(',', '.'));
    // If values look like centimeters (e.g., 300x500), convert to meters
    if (a > 50) a = a / 100;
    if (b > 50) b = b / 100;
    const v = a * b;
    if (!Number.isNaN(v)) return Math.round(v * 10) / 10;
  }
  return undefined;
}

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [] as import('fs').Dirent[];
  }
}

async function collectImages(dir: string): Promise<string[]> {
  const entries = await readDirSafe(dir);
  const images: string[] = [];
  for (const entry of entries) {
    if (entry.isFile()) {
      // Skip Thumbs.db files
      if (entry.name.toLowerCase() === 'thumbs.db') continue;
      const ext = path.extname(entry.name);
      if (IMAGE_EXTS.has(ext)) {
        images.push(toPublicPath(path.join(dir, entry.name)));
      }
    }
  }
  // Prefer natural order
  images.sort();
  return images;
}

async function collectImagesDeep(dir: string): Promise<string[]> {
  const entries = await readDirSafe(dir);
  let all: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await collectImagesDeep(full);
      all = all.concat(sub);
    } else {
      const ext = path.extname(full);
      if (IMAGE_EXTS.has(ext)) all.push(toPublicPath(full));
    }
  }
  all.sort();
  return all;
}

// Detect filenames that include m² markers like "86m2", "86 m2", "86 m²"
const AREA_FILENAME_RE = /(\d+[\.,]?\d*)\s*m\s*(?:2|²)\b/i;

function chooseCoverImage(images: string[]): string {
  // Prefer an image whose filename indicates area (e.g., "86m2", "86 m2", "86 m²")
  // Robust regex independent of parseAreaFromName quirks
  const byArea = images.find((rel) => AREA_FILENAME_RE.test(path.basename(rel)));
  if (byArea) return byArea;

  // Also prefer "bilinmeyenm2" files for projects without known area
  const bilinmeyenm2 = images.find((rel) => /bilinmeyenm2/i.test(path.basename(rel)));
  if (bilinmeyenm2) return bilinmeyenm2;

  // Otherwise, look for common cover hints
  const hints = [/kapak/i, /cover/i, /front/i, /ana/i, /render/i];
  for (const re of hints) {
    const hit = images.find((rel) => re.test(path.basename(rel)));
    if (hit) return hit;
  }

  // Fallback: first image
  return images[0];
}

function getProjectSpecificDescription(projectId: string, area?: number, group?: string): string {
  const id = projectId.toLowerCase();
  
  // Prefabrik projeler
  if (id.includes('ahmet ağıl')) return 'Kaba kurulum aşamasında prefabrik konut projesi';
  if (id.includes('ahmet saruhan')) return 'Modern tasarım prefabrik ev çözümü';
  if (id.includes('ali yavuz')) return 'Geniş alan prefabrik konut projesi';
  if (id.includes('ayşe güner')) return 'Çelik konstrüksiyonlu villa projesi';
  if (id.includes('durmuş ali yücel')) return 'Beyşehir bölgesi prefabrik konut';
  if (id.includes('durmuş üner')) return 'Detaylı kurulum prefabrik ev projesi';
  if (id.includes('ersin güneş')) return 'Kompakt prefabrik konut çözümü';
  if (id.includes('ismet kan')) return 'Standart prefabrik ev projesi';
  if (id.includes('kadriye tekneçukur')) return 'İkiz villa prefabrik konut sistemi';
  if (id.includes('mahmut yaşar')) return 'Cihanbeyli bölgesi prefabrik konut';
  if (id.includes('mülkiye yangel')) return 'Çoklu görsel prefabrik ev projesi';
  if (id.includes('mustafa doğan')) return 'Küçük alan prefabrik konut çözümü';
  if (id.includes('nurettin intepe')) return 'Orta boy prefabrik ev projesi';
  if (id.includes('önder hatipoğlu')) return 'Geniş kapsamlı prefabrik konut';
  if (id.includes('recep zengin')) return 'Kompakt prefabrik ev çözümü';
  if (id.includes('refik çelik')) return 'Standart prefabrik konut projesi';
  if (id.includes('sami kahya')) return 'Detaylı prefabrik ev projesi';
  if (id.includes('semih bozçalı')) return 'Modern prefabrik konut çözümü';

  // Modüler projeler
  if (id.includes('bungalow')) return 'Tek katlı bungalow modüler konut';
  if (id.includes('triana')) return 'Özel tasarım modüler konut projesi';
  if (id.includes('üçgen ev')) return 'Üçgen form modüler ev tasarımı';
  if (id.includes('l shape')) return 'L şekilli modüler konut sistemi';
  if (id.includes('dört parça')) return 'Dört modül birleşimli konut';
  if (id.includes('çerçeveli')) return 'Çerçeveli modüler konut projesi';
  if (id.includes('iki parça')) return 'İki modül birleşimli konut sistemi';
  if (id.includes('norway')) return 'Norway tarzı modüler konut';
  if (id.includes('lütfullah dikkaya')) return '9x9 metre modüler konut projesi';
  if (id.includes('ziya çepni')) return '74 m² modüler konut çözümü';
  if (id.includes('üç modül')) return 'Üç modül birleşimli konut';
  if (id.includes('halil dündar')) return 'Birleşimli modüler konut projesi';
  if (id.includes('kış bahçesi')) return 'Modüler kış bahçesi sistemi';

  // Modüler ofis projeleri
  if (id.includes('100 m2-ofis')) return '100 m² modüler ofis binası';
  if (id.includes('900x950')) return 'Büyük alan modüler ofis projesi';
  if (id.includes('insta')) return 'Instagram ofis modüler yapısı';
  if (id.includes('karapınar')) return 'Karapınar muhtarlık modüler ofisi';
  if (id.includes('ofis-showroom')) return 'Ofis ve showroom modüler yapısı';
  if (id.includes('ramazan uyar')) return '324 m² büyük modüler ofis projesi';

  // Sıfır atık projeleri
  if (id.includes('karatay') && id.includes('wc')) return 'Karatay belediyesi WC tesisi';
  if (id.includes('karatay') && !id.includes('wc')) return 'Karatay belediyesi sıfır atık merkezi';
  if (id.includes('niğde')) return 'Niğde belediyesi sıfır atık tesisi';
  if (id.includes('pamukkale')) return 'Pamukkale belediyesi sıfır atık merkezi';
  if (id.includes('zeytinburnu')) return 'Zeytinburnu belediyesi sıfır atık tesisi';
  if (id.includes('çevre şehircilik')) return 'Çevre Şehircilik Bakanlığı sıfır atık tesisi';

  // Konteyner WC projeleri
  if (id.includes('karatay') && id.includes('wc')) return 'Karatay belediyesi WC tesisi';
  if (id.includes('wc') && id.includes('belediyesi')) return 'Belediye WC tesisi';
  if (id.includes('wc') && id.includes('mobil')) return 'Mobil WC tesisi';

  // Konteyner projeleri
  if (id.includes('ahmet kesepek')) return '4x11 konteyner konut projesi';
  if (id.includes('mehmet erdem')) return '3.5x9 konteyner konut çözümü';
  if (id.includes('temel peker')) return '3.5x9 konteyner konut projesi';
  if (id.includes('remzi nuray')) return '4x11 konteyner konut sistemi';
  if (id.includes('tuğrul erim')) return '4x11 konteyner konut projesi';
  if (id.includes('sergi galeri')) return '4.5x15 sergi galeri konteyneri';
  if (id.includes('ahmet kesepek-woody')) return 'Woody tasarım konteyner konut';
  if (id.includes('mehmet kale')) return '3.5x9 konteyner konut çözümü';
  if (id.includes('fray-savaş ay')) return '3.5x8 konteyner konut projesi';
  if (id.includes('hatice çağar')) return 'Konteyner konut çözümü';
  if (id.includes('serdar bey-earthen')) return 'Earthen tasarım konteyner konut';

  // Güvenlik kulübesi projeleri
  if (id.includes('300x500-güvenlik')) return '300x500 güvenlik kulübesi';
  if (id.includes('300x200-çağlayan')) return 'Çağlayan Plastik güvenlik kulübesi';
  if (id.includes('300x200 selçuker')) return 'Selçuker Center güvenlik kulübesi';
  if (id.includes('200x300 fabrika')) return 'Fabrika güvenlik kulübesi sistemi';
  if (id.includes('3x5')) return '3x5 güvenlik kulübesi';

  // Şantiye projeleri
  if (id.includes('hatay wc')) return 'Hatay bölgesi şantiye WC tesisi';
  if (id.includes('karaman karsel')) return 'Karaman şantiye idari binası';
  if (id.includes('tigem')) return 'TİGEM şantiye tesisi';
  if (id.includes('meram trafik')) return 'Meram trafik şantiye tesisi';
  if (id.includes('meram üzüm bağı')) return 'Meram üzüm bağı şantiye tesisi';
  if (id.includes('neka')) return 'NEKA A.Ş şantiye tesisi';
  if (id.includes('otobüs harekat')) return 'Otobüs harekat şantiye tesisi';

  // Çelik projeler
  if (id.includes('metin arıkan')) return '57 m² hafif çelik konut projesi';
  if (id.includes('casa erdem')) return 'Casa Erdem çelik konut tasarımı';
  if (id.includes('osman deveci')) return '115 m² çelik konut projesi';
  if (id.includes('osman hoşnut')) return '115 m² çelik konut çözümü';
  if (id.includes('bae-masjid')) return 'BAE Masjid özel çelik yapısı';

  // Tiny house projeleri
  if (id.includes('tinyempire')) return 'Tiny Empire mobil konut';
  if (id.includes('işçi karavanı')) return 'İşçi karavanı mobil konut';
  if (id.includes('karatay belediyesi-mobil wc')) return 'Karatay belediyesi mobil WC';
  if (id.includes('mobil wc-2')) return 'Mobil WC tesisi';
  if (id.includes('seyyar mutfak')) return 'Seyyar mutfak mobil tesisi';
  if (id.includes('tiny hills')) return 'Tiny Hills mobil konut';
  if (id.includes('wildgrey')) return 'Wildgrey mobil konut tasarımı';
  if (id.includes('nomads')) return 'Nomads mobil konut projesi';
  if (id.includes('hood')) return 'Hood mobil konut çözümü';

  // Ekmek kabini projeleri
  if (id.includes('beyşehir ekmek')) return 'Beyşehir ekmek kabini tesisi';
  if (id.includes('ekmek kabini-3x2')) return '3x2 ekmek kabini tesisi';

  // Genel fallback
  if (area && group) return `${area} m² ${group.toLowerCase()} projesi`;
  if (area) return `${area} m² özel proje`;
  if (group) return `${group.toLowerCase()} odaklı özel çözüm`;
  return 'Özel tasarım proje çözümü';
}

function mapGroupLabel(relSegments: string[]): { label?: string } {
  const first = (relSegments[0] || '').toUpperCase();
  if (first.includes('EV')) return { label: 'Ev' };
  if (first.includes('OFİS') || first.includes('OFIS')) return { label: 'Ofis' };
  if (first.includes('WC') || first.includes('DUŞ')) return { label: 'WC/Duş' };
  if (first.includes('GÜVENL') || first.includes('GUVENL')) return { label: 'Güvenlik Kabini' };
  if (first.includes('EKMEK')) return { label: 'Ekmek Kabini' };
  if (first.includes('BUNG')) return { label: 'Bungalov' };
  if (first.includes('SIFIR') || first.includes('ATIK')) return { label: 'Sıfır Atık Merkezi' };
  return { label: undefined };
}

async function walkForProjects(categoryDirAbs: string, category: Project['category']): Promise<Project[]> {
  const projects: Project[] = [];

  async function walk(dir: string) {
    const entries = await readDirSafe(dir);
    const hasChildDirs = entries.some((e) => e.isDirectory());
    const localImages = await collectImages(dir);
    
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await walk(path.join(dir, entry.name));
      }
    }

    // Collect images directly under this directory
    const imgs = localImages;
    // Treat ONLY leaf directories (no subfolders) as projects
    if (imgs.length > 0 && !hasChildDirs) {
      // Build a project for this folder
      // Derive area scanning upwards by segments (avoid matching dates in full path)
      const rel = path.relative(categoryDirAbs, dir);
      const segments = rel.split(path.sep).filter(Boolean);
      let area: number | undefined;
      for (let i = segments.length - 1; i >= 0; i--) {
        area = parseAreaFromName(segments[i]);
        if (area) break;
      }
      const meta = CATEGORY_DESCRIPTIONS[category];
      const group = mapGroupLabel(segments).label;
      const titleParts = [meta.title];
      if (group) titleParts.push(group);
      const title = titleParts.join(' • ');
      const specs = getProjectSpecificDescription(dir, area, group);
      const description = getProjectSpecificDescription(dir, area, group);
      const location = guessLocationFromSegments(segments, meta.defaultLocation);
      projects.push({
        id: dir.split(path.sep).join('/'),
        category,
        title,
        description,
        specs,
        location,
        image: chooseCoverImage(imgs),
        images: imgs,
        area,
        group,
      });
    }
  }

  await walk(categoryDirAbs);
  return projects;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const category = url.searchParams.get('category') || 'all';
    
    const baseAbs = path.join(process.cwd(), 'public', 'images', 'projects', '1-URUN-GORSELLERI');
    const topEntries = await readDirSafe(baseAbs);
    let all: Project[] = [];

  for (const entry of topEntries) {
    if (!entry.isDirectory()) continue;
    const categoryId = CATEGORY_DIR_TO_ID[entry.name];
    if (!categoryId) continue;
    
    // Eğer kategori filtresi varsa sadece o kategoriyi işle
    if (category !== 'all' && category !== categoryId) continue;
    
    const catAbs = path.join(baseAbs, entry.name);
    const items = await walkForProjects(catAbs, categoryId);
    all = all.concat(items);
  }

  // Deduplicate by id (if any), and sort stable by category then title
  const seen = new Set<string>();
  const unique: Project[] = [];
  for (const p of all) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    unique.push(p);
  }

  // Prefer projects with cover images and reasonable size
  unique.sort((a, b) => (b.area ?? -1) - (a.area ?? -1));

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProjects = unique.slice(startIndex, endIndex);

  // Map image paths to proxy endpoint to avoid Unicode/encoding issues on some platforms
  const mapped = paginatedProjects.map((p) => {
    const mapOne = (rel: string) => `/api/pimg?path=${encodeURIComponent(rel.replace(/^\//, ''))}`;
    return {
      ...p,
      image: mapOne(p.image),
      images: p.images.map(mapOne),
    };
  });

  return new NextResponse(JSON.stringify({
    count: mapped.length,
    total: unique.length,
    page,
    limit,
    totalPages: Math.ceil(unique.length / limit),
    projects: mapped
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
      count: 0,
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0,
      projects: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}


