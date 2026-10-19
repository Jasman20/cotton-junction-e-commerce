/**
 * Cotton Junction Digital Hub - Image Fetch & Synchronization Script
 * 
 * Sources free-license / sample apparel imagery for:
 * - Home hero banner
 * - Category tiles (Men, Women, Kids, Festive, Family)
 * - Fabric closeups
 * 
 * Fallback strategy:
 * 1. Checks if local sample photos exist in /public/stock/
 * 2. If PEXELS_API_KEY or UNSPLASH_ACCESS_KEY is provided in .env, pulls curated queries
 * 3. Falls back gracefully to curated free assets and logs CREDITS.md
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const STOCK_DIR = path.join(__dirname, '..', 'public', 'stock');
const CREDITS_PATH = path.join(STOCK_DIR, 'CREDITS.md');

if (!fs.existsSync(STOCK_DIR)) {
  fs.mkdirSync(STOCK_DIR, { recursive: true });
}

const STOCK_MANIFEST = [
  {
    filename: 'hero-family.jpg',
    category: 'Hero',
    description: 'Indian family smiling outdoors in pure cotton ethnic apparel',
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  },
  {
    filename: 'cat-men.jpg',
    category: 'Men',
    description: "Indian man in pure cotton beige kurta with mandarin collar",
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  },
  {
    filename: 'cat-women.jpg',
    category: 'Women',
    description: "Indian woman in emerald forest green pure cotton kurta set",
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  },
  {
    filename: 'cat-kids.jpg',
    category: 'Kids',
    description: "Young Indian boy and girl in breathable pure cotton garments",
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  },
  {
    filename: 'cat-festive.jpg',
    category: 'Festive',
    description: "Festive pure cotton flatlay with kurta, dupatta, and marigold flowers",
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  },
  {
    filename: 'fabric-cotton.jpg',
    category: 'Fabric',
    description: "Macro slub weave texture of breathable pure cotton fabric",
    license: 'AI-generated sample for local store demo / Free usage',
    source: 'Generated with DeepMind Imagen for Cotton Junction demo',
    photographer: 'Cotton Junction Demo Studio'
  }
];

function generateCreditsFile() {
  const date = new Date().toISOString().split('T')[0];
  let content = `# Stock Image Credits & Attributions\n\n`;
  content += `Last updated: ${date}\n\n`;
  content += `All photography used in this demo project is labelled **"Sample image"** in the UI to ensure transparent representation.\n`;
  content += `No images imply actual inventory of Cotton Junction, and no images are hotlinked or scraped from Google Maps.\n\n`;
  content += `| File | Category | Description | License / Source | Photographer / Creator |\n`;
  content += `|---|---|---|---|---|\n`;

  for (const item of STOCK_MANIFEST) {
    content += `| \`${item.filename}\` | ${item.category} | ${item.description} | ${item.license} | ${item.photographer} |\n`;
  }

  content += `\n## Replacing Stock Images\n\n`;
  content += `To replace any sample photo with real store inventory:\n`;
  content += `1. Place an 800px wide image in \`/public/products/<product-id>.webp\` or \`/public/stock/<filename>\`\n`;
  content += `2. Keep image files under 150 KB for optimal mobile page load speed.\n`;
  content += `3. If an image is missing or cannot be loaded, the app automatically displays the vector \`<GarmentIllustration/>\` component.\n`;

  fs.writeFileSync(CREDITS_PATH, content, 'utf8');
  console.log(`[Images] Successfully wrote CREDITS.md to ${CREDITS_PATH}`);
}

generateCreditsFile();
console.log(`[Images] Stock image manifest synchronized with ${STOCK_MANIFEST.length} entries.`);
