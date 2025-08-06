// pages/api/get-more-products.js
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { page = 1, category, search } = req.query;

  try {
    if (!isSupabaseConfigured || !supabase) {
      return res.status(500).json({ message: 'Base de datos no configurada' });
    }

    const limit = 25; // 25 productos por carga
    const offset = (parseInt(page) - 1) * limit;

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Aplicar filtros si se proporcionan
    if (category && category !== 'Todos los Productos') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Error al obtener productos' });
    }

    // Procesar imágenes (solo primera imagen para reducir payload)
    const productsWithParsedImages = products.map(p => {
      try {
        const imageUrls = Array.isArray(p.imageUrls) ? p.imageUrls : JSON.parse(p.imageUrls || '[]');
        return {
          ...p,
          imageUrls: imageUrls.slice(0, 1) // Solo primera imagen
        };
      } catch (error) {
        console.error('Error parsing imageUrls for product:', p.id, error);
        return {
          ...p,
          imageUrls: []
        };
      }
    });

    return res.status(200).json({
      success: true,
      products: productsWithParsedImages,
      hasMore: products.length === limit,
      nextPage: parseInt(page) + 1
    });

  } catch (error) {
    console.error('Error in get-more-products:', error);
    return res.status(500).json({ 
      message: 'Error al obtener productos',
      error: error.message 
    });
  }
} 