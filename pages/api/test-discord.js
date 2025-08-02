// pages/api/test-discord.js
const { getDiscordBot } = require('../../lib/discord-bot');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const bot = getDiscordBot();
    
    // Producto de prueba
    const testProduct = {
      name: '[TEST] Producto de Prueba',
      price: '¥999 - ($140.00)',
      brand: 'Test Brand',
      category: 'Test Platform',
      buyLink: 'https://example.com',
      imageUrls: ['https://via.placeholder.com/400x300/0099ff/ffffff?text=Test+Product']
    };

    console.log('📤 Enviando notificación de prueba...');
    await bot.sendProductNotification(testProduct);
    
    res.status(200).json({ 
      message: '✅ Notificación de prueba enviada correctamente',
      product: testProduct
    });
  } catch (error) {
    console.error('Error en prueba de Discord:', error);
    res.status(500).json({ 
      message: '❌ Error al enviar notificación de prueba',
      error: error.message 
    });
  }
} 