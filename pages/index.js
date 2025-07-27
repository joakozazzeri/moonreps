// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';

export default function Home({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  // Estado para el Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextLightboxImage = () => setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  const prevLightboxImage = () => setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));

  useEffect(() => {
    let filtered = [...initialProducts];

    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProducts(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
  }, [searchTerm, selectedCategory, initialProducts]);

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba cuando cambia de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Head>
        <title>Moon Reps - Spreadsheet</title>
        <meta name="description" content="Ecommerce store built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Repse Logo" width={160} height={64} className="object-contain hover:scale-105 transition-transform duration-200" />
            
            {/* Botón Kakobuy */}
            <a 
              href="https://ikako.vip/r/moonreps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
            >
              <Image 
                src="/kakobuy-logo.png" 
                alt="Kakobuy Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
              <span className="text-base font-semibold">¡Regístrate en Kakobuy y recibe +$410 en cupones!</span>
            </a>

            {/* Botón Discord */}
            <a 
              href="https://discord.gg/moonreps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-base font-semibold">Únete al Discord</span>
            </a>
          </div>

          <div className="flex items-center">
            {/* Botón Productos */}
            <button className="flex items-center gap-3 px-5 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-base font-semibold">Productos</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 spacing-modern">
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-bold text-modern mb-3">
            <span className="text-white">Bienvenido al Spreadsheet de </span>
            <span className="text-blue-400">Moon Reps</span>
          </h1>
          <p className="text-gray-400 text-subtitle">Encuentra los mejores productos con calidad garantizada</p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="my-10">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-400 text-lg">
            Mostrando {currentProducts.length} de {products.length} productos
            {totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-sm font-medium text-subtitle">Catálogo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {currentProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onImageClick={openLightbox}
              priority={index < 5}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto mb-6 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-3 text-modern">No se encontraron productos</h3>
            <p className="text-gray-500 text-lg">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 cursor-pointer bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all duration-200 icon-modern"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button 
                className="absolute left-6 sm:left-10 text-white text-4xl hover:text-gray-300 p-3 cursor-pointer bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200 icon-modern"
                onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-6 sm:right-10 text-white text-4xl hover:text-gray-300 p-3 cursor-pointer bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200 icon-modern"
                onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={lightboxImages[lightboxIndex]}
              alt="Lightbox image"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Obtener productos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (productsError) throw productsError;
    
    // Obtener categorías únicas
    const { data: categoriesResult, error: categoriesError } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null)
      .neq('category', '');
    
    if (categoriesError) throw categoriesError;
    
    const uniqueCategories = [...new Set(categoriesResult.map(c => c.category))];
    const categories = ['All Products', ...uniqueCategories];
    
    const productsWithParsedImages = products.map(p => ({
        ...p,
        imageUrls: JSON.parse(p.imageUrls || '[]')
    }));

    return {
      props: {
        initialProducts: productsWithParsedImages,
        categories,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialProducts: [],
        categories: ['All Products'],
      },
    };
  }
}
