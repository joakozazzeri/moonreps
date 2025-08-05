// pages/api/products.js
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
const { getDiscordBot } = require('../../lib/discord-bot');

// AÑADIDO: Aumentamos el límite del tamaño del cuerpo de la petición.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Aumentamos el límite a 10 MB
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Verificar si Supabase está configurado
      if (!isSupabaseConfigured || !supabase) {
        console.warn('Supabase not configured, returning empty products array');
        return res.status(200).json([]);
      }

      // Obtener productos ordenados por fecha de creación (más recientes primero)
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Verificar que products sea un array
      if (!Array.isArray(products)) {
        console.warn('Products is not an array, returning empty array');
        return res.status(200).json([]);
      }
      
      const productsWithParsedImages = products.map(p => ({
          ...p,
          imageUrls: Array.isArray(p.imageUrls) ? p.imageUrls : JSON.parse(p.imageUrls || '[]')
      }));
      
      res.status(200).json(productsWithParsedImages);
    } catch (error) {
      console.error('GET Error:', error);
      // En lugar de devolver 500, devolvemos un array vacío para evitar errores en el frontend
      res.status(200).json([]);
    }
  } else if (req.method === 'POST') {
    const { name, price, category, brand, buyLink, imageUrls } = req.body;
    console.log('POST request body:', req.body);
    
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }
    
    // Verificar si Supabase está configurado
    if (!isSupabaseConfigured || !supabase) {
      return res.status(503).json({ message: 'Database not configured' });
    }
    
    try {
      const productData = {
        name,
        price: parseFloat(price),
        category,
        brand: brand || '',
        buyLink: buyLink || '',
        imageUrls: imageUrls
      };
      
      console.log('Attempting to insert product:', productData);
      
      const { data: newProduct, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Product created successfully:', newProduct);
      
      // Enviar notificación a Discord
      try {
        const bot = getDiscordBot();
        await bot.sendProductNotification(newProduct);
      } catch (discordError) {
        console.error('Error enviando notificación a Discord:', discordError);
        // No fallamos la respuesta si Discord falla
      }
      
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('POST Error:', error);
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
