require('dotenv').config({ path: '.env.local' });
const { getDiscordBot } = require('../lib/discord-bot');

async function startBot() {
  console.log('🚀 Iniciando bot de Discord...');
  
  const bot = getDiscordBot();
  await bot.start();
  
  // Mantener el proceso vivo
  process.on('SIGINT', async () => {
    console.log('\n🛑 Deteniendo bot de Discord...');
    await bot.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('\n🛑 Deteniendo bot de Discord...');
    await bot.stop();
    process.exit(0);
  });
}

startBot().catch(console.error); 