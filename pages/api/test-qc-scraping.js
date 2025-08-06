// pages/api/test-qc-scraping.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ message: 'URL es requerida' });
    }

    console.log('🔍 Probando scraping de URL:', url);

    // Hacer la petición a la URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('📄 HTML obtenido, longitud:', html.length);

    // Buscar el div good-item-box
    const goodItemBoxPattern = /<div[^>]*class="[^"]*good-item-box[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    const goodItemBoxMatches = html.match(goodItemBoxPattern);
    
    console.log('🎯 Divs good-item-box encontrados:', goodItemBoxMatches ? goodItemBoxMatches.length : 0);

    let qcImages = [];
    
    if (goodItemBoxMatches) {
      console.log('📦 Contenido del primer good-item-box:', goodItemBoxMatches[0].substring(0, 500));
      
      // Buscar todas las imágenes en el HTML
      const allImagePattern = /<img[^>]*src="([^"]*)"[^>]*>/gi;
      const allImages = html.match(allImagePattern);
      
      console.log('🖼️ Total de imágenes encontradas en HTML:', allImages ? allImages.length : 0);
      
      if (allImages) {
        // Extraer URLs de imágenes
        for (let i = 1; i < allImages.length; i += 2) {
          const imageUrl = allImages[i];
          if (imageUrl && !qcImages.includes(imageUrl)) {
            qcImages.push(imageUrl);
          }
        }
      }
    }

    // Procesar URLs para hacerlas absolutas
    const baseUrl = new URL(url);
    qcImages = qcImages.map(imgUrl => {
      if (imgUrl.startsWith('http')) {
        return imgUrl;
      } else if (imgUrl.startsWith('/')) {
        return `${baseUrl.protocol}//${baseUrl.host}${imgUrl}`;
      } else {
        return `${baseUrl.protocol}//${baseUrl.host}/${imgUrl}`;
      }
    });

    // Filtrar imágenes válidas
    qcImages = qcImages
      .filter(imgUrl => imgUrl.includes('http') && !imgUrl.includes('data:'))
      .slice(0, 10); // Mostrar solo las primeras 10 para debug

    console.log('✅ Imágenes procesadas:', qcImages.length);
    console.log('🖼️ URLs de imágenes:', qcImages);

    return res.status(200).json({
      success: true,
      debug: {
        htmlLength: html.length,
        goodItemBoxCount: goodItemBoxMatches ? goodItemBoxMatches.length : 0,
        totalImagesFound: qcImages.length,
        sampleImages: qcImages.slice(0, 5),
        baseUrl: baseUrl.toString()
      },
      images: qcImages,
      message: 'Análisis de scraping completado'
    });

  } catch (error) {
    console.error('❌ Error en test de scraping:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error durante el análisis de scraping'
    });
  }
} 