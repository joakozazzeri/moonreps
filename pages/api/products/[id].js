// pages/api/products/[id].js
import { supabase } from '../../../lib/supabase';

// AÑADIDO: Aumentamos el límite del tamaño del cuerpo de la petición.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Aumentamos el límite a 10 MB
    },
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, price, category, brand, buyLink, imageUrls } = req.body;
    try {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update({
          name,
          price: parseFloat(price),
          category,
          brand: brand || '',
          buyLink: buyLink || '',
          imageUrls: imageUrls
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      res.status(204).end(); // No Content
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
