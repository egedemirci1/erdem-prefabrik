// Kategori tanımları ve filtreleme fonksiyonları
export const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'prefabrik', name: 'Prefabrik Yapılar' },
  { id: 'celik', name: 'Hafif Çelik Yapılar' },
  { id: 'santiye', name: 'Şantiye & Özel Kullanım' },
  { id: 'moduler', name: 'Modüler' }
];

export type ProjectCategory = 'prefabrik' | 'celik' | 'santiye' | 'moduler';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  specs: string;
  location: string;
  image: string;
  images: string[];
  area?: number;
}

// Projeler sayfasındaki aynı filtreleme mantığı
export function filterProjectsByCategory(projects: Project[], category: string): Project[] {
  if (category === 'all') {
    return projects;
  }
  
  return projects.filter(p => p.category === category);
}

// Alt kategori mapping'leri
export const subCategoryMapping = {
  // Konteyner alt kategorileri -> santiye kategorisi
  'konteyner': 'santiye',
  'konteyner-ev': 'santiye',
  'konteyner-ofis': 'santiye',
  'konteyner-guvenlik-kulubesi': 'santiye',
  'konteyner-wc-dus-kabini': 'santiye',
  
  // Modüler alt kategorileri -> moduler kategorisi
  'moduler': 'moduler',
  'moduler-bungalow': 'moduler',
  'moduler-tiny-house': 'moduler',
  'moduler-ofis': 'moduler',
  'moduler-sifir-atik': 'moduler',
  'moduler-moduler-ev': 'moduler',
  
  // Prefabrik alt kategorileri
  'prefabrik-celik': 'prefabrik',
  'prefabrik-ev-villa': 'prefabrik',
  'prefabrik-santiye-yapilari': 'santiye',
  'celik-ev-villa': 'celik',
  'santiye-ozel-kullanim': 'santiye'
};

export function getMainCategoryFromSub(subCategory: string): ProjectCategory | null {
  const mainCategory = subCategoryMapping[subCategory as keyof typeof subCategoryMapping];
  return mainCategory as ProjectCategory || null;
}

// Alt kategori filtreleme fonksiyonu
export function filterProjectsBySubCategory(projects: Project[], subCategory: string | null): Project[] {
  if (!subCategory || subCategory === 'all') {
    return projects;
  }
  
  const filtered = projects.filter((p) => {
    const title = p.title.toLowerCase();
    const specs = p.specs.toLowerCase();
    const description = p.description.toLowerCase();
    
    // Konteyner alt kategorileri
    if (subCategory === 'wc-dus-kabini') {
      return title.includes('wc') || title.includes('duş') || title.includes('duş') ||
             specs.includes('wc') || specs.includes('duş') || specs.includes('duş') ||
             description.includes('wc') || description.includes('duş') || description.includes('duş');
    }
    
    if (subCategory === 'guvenlik-kulubesi') {
      return title.includes('güvenlik') || title.includes('guvenlik') || title.includes('ekmek') ||
             specs.includes('güvenlik') || specs.includes('guvenlik') || specs.includes('ekmek') ||
             description.includes('güvenlik') || description.includes('guvenlik') || description.includes('ekmek');
    }
    
    if (subCategory === 'ev') {
      // Ev & Ofis için sadece standart ve özel tasarım konteynerler (belirtilen klasörler)
      // Güvenlik, ekmek, wc projelerini hariç tut
      const isSecurity = title.includes('güvenlik') || title.includes('guvenlik') ||
                        specs.includes('güvenlik') || specs.includes('guvenlik') ||
                        description.includes('güvenlik') || description.includes('guvenlik');
      
      const isEkmek = title.includes('ekmek') ||
                     specs.includes('ekmek') ||
                     description.includes('ekmek');
      
      const isWc = title.includes('wc') || title.includes('duş') || title.includes('duş') ||
                  specs.includes('wc') || specs.includes('duş') || specs.includes('duş') ||
                  description.includes('wc') || description.includes('duş') || description.includes('duş');
      
      // Güvenlik, ekmek, wc projelerini hariç tut
      if (isSecurity || isEkmek || isWc) return false;
      
      // Sadece standart ve özel tasarım konteynerler (belirtilen klasörler)
      return true; // Tüm diğer konteyner projeleri (standart ve özel tasarım)
    }
    
    // Modüler alt kategorileri
    if (subCategory === 'bungalow' || subCategory === 'tiny-house') {
      return title.includes('bungalov') || title.includes('bungalow') || title.includes('tiny') ||
             specs.includes('bungalov') || specs.includes('bungalow') || specs.includes('tiny') ||
             description.includes('bungalov') || description.includes('bungalow') || description.includes('tiny');
    }
    
    if (subCategory === 'ofis' || subCategory === 'moduler-ev') {
      // Modüler Ev & Ofis için SADECE belirtilen klasörlerdeki projeler
      const allowedPaths = [
        '/ZİYA ÇEPNİ-74 M2/',
        '/4 PARÇA KONTEYNER 85 M2/',
        '/100 M2-OFİS/',
        '/900x950 Çatı İhtisası/',
        '/İKİ PARÇA MODÜLER/',
        '/insta/',
        '/KIŞ BAHÇESİ/',
        '/l shape modular/',
        '/OFIS-SHOWROOM/',
        '/ramazan uyar-324 m2/',
        '/triana/',
        '/ÜÇ MODÜL/'
      ];
      
      const isAllowed = p.image && allowedPaths.some(path => p.image.includes(path));
      
      return isAllowed;
    }
    
    if (subCategory === 'sifir-atik') {
      // Sadece belirtilen 5 sıfır atık projesi
      return (p.image && (
        p.image.includes('karatay-sıfır atık') || 
        p.image.includes('niğde -sıfır atık') || 
        p.image.includes('pamukkale-sıfır atık') || 
        p.image.includes('ZEYTİNBURNU -SIFIR ATIK') || 
        p.image.includes('ÇEVRE ŞEHİRCİLİK BAKANLIĞI Sıfır Atık')
      ));
    }
    
    // Default: show all
    return true;
  });
  
  return filtered;
}
