// pages/api/products/delete-all.js
import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Borra todos los registros de la tabla de productos
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', 0); // Esto elimina todos los registros
    
    if (error) throw error;
    
    res.status(200).json({ message: 'All products have been deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete all products:', error);
    res.status(500).json({ error: 'Failed to delete all products.', details: error.message });
  }
}
