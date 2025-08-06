// pages/api/get-qc-images.js
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Cache simple en memoria (se resetea en cada deploy)
const urlCache = new Map();

// Rate limiting básico (deshabilitado)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_MAX = 999; // prácticamente sin límite

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Rate limiting básico
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, { count: 0, resetTime: now + RATE_LIMIT_WINDOW });
  }
  
  const clientData = requestCounts.get(clientIP);
  
  // Reset counter if window has passed
  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Check rate limit
  if (clientData.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ 
      message: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  // Increment counter
  clientData.count++;

  // Timeout para evitar que la API se cuelgue
  const timeout = setTimeout(() => {
    console.log('⏰ Timeout alcanzado, cerrando API');
    res.status(408).json({ 
      success: true, 
      images: [], 
      count: 0, 
      message: 'Timeout: La operación tardó demasiado' 
    });
  }, 20000); // Reducido a 20 segundos

  let browser = null;
  
  try {
    const { url, convertedUrl, qcQuantity } = req.body;

    // Si se proporciona una URL original, convertirla primero
    let finalConvertedUrl = convertedUrl;
    let finalQcQuantity = qcQuantity;

    if (url && !convertedUrl) {
      console.log('🔄 Convirtiendo URL original:', url);
      
      // Validar que sea una URL válida
      const validDomains = ['1688.com', 'buy.com', 'kakobuy.com', 'hoobuy.com', 'taobao.com', 'ikako.vip'];
      const isValidDomain = validDomains.some(domain => url.includes(domain));
      
      if (!isValidDomain) {
        return res.status(400).json({ 
          message: 'Por favor ingresa una URL válida de 1688, buy, kakobuy, hoobuy o taobao' 
        });
      }

      // Preparar parámetros para la API GET
      const from = 'moonreps';
      const encodedUrl = encodeURIComponent(url);
      
      // Construir URL con parámetros GET
      const apiUrl = `https://api.uufinds.com/open/api/convertUrl?from=${from}&url=${encodedUrl}`;

      // Llamar a la API externa con método GET
      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        console.error('Error de la API externa:', data);
        return res.status(apiResponse.status).json({
          message: data.message || 'Error al convertir la URL',
          code: data.code
        });
      }

      // Si la API externa fue exitosa
      if (data.success) {
        finalConvertedUrl = data.result.url;
        finalQcQuantity = data.result.qcQuantity;
        console.log('✅ URL convertida exitosamente:', finalConvertedUrl);
      } else {
        return res.status(400).json({
          success: false,
          message: data.message || 'Error al procesar la URL',
          code: data.code
        });
      }
    }

    if (!finalConvertedUrl) {
      return res.status(400).json({ message: 'URL convertida es requerida' });
    }

    // Verificar cache
    const cacheKey = `qc-${finalConvertedUrl}`;
    if (urlCache.has(cacheKey)) {
      console.log('✅ Resultado encontrado en cache');
      clearTimeout(timeout);
      return res.status(200).json(urlCache.get(cacheKey));
    }

    console.log('🚀 Iniciando Puppeteer para URL:', finalConvertedUrl);

    // Iniciar Puppeteer con optimizaciones para Vercel
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    
    // Configurar el user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('📄 Navegando a la página...');
    
    // Navegar a la página con optimizaciones
    console.log('🌐 Navegando a:', finalConvertedUrl);
    await page.goto(finalConvertedUrl, { 
      waitUntil: 'domcontentloaded', // Más rápido que networkidle2
      timeout: 10000 // Reducido de 15s a 10s
    });
    
    console.log('✅ Página cargada exitosamente');

    console.log('⏳ Esperando que se carguen las imágenes...');
    
    // Esperar menos tiempo pero más eficientemente
    await new Promise(resolve => setTimeout(resolve, 1000)); // Reducido de 2s a 1s

    // Buscar imágenes dentro del div good-item-box
    console.log('🔍 Buscando imágenes en good-item-box...');
    
    // Verificar si existen los divs good-item-box
    const goodItemBoxExists = await page.evaluate(() => {
      const boxes = document.querySelectorAll('.good-item-box');
      console.log('Divs good-item-box encontrados:', boxes.length);
      return boxes.length > 0;
    });
    
    console.log('📦 ¿Existen divs good-item-box?', goodItemBoxExists);
    
    const qcImages = await page.evaluate(() => {
      const images = [];
      
      try {
        // Buscar específicamente en divs con clase good-item-box (más eficiente)
        const goodItemBoxes = document.querySelectorAll('.good-item-box');
        console.log('Encontrados divs good-item-box:', goodItemBoxes.length);
        
        goodItemBoxes.forEach((box, index) => {
          const imgElements = box.querySelectorAll('img');
          console.log(`Div ${index}: ${imgElements.length} imágenes encontradas`);
          
          imgElements.forEach(img => {
            // Verificar si la imagen está dentro de un div good-item-detail-type
            const isInDetailType = img.closest('.good-item-detail-type');
            if (isInDetailType) {
              console.log('Imagen excluida por estar en good-item-detail-type:', img.src);
              return; // Saltar esta imagen
            }
            
            const src = img.src || img.dataset.src || img.dataset.original;
            if (src && src.includes('http') && src.includes('file.uufinds.com/product')) {
              images.push(src);
              console.log('Imagen QC encontrada en good-item-box:', src);
            }
          });
        });
        
        // Si no encontramos imágenes en good-item-box, buscar solo en contenedores específicos
        if (images.length === 0) {
          console.log('Buscando en contenedores específicos de QC...');
          const qcContainers = document.querySelectorAll('[class*="qc"], [class*="quality"]');
          qcContainers.forEach(container => {
            // Verificar si el contenedor está dentro de good-item-detail-type
            const isInDetailType = container.closest('.good-item-detail-type');
            if (isInDetailType) {
              console.log('Contenedor excluido por estar en good-item-detail-type');
              return; // Saltar este contenedor
            }
            
            const imgElements = container.querySelectorAll('img');
            imgElements.forEach(img => {
              const src = img.src || img.dataset.src || img.dataset.original;
              if (src && src.includes('http') && src.includes('file.uufinds.com/product') && !images.includes(src)) {
                images.push(src);
                console.log('Imagen QC encontrada en contenedor específico:', src);
              }
            });
          });
        }
        
        // Solo como último recurso, buscar en toda la página
        if (images.length === 0) {
          console.log('Buscando imágenes de UUFinds en toda la página...');
          const allImages = document.querySelectorAll('img');
          allImages.forEach(img => {
            // Verificar si la imagen está dentro de un div good-item-detail-type
            const isInDetailType = img.closest('.good-item-detail-type');
            if (isInDetailType) {
              console.log('Imagen excluida por estar en good-item-detail-type:', img.src);
              return; // Saltar esta imagen
            }
            
            const src = img.src || img.dataset.src || img.dataset.original;
            if (src && src.includes('http') && src.includes('file.uufinds.com/product') && !images.includes(src)) {
              images.push(src);
              console.log('Imagen QC encontrada en toda la página:', src);
            }
          });
        }
        
      } catch (error) {
        console.error('Error en la evaluación de la página:', error);
      }
      
      return images;
    });

    console.log('✅ Imágenes encontradas con Puppeteer:', qcImages.length);
    console.log('🖼️ URLs de imágenes QC:', qcImages);

    await browser.close();

    // Filtrar y procesar las imágenes encontradas
    console.log('🎯 Total de imágenes encontradas con Puppeteer:', qcImages.length);
    
    // Filtrar directamente imágenes de UUFinds (más eficiente)
    const processedImages = qcImages
      .filter(imgUrl => 
        imgUrl && 
        imgUrl.includes('http') && 
        !imgUrl.includes('data:') && 
        imgUrl.includes('file.uufinds.com/product')
      )
      .slice(0, Math.min(finalQcQuantity || 12, 12));
      
    console.log('✅ Imágenes filtradas de file.uufinds.com/product:', processedImages.length);

    // Guardar en cache
    const result = {
      success: true,
      images: processedImages,
      count: processedImages.length,
      convertedUrl: finalConvertedUrl,
      qcQuantity: finalQcQuantity,
      message: processedImages.length > 0 && processedImages[0].includes('file.uufinds.com/product') 
        ? 'Imágenes de QC de UUFinds obtenidas exitosamente'
        : 'No se encontraron imágenes de QC de UUFinds'
    };
    
    urlCache.set(cacheKey, result);
    console.log('💾 Resultado guardado en cache');
    
    clearTimeout(timeout);
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('❌ Error obteniendo imágenes QC:', error);
    
    // Asegurar que el navegador se cierre en caso de error
    try {
      if (browser) {
        await browser.close();
      }
    } catch (closeError) {
      console.error('Error cerrando navegador:', closeError);
    }
    
    clearTimeout(timeout);
    
    return res.status(200).json({
      success: true,
      images: [],
      count: 0,
      message: 'No se pudieron obtener imágenes QC para este producto',
      error: error.message
    });
  }
} 