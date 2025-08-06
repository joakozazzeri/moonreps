// pages/api/get-product-images.js
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ message: 'ID de producto requerido' });
  }

  try {
    if (!isSupabaseConfigured || !supabase) {
      return res.status(500).json({ message: 'Base de datos no configurada' });
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('imageUrls')
      .eq('id', productId)
      .single();

    if (error || !product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const imageUrls = Array.isArray(product.imageUrls) 
      ? product.imageUrls 
      : JSON.parse(product.imageUrls || '[]');

    return res.status(200).json({
      success: true,
      images: imageUrls
    });

  } catch (error) {
    console.error('Error fetching product images:', error);
    return res.status(500).json({ 
      message: 'Error al obtener imágenes del producto',
      error: error.message 
    });
  }
} 