import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function QC() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qcImages, setQcImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Handle URL from query params
  useEffect(() => {
    if (router.query.url) {
      const decodedUrl = decodeURIComponent(router.query.url);
      setUrl(decodedUrl);
      if (decodedUrl.trim()) {
        handleAutoSubmit(decodedUrl);
      }
    }
  }, [router.query.url]);

  const handleAutoSubmit = async (submitUrl) => {
    // Simular carga ya que no tenemos backend real de QC configurado
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Mock result
      // En producción esto llamaría a una API real
      setLoading(false);
      // Simular error o éxito según URL (para demo)
      if (submitUrl.includes('error')) {
        setError('No se pudieron encontrar fotos QC para este producto de momento.');
      } else {
        // Mock images
        setQcImages([
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
          'https://images.unsplash.com/photo-1552346154-21d32810aba3'
        ]);
      }
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    handleAutoSubmit(url);
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % qcImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + qcImages.length) % qcImages.length);
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
      <Head>
        <title>QC Finder - Moon Reps</title>
        <meta name="description" content="Busca fotos de control de calidad (QC) de productos antes de comprar." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            QC <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Finder</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Verifica la calidad de los productos antes de comprarlos. Pega el enlace de Taobao, Weidian o 1688.
          </p>
        </div>

        {/* Búsqueda */}
        <div className="bg-surface-900 border border-surface-800 rounded-3xl p-8 shadow-2xl mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://weidian.com/item.html?itemID=..."
                className="input flex-grow p-4 text-lg"
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="btn btn-primary px-8 py-4 text-lg font-semibold min-w-[140px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="absolute -bottom-8 left-0 text-rose-500 text-sm animate-fadeIn">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* Resultados */}
        {qcImages.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-white">Fotos Disponibles ({qcImages.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {qcImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal(idx)}
                  className="aspect-square bg-surface-800 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all group relative"
                >
                  <Image
                    src={img}
                    alt={`QC Image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Lightbox */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center" onClick={closeModal}>
          <div className="relative max-w-5xl max-h-[90vh] w-full p-4 flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded-full"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-primary-600 transition-colors z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full h-[80vh]">
              <Image
                src={qcImages[currentImageIndex]}
                alt="QC Fullscreen"
                fill
                className="object-contain"
                quality={100}
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-primary-600 transition-colors z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {qcImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    notFound: true
  };
}
