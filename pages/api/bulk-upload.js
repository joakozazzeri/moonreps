// pages/api/bulk-upload.js
import Papa from 'papaparse';
import { v2 as cloudinary } from 'cloudinary';
import { supabase } from '../../lib/supabase';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const csvData = req.body;
    if (!csvData) {
      return res.status(400).json({ error: 'No CSV data provided.' });
    }

    const parsed = Papa.parse(csvData, { header: true });
    const products = parsed.data;

    if (!products || products.length === 0) {
        return res.status(400).json({ error: 'CSV is empty or invalid.' });
    }

    let productsAdded = 0;
    const productsToInsert = [];

    for (const product of products) {
        if (product.name && product.price && product.category) {
            
            const originalImageUrls = product.imageUrls ? product.imageUrls.split('|').map(url => url.trim()) : [];
            const cloudinaryUrls = [];

            for (const imageUrl of originalImageUrls) {
                try {
                    const result = await cloudinary.uploader.upload(imageUrl, {
                        folder: 'repse-ecommerce-bulk',
                        transformation: [
                            { width: 1080, height: 1080, crop: "limit" },
                            { quality: "auto" },
                            { fetch_format: "auto" }
                        ]
                    });
                    cloudinaryUrls.push(result.secure_url);
                } catch (uploadError) {
                    console.error(`Failed to upload image ${imageUrl} to Cloudinary:`, uploadError);
                }
            }

            const imageUrlsJson = JSON.stringify(cloudinaryUrls);

            productsToInsert.push({
                name: product.name,
                price: parseFloat(product.price),
                category: product.category,
                brand: product.brand || '',
                imageUrls: imageUrlsJson,
                buyLink: product.buyLink || ''
            });
        }
    }

    if (productsToInsert.length > 0) {
        const { error } = await supabase
            .from('products')
            .insert(productsToInsert);
        
        if (error) throw error;
        productsAdded = productsToInsert.length;
    }

    res.status(200).json({ message: `${productsAdded} products processed and added successfully!` });

  } catch (error) {
    console.error('Bulk upload failed:', error);
    res.status(500).json({ error: 'Failed to process CSV file.', details: error.message });
  }
}
