require('dotenv').config({ path: '.env.local' });
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { supabase } = require('./supabase');

class DiscordBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.channelId = process.env.DISCORD_CHANNEL_ID;
    this.token = process.env.DISCORD_BOT_TOKEN;

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client.once('ready', () => {
      console.log(`🤖 Bot de Discord conectado como ${this.client.user.tag}`);
      console.log(`✅ Bot listo para enviar mensajes`);
    });

    this.client.on('error', (error) => {
      console.error('Error del bot de Discord:', error);
    });
  }

  async start() {
    if (!this.token) {
      console.warn('⚠️ DISCORD_BOT_TOKEN no configurado. El bot no se iniciará.');
      return;
    }

    try {
      await this.client.login(this.token);
    } catch (error) {
      console.error('Error al iniciar el bot de Discord:', error);
    }
  }

  async sendProductNotification(product) {
    if (!this.channelId) {
      console.warn('⚠️ DISCORD_CHANNEL_ID no configurado');
      return;
    }

    // Verificar si el bot está listo (con más logging)
    console.log('🔍 Verificando estado del bot...');
    console.log('Bot isReady():', this.client.isReady());
    console.log('Bot user:', this.client.user ? this.client.user.tag : 'No user');
    
    if (!this.client.isReady()) {
      console.warn('⚠️ Bot de Discord no está listo, intentando conectar...');
      try {
        await this.start();
        // Esperar un poco para que se conecte
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Bot conectado y listo');
      } catch (error) {
        console.error('❌ Error al conectar el bot:', error);
        return;
      }
    } else {
      console.log('✅ Bot ya estaba listo');
    }

    try {
      // Usar el canal cacheado si está disponible
      let channel = this.client.channels.cache.get(this.channelId);
      
      if (!channel) {
        console.log(`🔍 Buscando canal: ${this.channelId}`);
        channel = await this.client.channels.fetch(this.channelId);
        
        if (!channel) {
          console.error('❌ No se pudo encontrar el canal de Discord');
          return;
        }
      }

      console.log(`✅ Canal encontrado: ${channel.name}`);
      
      // Enviar todo en una sola petición
      const embed = this.createProductEmbed(product);
      await channel.send({
        content: '**¡Nuevo producto agregado!**',
        embeds: [embed]
      });
      
      console.log(`✅ Notificación enviada para: ${product.name}`);
    } catch (error) {
      console.error('Error al enviar notificación de Discord:', error);
      console.error('Detalles del error:', error.message);
    }
  }

  createProductEmbed(product) {
    // Formatear el precio - puede ser número o string
    let usdPrice;
    if (typeof product.price === 'string') {
      // Si es string, extraer solo el precio en USD del formato "¥650 - ($91.00)"
      const priceMatch = product.price.match(/\(\$([^)]+)\)/);
      usdPrice = priceMatch ? `$${priceMatch[1]}` : product.price;
    } else if (typeof product.price === 'number') {
      // Si es número, formatearlo como USD
      usdPrice = `$${product.price.toFixed(2)}`;
    } else {
      // Si no es string ni número, usar un valor por defecto
      usdPrice = '$0.00';
    }
    
    const embed = new EmbedBuilder()
      .setColor('#002365')
      .setDescription(`## ${product.name}`)
      .addFields(
        { name: '💰 Precio', value: usdPrice, inline: true },
        { name: '🏷️ Marca', value: product.brand || 'N/A', inline: true }
      )
      .setTimestamp()
      .setFooter({ 
        text: 'by Moon Reps', 
        iconURL: 'https://i.imgur.com/LOAtkbX.png' 
      });

    // Agregar imagen si existe
    let imageUrls = product.imageUrls;
    
    // Si imageUrls es un string JSON, parsearlo
    if (typeof imageUrls === 'string') {
      try {
        imageUrls = JSON.parse(imageUrls);
      } catch (error) {
        console.warn('Error parsing imageUrls:', error);
        imageUrls = [];
      }
    }
    
    // Si imageUrls es un array y tiene elementos, usar la primera imagen
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      embed.setImage(imageUrls[0]);
    }

    // Agregar botón de compra si existe el enlace
    if (product.buyLink) {
      embed.addFields({
        name: '🛒 Comprar',
        value: `**[KakoBuy Link](${product.buyLink})**`,
        inline: true
      });
    }
    
    // Agregar enlace para ver todos los productos
    embed.addFields({
      name: '📋 Ver todos los productos',
      value: '**[Moon Reps](https://moonreps.vercel.app)**',
      inline: true
    });

    return embed;
  }

  async stop() {
    if (this.client) {
      await this.client.destroy();
      console.log('🤖 Bot de Discord desconectado');
    }
  }
}

// Instancia global del bot
let discordBot = null;

function getDiscordBot() {
  if (!discordBot) {
    discordBot = new DiscordBot();
  }
  return discordBot;
}

module.exports = {
  DiscordBot,
  getDiscordBot
}; 