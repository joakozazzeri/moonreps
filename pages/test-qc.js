// pages/test-qc.js
import { useState } from 'react';
import Head from 'next/head';

export default function TestQC() {
  const [url, setUrl] = useState('https://www.uufinds.com/goodItemDetail/qc/1857332861373353987');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [images, setImages] = useState([]);

  const handleTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDebugInfo(null);
    setImages([]);

    try {
      const response = await fetch('/api/test-qc-scraping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (data.success) {
        setDebugInfo(data.debug);
        setImages(data.images);
      } else {
        setDebugInfo({ error: data.message });
      }
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <Head>
        <title>Test QC Scraping</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🔍 Test de Scraping QC</h1>

        <form onSubmit={handleTest} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">URL para probar:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="https://www.uufinds.com/goodItemDetail/qc/..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg"
          >
            {loading ? 'Probando...' : 'Probar Scraping'}
          </button>
        </form>

        {debugInfo && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">📊 Información de Debug</h2>
            
            {debugInfo.error ? (
              <div className="text-red-400">
                <strong>Error:</strong> {debugInfo.error}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <strong>Longitud del HTML:</strong> {debugInfo.htmlLength}
                </div>
                <div>
                  <strong>Divs good-item-box encontrados:</strong> {debugInfo.goodItemBoxCount}
                </div>
                <div>
                  <strong>Total de imágenes encontradas:</strong> {debugInfo.totalImagesFound}
                </div>
                <div>
                  <strong>URL base:</strong> {debugInfo.baseUrl}
                </div>
                {debugInfo.sampleImages && debugInfo.sampleImages.length > 0 && (
                  <div>
                    <strong>Muestras de imágenes:</strong>
                    <ul className="mt-2 space-y-1">
                      {debugInfo.sampleImages.map((img, index) => (
                        <li key={index} className="text-sm text-gray-300 break-all">
                          {img}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {images.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🖼️ Imágenes Encontradas ({images.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <img
                    src={image}
                    alt={`Test Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-red-400 text-sm">❌ Error cargando imagen</div>
                  <p className="text-xs text-gray-300 break-all mt-2">{image}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 