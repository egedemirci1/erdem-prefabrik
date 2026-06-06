const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
const trDir = path.join(outDir, "tr");

const pathMap = {
  about: "hakkimizda",
  contact: "iletisim",
  projects: "projeler",
  privacy: "gizlilik",
  terms: "kullanim-kosullari",
  container: "konteyner",
  modular: "moduler",
  "prefab-steel": "prefabrik-celik",
};

const subPathMap = {
  container: {
    home: "ev",
    office: "ofis",
    "security-booth": "guvenlik-kulubesi",
    "wc-shower": "wc-dus-kabini",
  },
  modular: {
    office: "ofis",
    "modular-home": "moduler-ev",
    "zero-waste": "sifir-atik",
  },
  "prefab-steel": {
    "prefab-home-villa": "prefabrik-ev-villa",
    "construction-special": "santiye-ozel-kullanim",
    "steel-home-villa": "celik-ev-villa",
    "construction-buildings": "prefabrik-santiye-yapilari",
  },
};

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function removeRecursive(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) removeRecursive(full);
    else fs.unlinkSync(full);
  }
  fs.rmdirSync(dir);
}

if (!fs.existsSync(trDir)) {
  console.log("No tr export folder, skipping URL rewrite");
  process.exit(0);
}

// Homepage
if (fs.existsSync(path.join(trDir, "index.html"))) {
  fs.copyFileSync(path.join(trDir, "index.html"), path.join(outDir, "index.html"));
}
if (fs.existsSync(path.join(trDir, "index.txt"))) {
  fs.copyFileSync(path.join(trDir, "index.txt"), path.join(outDir, "index.txt"));
}

for (const [canonical, turkish] of Object.entries(pathMap)) {
  const src = path.join(trDir, canonical);
  const dest = path.join(outDir, turkish);
  if (!fs.existsSync(src)) continue;

  const subs = subPathMap[canonical];
  if (subs) {
    for (const [enSub, trSub] of Object.entries(subs)) {
      const subSrc = path.join(src, enSub);
      const subDest = path.join(dest, trSub);
      if (fs.existsSync(subSrc)) {
        copyRecursive(subSrc, subDest);
      }
    }
    // Copy remaining subs that share same name (e.g. bungalow, tiny-house)
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (subs[entry.name]) continue;
      copyRecursive(path.join(src, entry.name), path.join(dest, entry.name));
    }
    // Copy section index
    fs.mkdirSync(dest, { recursive: true });
    if (fs.existsSync(path.join(src, "index.html"))) {
      fs.copyFileSync(path.join(src, "index.html"), path.join(dest, "index.html"));
    }
    if (fs.existsSync(path.join(src, "index.txt"))) {
      fs.copyFileSync(path.join(src, "index.txt"), path.join(dest, "index.txt"));
    }
  } else {
    copyRecursive(src, dest);
  }
}

removeRecursive(trDir);
console.log("Turkish export URLs rewritten to localized paths");
