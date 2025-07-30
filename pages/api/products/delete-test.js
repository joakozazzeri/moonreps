// pages/api/products/delete-test.js
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end('Method Not Allowed');
  }

  // Verificar si Supabase está configurado
  if (!isSupabaseConfigured || !supabase) {
    return res.status(503).json({ error: 'Base de datos no configurada' });
  }

  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Se requieren IDs de productos válidos' });
    }

    // Borrar los productos específicos
    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', productIds);

    if (error) {
      console.error('Error al borrar productos de prueba:', error);
      return res.status(500).json({ error: 'Error al borrar productos de prueba' });
    }

    res.status(200).json({ 
      message: 'Productos de prueba borrados correctamente',
      deletedCount: productIds.length
    });

  } catch (error) {
    console.error('Error en delete-test:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
} 