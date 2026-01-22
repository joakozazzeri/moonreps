// components/BulkUploader.js
import { useState, useRef } from 'react';
import Image from 'next/image';

const BulkUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [skipImages, setSkipImages] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testProducts, setTestProducts] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setMessage('');
    setProgress('');
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }
    setIsUploading(true);
    setMessage('Procesando archivo CSV...');
    setProgress('Iniciando carga masiva...');

    try {
      const csvData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            resolve(e.target.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsText(file);
      });

      setProgress('Subiendo productos a la base de datos...');

      const headers = {
        'Content-Type': 'text/plain',
        ...(skipImages && { 'x-skip-images': 'true' }),
        ...(testMode && { 'x-test-mode': 'true' })
      };

      const res = await fetch('/api/bulk-upload', {
        method: 'POST',
        headers,
        body: csvData,
      });

      const data = await res.json();
      if (res.ok) {
        if (testMode) {
          setTestProducts(data.testProducts || []);
          setMessage(`✅ Modo de prueba: ${data.totalProcessed} productos cargados correctamente. Revisa los productos abajo y luego bórralos.`);
          setProgress(`Productos de prueba cargados: ${data.totalProcessed} de ${data.totalInCsv}`);
        } else {
          setMessage(data.message);
          setProgress(`Proceso completado: ${data.totalProcessed} de ${data.totalInCsv} productos procesados${data.imagesSkipped ? ' (usando URLs finales directamente)' : ''}`);
        }
      } else {
        if (data.error && data.error.includes('timeout')) {
          setMessage('Error: La operación tardó demasiado tiempo. Intenta con menos productos o activa la opción "Saltar imágenes".');
        } else {
          setMessage(`Error: ${data.error}`);
        }
        setProgress('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.message.includes('timeout') || error.name === 'TimeoutError') {
        setMessage('Error: La operación tardó demasiado tiempo. Intenta con menos productos o activa la opción "Saltar imágenes".');
      } else {
        setMessage(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
      setProgress('');
    } finally {
      setIsUploading(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset file input
      }
    }
  };

  // --- INICIO DE LA MODIFICACIÓN ---
  const downloadTemplate = () => {
    // Se añade la columna 'brand' a los encabezados y al ejemplo
    const headers = "name,price,category,brand,imageUrls,buyLink";
    const exampleRow = "Example T-Shirt,49.99,Tees,Nike,https://example.com/image1.jpg|https://example.com/image2.jpg,https://example.com/buy-link";
    const content = `${headers}\n${exampleRow}`;
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'product_template.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  // --- FIN DE LA MODIFICACIÓN ---

  const handleDeleteTestProducts = () => {
    if (testProducts.length === 0) {
      setMessage('No hay productos de prueba para borrar.');
      return;
    }

    // En modo de prueba, simplemente limpiar la lista (no hay productos reales en la BD)
    setMessage(`✅ Productos de prueba eliminados de la vista: ${testProducts.length} productos.`);
    setTestProducts([]);
    setProgress('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Carga Masiva de Productos</h2>
      <p className="text-gray-400 mb-4">
        Sube un archivo CSV para agregar múltiples productos a la vez. Separa las URLs de imágenes con el carácter pipe (|).
        <br />
        <span className="text-yellow-400 text-sm">Nota: Para archivos grandes, el proceso puede tardar hasta 60 segundos.</span>
        <br />
        <span className="text-blue-400 text-sm">💡 Con &quot;Saltar imágenes&quot; activado, puedes usar URLs finales directamente.</span>
        <br />
        <span className="text-yellow-400 text-sm">🧪 Modo de prueba: Revisa productos antes de guardarlos definitivamente.</span>
      </p>
      
      <div className="flex items-center space-x-4 mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Procesando...' : 'Subir Archivo'}
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={skipImages}
            onChange={(e) => setSkipImages(e.target.checked)}
            className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
          />
          <span>Usar URLs finales directamente (más rápido)</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-yellow-300">
          <input
            type="checkbox"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            className="rounded border-gray-600 bg-gray-700 text-yellow-600 focus:ring-yellow-500"
          />
          <span>Modo de prueba (cargar y revisar antes de guardar)</span>
        </label>
      </div>

      <div className="mt-4">
        <button onClick={downloadTemplate} className="text-sm text-blue-400 hover:underline">
          Descargar Plantilla
        </button>
      </div>
      
      {progress && (
        <div className="mt-4 p-3 bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-200">{progress}</p>
        </div>
      )}
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('Error') ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* Sección de productos de prueba */}
      {testMode && testProducts.length > 0 && (
        <div className="mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-yellow-300">Productos de Prueba Cargados</h3>
            <button
              onClick={handleDeleteTestProducts}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold transition-colors text-sm"
            >
              Limpiar Vista de Prueba
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {testProducts.map((product, index) => (
              <div key={product.id || index} className="bg-gray-800/50 rounded-lg p-3 border border-yellow-500/20">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{product.name}</h4>
                    <p className="text-sm text-gray-300">Marca: {product.brand}</p>
                    <p className="text-sm text-gray-300">Categoría: {product.category}</p>
                    <p className="text-sm text-green-400">Precio: ${product.price}</p>
                    {product.buyLink && (
                      <p className="text-sm text-blue-400">Link: {product.buyLink}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 ml-4">
                    ID: {product.id}
                  </div>
                </div>
                {product.imageUrls && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Imágenes ({JSON.parse(product.imageUrls).length}):</p>
                    <div className="flex gap-2 flex-wrap">
                      {JSON.parse(product.imageUrls).map((url, imgIndex) => (
                        <Image 
                          key={imgIndex} 
                          src={url} 
                          alt={`Imagen ${imgIndex + 1}`}
                          width={48}
                          height={48}
                          className="object-cover rounded border border-gray-600"
                          unoptimized={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUploader;
