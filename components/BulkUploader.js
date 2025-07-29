// components/BulkUploader.js
import { useState, useRef } from 'react';

const BulkUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [skipImages, setSkipImages] = useState(false);
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
        ...(skipImages && { 'x-skip-images': 'true' })
      };

      const res = await fetch('/api/bulk-upload', {
        method: 'POST',
        headers,
        body: csvData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setProgress(`Proceso completado: ${data.totalProcessed} de ${data.totalInCsv} productos procesados${data.imagesSkipped ? ' (sin imágenes)' : ''}`);
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Carga Masiva de Productos</h2>
      <p className="text-gray-400 mb-4">
        Sube un archivo CSV para agregar múltiples productos a la vez. Separa las URLs de imágenes con el carácter pipe (|).
        <br />
        <span className="text-yellow-400 text-sm">Nota: Para archivos grandes, el proceso puede tardar hasta 60 segundos.</span>
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
          <span>Saltar procesamiento de imágenes (más rápido)</span>
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
    </div>
  );
};

export default BulkUploader;
