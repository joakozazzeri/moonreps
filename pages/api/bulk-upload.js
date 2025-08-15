// pages/api/bulk-upload.js
import Papa from 'papaparse';
import { v2 as cloudinary } from 'cloudinary';
import { supabase } from '../../lib/supabase';
const { getDiscordBot } = require('../../lib/discord-bot');

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

// Función para subir imagen a Cloudinary con timeout
const uploadImageToCloudinary = async (imageUrl, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Image upload timeout'));
    }, timeout);

    cloudinary.uploader.upload(imageUrl, {
      folder: 'repse-ecommerce-bulk',
      transformation: [
        { width: 1080, height: 1080, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    })
    .then(result => {
      clearTimeout(timeoutId);
      resolve(result.secure_url);
    })
    .catch(error => {
      clearTimeout(timeoutId);
      reject(error);
    });
  });
};

// Función para procesar imágenes de forma asíncrona con límite de concurrencia
const processImagesAsync = async (imageUrls, maxConcurrency = 3) => {
  const results = [];
  const chunks = [];
  
  // Dividir las URLs en chunks para procesar en paralelo
  for (let i = 0; i < imageUrls.length; i += maxConcurrency) {
    chunks.push(imageUrls.slice(i, i + maxConcurrency));
  }

  for (const chunk of chunks) {
    const chunkPromises = chunk.map(async (imageUrl) => {
      try {
        const cloudinaryUrl = await uploadImageToCloudinary(imageUrl);
        return cloudinaryUrl;
      } catch (error) {
        console.error(`Failed to upload image ${imageUrl} to Cloudinary:`, error);
        return null; // Retornar null para imágenes que fallan
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults.filter(url => url !== null));
  }

  return results;
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
    const batchSize = 5; // Procesar 5 productos a la vez
    const totalProducts = products.length;
    const skipImages = req.headers['x-skip-images'] === 'true'; // Opción para saltar imágenes
    const testMode = req.headers['x-test-mode'] === 'true'; // Modo de prueba
    const testProducts = []; // Array para productos de prueba

    // Procesar productos en lotes
    for (let i = 0; i < totalProducts; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchProducts = [];

      // Procesar cada producto en el lote
      for (const product of batch) {
        if (product.name && product.price && product.category) {
          try {
            let imageUrlsJson = '[]';
            
            if (product.imageUrls) {
              // Limpiar las URLs de corchetes y comillas si están presentes
              let cleanImageUrls = product.imageUrls;
              
              // Remover corchetes del inicio y final si están presentes
              if (cleanImageUrls.startsWith('[') && cleanImageUrls.endsWith(']')) {
                cleanImageUrls = cleanImageUrls.slice(1, -1);
              }
              
              // Remover comillas dobles si están presentes
              cleanImageUrls = cleanImageUrls.replace(/"/g, '');
              
              if (skipImages) {
                // Cuando se salta el procesamiento, usar las URLs directamente (asumiendo que ya son de Cloudinary)
                const cloudinaryUrls = cleanImageUrls.split('|').map(url => url.trim()).filter(url => url);
                imageUrlsJson = JSON.stringify(cloudinaryUrls);
              } else {
                // Procesar imágenes normalmente
                const originalImageUrls = cleanImageUrls.split('|').map(url => url.trim()).filter(url => url);
                
                // Procesar imágenes de forma asíncrona
                const cloudinaryUrls = await processImagesAsync(originalImageUrls);
                imageUrlsJson = JSON.stringify(cloudinaryUrls);
              }
            }

            // Validar y procesar el precio
            let processedPrice = parseFloat(product.price);
            if (isNaN(processedPrice) || processedPrice < 0) {
              console.warn(`Producto "${product.name}" tiene precio inválido: "${product.price}". Saltando producto.`);
              continue; // Saltar este producto
            }

            const productData = {
              name: product.name,
              price: processedPrice,
              category: product.category,
              brand: product.brand || '',
              imageUrls: imageUrlsJson,
              buyLink: product.buyLink || ''
            };

            if (testMode) {
              // En modo de prueba, agregar a la lista de productos de prueba con ID temporal
              testProducts.push({
                ...productData,
                id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // ID temporal
              });
            } else {
              // En modo normal, agregar al lote para insertar
              batchProducts.push(productData);
            }
          } catch (error) {
            console.error(`Error processing product ${product.name}:`, error);
            // Continuar con el siguiente producto si hay error
          }
        }
      }

      // Insertar el lote en la base de datos solo si no es modo de prueba
      if (!testMode && batchProducts.length > 0) {
        try {
          const { data: insertedProducts, error } = await supabase
            .from('products')
            .insert(batchProducts)
            .select();
          
          if (error) {
            console.error('Database insert error:', error);
            throw error;
          }
          
          // Enviar notificaciones de Discord para los productos insertados
          try {
            const bot = getDiscordBot();
            for (const product of insertedProducts) {
              await bot.sendProductNotification(product);
              // Pequeña pausa entre notificaciones para evitar rate limits
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (discordError) {
            console.error('Error enviando notificaciones a Discord:', discordError);
            // No fallamos la respuesta si Discord falla
          }
          
          productsAdded += batchProducts.length;
        } catch (error) {
          console.error('Failed to insert batch:', error);
          // Continuar con el siguiente lote
        }
      } else if (testMode) {
        // En modo de prueba, simular la inserción
        productsAdded += batch.length; // Solo contar los productos del lote actual
      }
    }

    if (testMode) {
      res.status(200).json({ 
        message: `Modo de prueba: ${productsAdded} productos procesados correctamente.`,
        totalProcessed: productsAdded,
        totalInCsv: totalProducts,
        imagesSkipped: skipImages,
        testProducts: testProducts // Devolver los productos de prueba para mostrar en la UI
      });
    } else {
      res.status(200).json({ 
        message: `${productsAdded} products processed and added successfully!`,
        totalProcessed: productsAdded,
        totalInCsv: totalProducts,
        imagesSkipped: skipImages
      });
    }

  } catch (error) {
    console.error('Bulk upload failed:', error);
    res.status(500).json({ error: 'Failed to process CSV file.', details: error.message });
  }
}
