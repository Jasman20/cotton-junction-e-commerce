const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\UNICOM\\.gemini\\antigravity-ide\\brain\\323557cc-f8c2-494c-8b53-e5ab76b27483';
const destDir = path.join(__dirname, '..', 'public', 'stock');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);

const mapping = [
  { prefix: 'hero_family', dest: 'hero-family.jpg' },
  { prefix: 'cat_men', dest: 'cat-men.jpg' },
  { prefix: 'cat_women', dest: 'cat-women.jpg' },
  { prefix: 'cat_kids', dest: 'cat-kids.jpg' },
  { prefix: 'cat_festive', dest: 'cat-festive.jpg' },
  { prefix: 'fabric_cotton', dest: 'fabric-cotton.jpg' },
];

for (const map of mapping) {
  const match = files.find(f => f.startsWith(map.prefix) && f.endsWith('.jpg'));
  if (match) {
    const srcPath = path.join(brainDir, match);
    const destPath = path.join(destDir, map.dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${match} -> public/stock/${map.dest}`);
  } else {
    console.log(`Could not find file matching ${map.prefix}`);
  }
}
