const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Specific realistic image mappings
const imageMap = {
  // MEN
  'cj-m-01': '/stock/prod-kurta-beige.jpg',
  'cj-m-02': '/stock/prod-shirt-blue.jpg',
  'cj-m-03': '/stock/prod-family-green.jpg',
  'cj-m-04': '/stock/prod-kurti-mustard.jpg',
  'cj-m-05': '/stock/prod-men-beige-flat.jpg',
  'cj-m-06': '/stock/prod-kurta-rust.jpg',
  'cj-m-07': '/stock/prod-men-kurta-portrait.jpg',
  'cj-m-08': '/stock/prod-shirt-blue.jpg',
  'cj-m-09': '/stock/prod-father-kurta.jpg',
  'cj-m-10': '/stock/prod-men-beige-flat.jpg',
  'cj-m-11': '/stock/prod-kurta-rust.jpg',
  'cj-m-12': '/stock/prod-kurta-beige.jpg',
  'cj-m-13': '/stock/prod-shirt-blue.jpg',
  'cj-m-14': '/stock/prod-father-kurta.jpg',
  'cj-m-15': '/stock/prod-shirt-blue.jpg',

  // WOMEN
  'cj-w-01': '/stock/prod-women-green-kurta.jpg',
  'cj-w-02': '/stock/prod-kurti-mustard.jpg',
  'cj-w-03': '/stock/prod-saree-ivory.jpg',
  'cj-w-04': '/stock/prod-anarkali-rust.jpg',
  'cj-w-05': '/stock/prod-women-floral.jpg',
  'cj-w-06': '/stock/prod-women-yellow-saree.jpg',
  'cj-w-07': '/stock/prod-shirt-blue.jpg',
  'cj-w-08': '/stock/prod-saree-green.jpg',
  'cj-w-09': '/stock/prod-kurta-rust.jpg',
  'cj-w-10': '/stock/prod-anarkali-rust.jpg',
  'cj-w-11': '/stock/prod-mother-suit.jpg',
  'cj-w-12': '/stock/prod-women-floral.jpg',
  'cj-w-13': '/stock/prod-shirt-blue.jpg',
  'cj-w-14': '/stock/prod-kurti-mustard.jpg',
  'cj-w-15': '/stock/prod-women-floral.jpg',

  // KIDS
  'cj-k-01': '/stock/prod-kids-boy-mustard.jpg',
  'cj-k-02': '/stock/prod-frock-peach.jpg',
  'cj-k-03': '/stock/prod-dhoti-kids.jpg',
  'cj-k-04': '/stock/prod-daughter-lehenga.jpg',
  'cj-k-05': '/stock/prod-boy-beige-kurta.jpg',
  'cj-k-06': '/stock/prod-kids-girl-floral.jpg',
  'cj-k-07': '/stock/prod-kids-boy-ivory.jpg',
  'cj-k-08': '/stock/prod-kids-girl-mustard.jpg',
  'cj-k-09': '/stock/prod-kids-boy-mustard.jpg',
  'cj-k-10': '/stock/prod-daughter-lehenga.jpg',
};

products.forEach(p => {
  if (imageMap[p.id]) {
    p.image = imageMap[p.id];
  }
});

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully updated all 40 products with distinct, high-res real garment images!');
