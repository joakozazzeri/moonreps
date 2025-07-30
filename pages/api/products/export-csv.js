// pages/api/products/export-csv.js
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificar si Supabase está configurado
  if (!isSupabaseConfigured || !supabase) {
    return res.status(503).json({ error: 'Base de datos no configurada' });
  }

  try {
    // Obtener todos los productos de Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener productos:', error);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }

    // Crear el contenido CSV
    const csvHeaders = ['name', 'price', 'category', 'brand', 'imageUrls', 'buyLink'];
    const csvRows = [csvHeaders];

    products.forEach(product => {
      // Procesar imageUrls - si es array, convertirlo a string separado por |
      let imageUrls = '';
      if (product.imageUrls) {
        if (Array.isArray(product.imageUrls)) {
          imageUrls = product.imageUrls.join('|');
        } else {
          // Si es string, intentar parsearlo como JSON
          try {
            const parsedUrls = JSON.parse(product.imageUrls);
            if (Array.isArray(parsedUrls)) {
              imageUrls = parsedUrls.join('|');
            } else {
              imageUrls = product.imageUrls;
            }
          } catch {
            imageUrls = product.imageUrls;
          }
        }
      }

      csvRows.push([
        `"${product.name || ''}"`,
        product.price || 0,
        `"${product.category || ''}"`,
        `"${product.brand || ''}"`,
        `"${imageUrls}"`,
        `"${product.buyLink || ''}"`
      ]);
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');

    // Configurar headers para descarga
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="productos-moon-reps-${new Date().toISOString().split('T')[0]}.csv"`);
    res.setHeader('Cache-Control', 'no-cache');

    res.status(200).send(csvContent);

  } catch (error) {
    console.error('Error en exportación CSV:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
} 