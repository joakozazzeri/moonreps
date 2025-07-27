// components/CategoryFilter.js
import { useRef, useState, useEffect } from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-md font-semibold rounded-soft whitespace-nowrap btn-modern hover-lift cursor-pointer flex-shrink-0 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-soft'
                : 'bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 text-gray-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50'
            }`}
            style={{ transform: 'translateZ(0)' }}
          >
            <span className="flex items-center gap-1 sm:gap-2">
              {selectedCategory === category && (
                <svg className="w-3 h-3 sm:w-4 sm:h-4 icon-modern" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {category}
            </span>
          </button>
        ))}
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
