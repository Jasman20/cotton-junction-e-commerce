const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\UNICOM\\.gemini\\antigravity-ide\\brain\\323557cc-f8c2-494c-8b53-e5ab76b27483';
const destDir = path.join(__dirname, '..', 'public', 'stock');

const files = fs.readdirSync(brainDir);

const mapping = [
  { prefix: 'prod_kurta_beige', dest: 'prod-kurta-beige.jpg' },
  { prefix: 'prod_shirt_blue', dest: 'prod-shirt-blue.jpg' },
  { prefix: 'prod_saree_ivory', dest: 'prod-saree-ivory.jpg' },
  { prefix: 'prod_frock_peach', dest: 'prod-frock-peach.jpg' },
  { prefix: 'prod_dhoti_kids', dest: 'prod-dhoti-kids.jpg' },
  { prefix: 'prod_anarkali_rust', dest: 'prod-anarkali-rust.jpg' },
];

for (const map of mapping) {
  const match = files.find(f => f.startsWith(map.prefix) && f.endsWith('.jpg'));
  if (match) {
    fs.copyFileSync(path.join(brainDir, match), path.join(destDir, map.dest));
    console.log(`Copied ${match} -> ${map.dest}`);
  } else {
    console.log(`Not found: ${map.prefix}`);
  }
}
