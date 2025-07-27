// scripts/setup.js
// Ejecuta este script con 'node scripts/setup.js' para crear y poblar la base de datos.
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function setup() {
  console.log('Opening database...');
  const db = await open({
    filename: './ecommerce.sqlite',
    driver: sqlite3.Database,
  });

  console.log('Dropping existing products table to apply new schema...');
  await db.exec('DROP TABLE IF EXISTS products');

  console.log('Creating new products table...');
  // AÑADIDO: Se agrega la columna 'brand'
  await db.exec(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      brand TEXT,
      imageUrls TEXT,
      buyLink TEXT
    );
  `);

  console.log('Seeding initial data...');
  // AÑADIDO: 'brand' en los datos iniciales
  const products = [
    { name: 'Amiri Tee', price: 62.00, category: 'Remeras', brand: 'Amiri', imageUrls: JSON.stringify(['https://placehold.co/400x400/2d3748/ffffff?text=Tee+Front', 'https://placehold.co/400x400/2d3748/ffffff?text=Tee+Back']), buyLink: 'https://example.com/buy/amiri-tee' },
    { name: 'Amiri Shorts', price: 168.00, category: 'Pantalones', brand: 'Amiri', imageUrls: JSON.stringify(['https://placehold.co/400x400/e2e8f0/2d3748?text=Amiri+Shorts']), buyLink: 'https://example.com/buy/amiri-shorts' },
    { name: 'Classic Tee', price: 25.00, category: 'Remeras', brand: 'Tommy Hilfiger', imageUrls: JSON.stringify(['https://placehold.co/400x400/e2e8f0/2d3748?text=Tommy+Tee']), buyLink: 'https://example.com/buy/tommy-tee' },
    { name: 'P-6000', price: 158.00, category: 'Zapatillas', brand: 'Nike', imageUrls: JSON.stringify(['https://placehold.co/400x400/e2e8f0/2d3748?text=Nike+P-6000']), buyLink: 'https://example.com/buy/nike-p6000' },
    { name: 'Essential Hoodie', price: 89.99, category: 'Abrigos', brand: 'Essentials', imageUrls: JSON.stringify(['https://placehold.co/400x400/e2e8f0/2d3748?text=Hoodie']), buyLink: 'https://example.com/buy/essential-hoodie' },
    { name: 'Denim Jacket', price: 120.50, category: 'Abrigos', brand: 'Levi\'s', imageUrls: JSON.stringify(['https://placehold.co/400x400/e2e8f0/2d3748?text=Jacket+Front', 'https://placehold.co/400x400/e2e8f0/2d3748?text=Jacket+Side']), buyLink: 'https://example.com/buy/denim-jacket' },
  ];

  const stmt = await db.prepare('INSERT INTO products (name, price, category, brand, imageUrls, buyLink) VALUES (?, ?, ?, ?, ?, ?)');
  for (const product of products) {
    await stmt.run(product.name, product.price, product.category, product.brand, product.imageUrls, product.buyLink);
  }
  await stmt.finalize();

  console.log('Database setup complete. Products seeded.');
  
  const result = await db.all('SELECT * FROM products');
  console.log('All products:', result);

  await db.close();
}

setup().catch(err => {
  console.error('Failed to setup database:', err);
  process.exit(1);
});