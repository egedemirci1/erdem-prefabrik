const fs = require("fs");
const path = require("path");

const trDir = path.join(__dirname, "..", "data", "tr");
const enDir = path.join(__dirname, "..", "data", "en");

const titleMap = {
  "Deprem Projesi": "Earthquake Project",
  Konteyner: "Container",
  "Konteyner • Ekmek Kabini": "Container • Bread Booth",
  "Konteyner • Güvenlik Kabini": "Container • Security Booth",
  "Konteyner • WC/Duş": "Container • WC/Shower",
  "Modüler Yapı": "Modular Building",
  "Modüler Yapı • Bungalov": "Modular Building • Bungalow",
  "Modüler Yapı • Ev": "Modular Building • Home",
  "Modüler Yapı • Ofis": "Modular Building • Office",
  "Modüler Yapı • Sıfır Atık Merkezi": "Modular Building • Zero Waste Center",
  "Prefabrik Ev": "Prefabricated House",
  "Prefabrik Ev • Ev": "Prefabricated House • Home",
  "Tiny House": "Tiny House",
  "Tiny House • WC/Duş": "Tiny House • WC/Shower",
  "Çelik Ev": "Steel House",
  "Çelik Ev • Ev": "Steel House • Home",
  "Şantiye Yapısı": "Construction Building",
  "Şantiye Yapısı • WC/Duş": "Construction Building • WC/Shower",
};

const groupMap = {
  Bungalov: "Bungalow",
  "Ekmek Kabini": "Bread Booth",
  Ev: "Home",
  "Güvenlik Kabini": "Security Booth",
  Ofis: "Office",
  "Sıfır Atık Merkezi": "Zero Waste Center",
  "WC/Duş": "WC/Shower",
};

const locationMap = {
  Türkiye: "Turkey",
  Beyşehir: "Beysehir",
  Karapınar: "Karapinar",
};

const textMap = {
  "100 m² ofis projesi": "100 m² office project",
  "115 m² çelik konut projesi": "115 m² steel residential project",
  "115 m² çelik konut çözümü": "115 m² steel residential solution",
  "2 katlı bungalow modüler konut": "two-story bungalow modular home",
  "3.5x8 konteyner konut projesi": "3.5x8 container home project",
  "3.5x9 konteyner konut projesi": "3.5x9 container home project",
  "3.5x9 konteyner konut çözümü": "3.5x9 container home solution",
  "300x500 güvenlik kulübesi": "300x500 security booth",
  "3x5 güvenlik kulübesi": "3x5 security booth",
  "6 m² ekmek kabini projesi": "6 m² bread booth project",
  "6 m² güvenlik kabini projesi": "6 m² security booth project",
  "6.3 m² ekmek kabini projesi": "6.3 m² bread booth project",
  "Casa Erdem çelik konut tasarımı": "Casa Erdem steel home design",
  "Cihanbeyli bölgesi prefabrik konut": "Cihanbeyli region prefab home",
  "Detaylı kurulum prefabrik ev projesi": "detailed-installation prefab home project",
  "Earthen tasarım konteyner konut": "Earthen design container home",
  "Hatay bölgesi şantiye WC tesisi": "Hatay region construction site WC facility",
  "Hood mobil konut çözümü": "Hood mobile home solution",
  "Karaman şantiye idari binası": "Karaman construction site administrative building",
  "Küçük alan prefabrik konut çözümü": "compact-area prefab home solution",
  "L şekilli modüler konut sistemi": "L-shaped modular home system",
  "Modern tasarım prefabrik ev çözümü": "modern-design prefab home solution",
  "NEKA A.Ş şantiye tesisi": "NEKA Inc. construction site facility",
  "Nomads mobil konut projesi": "Nomads mobile home project",
  "Otobüs harekat şantiye tesisi": "bus operations construction site facility",
  "Selçuker Center güvenlik kulübesi": "Selcuker Center security booth",
  "ev odaklı özel çözüm": "home-focused custom solution",
  "ofis odaklı özel çözüm": "office-focused custom solution",
  "sıfır atık merkezi odaklı özel çözüm": "zero waste center-focused custom solution",
  "wc/duş odaklı özel çözüm": "WC/shower-focused custom solution",
  "Çağlayan Plastik güvenlik kulübesi": "Caglayan Plastik security booth",
  "Çelik konstrüksiyonlu villa projesi": "steel construction villa project",
  "Özel tasarım modüler konut projesi": "custom-design modular home project",
  "Özel tasarım proje çözümü": "custom-design project solution",
  "Üç modül birleşimli konut": "three-module combined home",
  "İki modül birleşimli konut sistemi": "two-module combined home system",
};

function translateAreaProject(text) {
  if (!text) return text;
  return text.replace(/(\d+(?:\.\d+)?)\s*m²\s*özel proje/gi, "$1 m² custom project");
}

function translateText(text) {
  if (!text) return text;
  if (textMap[text]) return textMap[text];
  const areaTranslated = translateAreaProject(text);
  if (areaTranslated !== text) return areaTranslated;
  return text;
}

function translateField(value, map) {
  if (!value) return value;
  return map[value] ?? value;
}

function translateProject(project) {
  const translated = {
    ...project,
    title: translateField(project.title, titleMap) ?? translateText(project.title),
    description: translateText(project.description),
    specs: translateText(project.specs),
    location: translateField(project.location, locationMap) ?? project.location,
  };

  if (project.group) {
    translated.group = translateField(project.group, groupMap) ?? project.group;
  }

  return translated;
}

if (!fs.existsSync(enDir)) {
  fs.mkdirSync(enDir, { recursive: true });
}

const files = fs
  .readdirSync(trDir)
  .filter((f) => f.endsWith(".json") && f !== "projects-fixed.json");

let total = 0;

for (const file of files) {
  const trPath = path.join(trDir, file);
  const enPath = path.join(enDir, file);
  const data = JSON.parse(fs.readFileSync(trPath, "utf8"));
  const translated = Array.isArray(data) ? data.map(translateProject) : translateProject(data);
  fs.writeFileSync(enPath, JSON.stringify(translated, null, 2));
  const count = Array.isArray(translated) ? translated.length : 1;
  total += count;
  console.log(`Translated ${file}: ${count} projects`);
}

console.log(`Done. ${total} projects written to data/en/`);
