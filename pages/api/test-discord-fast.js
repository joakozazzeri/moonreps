// pages/api/test-discord-fast.js
const { getDiscordBot } = require('../../lib/discord-bot');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const bot = getDiscordBot();
    
    // Iniciar el bot si no está corriendo (con timeout más corto)
    if (!bot.client.isReady()) {
      console.log('🔄 Iniciando bot para la prueba...');
      await bot.start();
      // Esperar menos tiempo para que se conecte
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Producto de prueba
    const testProduct = {
      name: '[FAST TEST] Producto Rápido',
      price: 29.99,
      brand: 'Test Brand',
      category: 'Test Platform',
      buyLink: 'https://example.com',
      imageUrls: ['https://via.placeholder.com/400x300/002365/ffffff?text=Fast+Test']
    };

    console.log('⚡ Enviando notificación rápida...');
    await bot.sendProductNotification(testProduct);
    
    res.status(200).json({ 
      message: '⚡ Notificación rápida enviada correctamente',
      product: testProduct,
      time: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en prueba rápida de Discord:', error);
    res.status(500).json({ 
      message: '❌ Error al enviar notificación rápida',
      error: error.message 
    });
  }
} 