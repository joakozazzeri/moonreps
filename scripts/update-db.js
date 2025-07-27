// scripts/update-db.js
const db = require('../lib/db');

async function updateDatabase() {
  try {
    console.log('Verificando estructura de la base de datos...');
    
    // Verificar si las columnas brand y buyLink existen
    const tableInfo = await db.all("PRAGMA table_info(products)");
    const columns = tableInfo.map(col => col.name);
    
    console.log('Columnas existentes:', columns);
    
    // Agregar columna brand si no existe
    if (!columns.includes('brand')) {
      console.log('Agregando columna brand...');
      await db.run('ALTER TABLE products ADD COLUMN brand TEXT');
      console.log('Columna brand agregada exitosamente');
    } else {
      console.log('Columna brand ya existe');
    }
    
    // Agregar columna buyLink si no existe
    if (!columns.includes('buyLink')) {
      console.log('Agregando columna buyLink...');
      await db.run('ALTER TABLE products ADD COLUMN buyLink TEXT');
      console.log('Columna buyLink agregada exitosamente');
    } else {
      console.log('Columna buyLink ya existe');
    }
    
    console.log('Actualización de la base de datos completada');
  } catch (error) {
    console.error('Error actualizando la base de datos:', error);
  }
}

updateDatabase(); 