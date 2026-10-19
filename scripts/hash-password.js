const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'CottonJunction@Indore2026';

const hash = bcrypt.hashSync(password, 10);

console.log('----------------------------------------------------');
console.log('Cotton Junction - Password Hash Utility');
console.log('----------------------------------------------------');
console.log('Input Password :', password);
console.log('Generated Hash :', hash);
console.log('----------------------------------------------------');
console.log('Place this in your .env.local file:');
console.log(`OWNER_PASSWORD_HASH="${hash}"`);
console.log('----------------------------------------------------');
