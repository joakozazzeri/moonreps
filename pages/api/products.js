// pages/api/products.js
import { supabase } from '../../lib/supabase';

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
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      const productsWithParsedImages = products.map(p => ({
          ...p,
          imageUrls: JSON.parse(p.imageUrls || '[]')
      }));
      res.status(200).json(productsWithParsedImages);
    } catch (error) {
      console.error('GET Error:', error);
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { name, price, category, brand, buyLink, imageUrls } = req.body;
    console.log('POST request body:', req.body);
    
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
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
