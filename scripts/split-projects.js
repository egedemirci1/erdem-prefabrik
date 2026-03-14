const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const projectsPath = path.join(dataDir, 'projects.json');
const all = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const konteyner = all.filter((p) => p.category === 'konteyner');
const moduler = all.filter((p) => p.category === 'moduler');
const prefabrikCelik = all.filter(
  (p) => p.category === 'prefabrik' || p.category === 'celik' || p.category === 'santiye'
);

const featured = all.slice(0, 8);

fs.writeFileSync(path.join(dataDir, 'projects-konteyner.json'), JSON.stringify(konteyner));
fs.writeFileSync(path.join(dataDir, 'projects-moduler.json'), JSON.stringify(moduler));
fs.writeFileSync(path.join(dataDir, 'projects-prefabrik-celik.json'), JSON.stringify(prefabrikCelik));
fs.writeFileSync(path.join(dataDir, 'featured-projects.json'), JSON.stringify(featured));

console.log('Split projects:', { konteyner: konteyner.length, moduler: moduler.length, prefabrikCelik: prefabrikCelik.length, featured: featured.length });
