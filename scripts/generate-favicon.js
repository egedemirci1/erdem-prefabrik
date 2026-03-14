const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

const publicDir = path.join(__dirname, '..', 'public');
const png32Path = path.join(publicDir, 'favicon-32x32.png');
const icoPath = path.join(publicDir, 'favicon.ico');

async function main() {
  if (!fs.existsSync(png32Path)) {
    console.error('favicon-32x32.png not found in public/');
    process.exit(1);
  }
  const buf32 = await sharp(png32Path).resize(32, 32).png().toBuffer();
  const buf16 = await sharp(png32Path).resize(16, 16).png().toBuffer();
  const ico = await toIco([buf16, buf32]);
  fs.writeFileSync(icoPath, ico);
  console.log('Generated favicon.ico:', ico.length, 'bytes');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
