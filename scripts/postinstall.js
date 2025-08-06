// scripts/postinstall.js
const { execSync } = require('child_process');

console.log('🔧 Instalando Chromium para Vercel...');

try {
  // Instalar Chromium para el entorno de Vercel
  execSync('npx @sparticuz/chromium install', { stdio: 'inherit' });
  console.log('✅ Chromium instalado correctamente');
} catch (error) {
  console.log('⚠️ Error instalando Chromium:', error.message);
  console.log('Esto es normal en desarrollo local');
} 