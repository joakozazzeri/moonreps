// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import WelcomePopup from '../components/WelcomePopup';

export default function Home({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos los Productos');
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

    if (selectedCategory !== 'Todos los Productos') {
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
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Popup de bienvenida */}
      <WelcomePopup />
      
      {/* Diseño minimalista del fondo general */}
      <div className="absolute inset-0 opacity-8">
        {/* Patrón de puntos sutiles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500/40 rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-blue-500/25 rounded-full"></div>
        
        <div className="absolute top-32 left-1/5 w-1 h-1 bg-purple-500/35 rounded-full"></div>
        <div className="absolute top-48 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-64 left-2/3 w-1 h-1 bg-purple-400/40 rounded-full"></div>
        <div className="absolute top-80 right-1/2 w-2 h-2 bg-blue-500/20 rounded-full"></div>
        
        {/* Puntos adicionales para más densidad */}
        <div className="absolute top-120 left-1/6 w-1 h-1 bg-blue-500/25 rounded-full"></div>
        <div className="absolute top-140 right-1/5 w-1.5 h-1.5 bg-purple-500/30 rounded-full"></div>
        <div className="absolute top-160 left-4/5 w-1 h-1 bg-blue-400/35 rounded-full"></div>
        
        {/* Líneas horizontales sutiles */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"></div>
        
        {/* Líneas verticales sutiles */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-blue-400/15 to-transparent"></div>
        
        {/* Círculos grandes y difuminados para profundidad */}
        <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      <Head>
        <title>Moon Reps - Spreadsheet</title>
        <meta name="description" content="Ecommerce store built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo - siempre visible */}
          <div className="flex items-center">
            <Image src="/logo.png" alt="Repse Logo" width={120} height={48} className="object-contain hover:scale-105 transition-transform duration-200 sm:w-40" />
          </div>

          {/* Botones - ocultos en móvil, visibles en desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Botón Kakobuy */}
            <a 
              href="https://ikako.vip/r/moonreps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
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
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-base font-semibold">Únete al Discord</span>
            </a>
          </div>

          <div className="flex items-center">
            {/* Botón Productos - más pequeño en móvil */}
            <button className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-sm sm:text-base font-semibold hidden sm:inline">Productos</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 spacing-modern">
        {/* Botones promocionales para móvil */}
        <div className="lg:hidden mb-6 space-y-3 relative z-10">
          <a 
            href="https://ikako.vip/r/moonreps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer text-sm relative z-10 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://ikako.vip/r/moonreps', '_blank');
            }}
          >
            <Image 
              src="/kakobuy-logo.png" 
              alt="Kakobuy Logo" 
              width={20} 
              height={20} 
              className="w-5 h-5 object-contain pointer-events-none"
            />
            <span className="font-semibold pointer-events-none">¡Regístrate en Kakobuy y recibe +$410 en cupones!</span>
          </a>

          <a 
            href="https://discord.gg/moonreps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer text-sm relative z-10 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://discord.gg/moonreps', '_blank');
            }}
          >
            <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="font-semibold pointer-events-none">Únete al Discord</span>
          </a>
        </div>

        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-modern mb-3">
            <span className="text-white">Bienvenido al Spreadsheet de </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(59,130,246,0.8)] drop-shadow-[0_0_4px_rgba(59,130,246,0.6)] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">Moon Reps</span>
          </h1>
          <p className="text-gray-400 text-subtitle text-sm sm:text-base">Encuentra los mejores productos con calidad garantizada</p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        />
        
        <div className="my-6 sm:my-10">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-10 gap-2">
          <p className="text-gray-400 text-base sm:text-lg text-center sm:text-left">
            Mostrando {currentProducts.length} de {products.length} productos
            {totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
          </p>
          <div className="flex items-center justify-center sm:justify-end gap-2 text-gray-400">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-subtitle">Catálogo</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {currentProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
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
    const { supabase, isSupabaseConfigured } = require('../lib/supabase');
    
    // Si Supabase no está configurado, devolver datos vacíos
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured, returning empty data');
      return {
        props: {
          initialProducts: [],
          categories: ['Todos los Productos'],
        },
      };
    }
    
    // Obtener productos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (productsError) {
      console.error('Error fetching products:', productsError);
      return {
        props: {
          initialProducts: [],
          categories: ['Todos los Productos'],
        },
      };
    }
    
    // Verificar que products sea un array
    if (!Array.isArray(products)) {
      console.warn('Products is not an array');
      return {
        props: {
          initialProducts: [],
          categories: ['Todos los Productos'],
        },
      };
    }
    
    // Obtener categorías únicas
    const { data: categoriesResult, error: categoriesError } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null)
      .neq('category', '');
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return {
        props: {
          initialProducts: [],
          categories: ['Todos los Productos'],
        },
      };
    }
    
    const uniqueCategories = [...new Set(categoriesResult.map(c => c.category))];
    const categories = ['Todos los Productos', ...uniqueCategories];
    
    const productsWithParsedImages = products.map(p => {
      try {
        return {
          ...p,
          imageUrls: Array.isArray(p.imageUrls) ? p.imageUrls : JSON.parse(p.imageUrls || '[]')
        };
      } catch (error) {
        console.error('Error parsing imageUrls for product:', p.id, error);
        return {
          ...p,
          imageUrls: []
        };
      }
    });

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
        categories: ['Todos los Productos'],
      },
    };
  }
}
