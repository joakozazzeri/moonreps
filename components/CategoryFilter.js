// components/CategoryFilter.js
import { useRef, useState, useEffect, useMemo } from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory, products = [], allProducts = [] }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Calcular contadores de productos por categoría usando todos los productos
  const categoryCounts = useMemo(() => {
    const counts = {};
    
    // Contar productos por categoría usando allProducts (todos los productos)
    allProducts.forEach(product => {
      const category = product.category || 'Sin categoría';
      counts[category] = (counts[category] || 0) + 1;
    });
    
    // Agregar "Todos los Productos" con el total real
    counts['Todos los Productos'] = allProducts.length;
    
    return counts;
  }, [allProducts]);

  // Ordenar categorías por cantidad de productos (mantener el orden de mayor a menor)
  const sortedCategories = useMemo(() => {
    return categories.sort((a, b) => {
      // "Todos los Productos" siempre va primero
      if (a === 'Todos los Productos') return -1;
      if (b === 'Todos los Productos') return 1;
      
      // Ordenar por cantidad de productos (de mayor a menor)
      const countA = categoryCounts[a] || 0;
      const countB = categoryCounts[b] || 0;
      return countB - countA;
    });
  }, [categories, categoryCounts]);

  // Verificar si se puede hacer scroll en ambas direcciones
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Scroll hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Verificar scroll al cargar y cuando cambian las categorías
  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories]);

  // Verificar scroll cuando se hace scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => checkScrollButtons();
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative group">
      {/* Botón de navegación izquierda */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-900/90 backdrop-blur-sm border border-gray-600/30 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/90 transition-all duration-200 shadow-lg"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Contenedor de categorías con scroll */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-6 custom-scrollbar scrollbar-hide"
        style={{ 
          paddingTop: '4px', 
          paddingBottom: '4px',
          paddingLeft: canScrollLeft ? '1.5rem' : '0',
          paddingRight: canScrollRight ? '1.5rem' : '0'
        }}
      >
        {sortedCategories.map((category) => {
          const count = categoryCounts[category] || 0;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-modern whitespace-nowrap btn-modern hover-lift cursor-pointer flex-shrink-0 backdrop-blur-sm border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-brand-light/20 to-brand-light/30 text-white shadow-soft border-brand-light/40 shadow-brand-light/20'
                  : 'bg-gray-800/40 backdrop-blur-md border-gray-600/30 text-gray-300 hover:bg-brand-light/10 hover:text-white hover:border-brand-light/30 hover:shadow-brand-light/10'
              }`}
              style={{ 
                transform: 'translateZ(0)',
                fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                fontWeight: '700',
                letterSpacing: '0.025em'
              }}
            >
              <span className="flex items-center gap-2 sm:gap-3">
                {selectedCategory === category && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 icon-modern" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{category}</span>
                <span className={`px-3 py-1 text-sm font-bold rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-blue-400/60 via-purple-500/60 to-blue-600/60 text-white border-white/30 shadow-white/20' 
                    : 'bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-blue-600/40 text-white border-blue-400/20 shadow-blue-500/10'
                }`}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón de navegación derecha */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-900/90 backdrop-blur-sm border border-gray-600/30 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/90 transition-all duration-200 shadow-lg"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;
