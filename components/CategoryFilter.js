import { useRef, useEffect, useMemo, useState } from 'react';

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory, products, allProducts }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Calcular conteos de productos por categoría
  const categoryCounts = useMemo(() => {
    const counts = {};
    if (!allProducts) return counts;

    // Inicializar conteos
    categories.forEach(cat => counts[cat] = 0);

    // Contar productos (usando la lista original completa para los números)
    allProducts.forEach(product => {
      const cat = product.category || 'Sin categoría';
      // Incrementar conteo de la categoría específica
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
      // Incrementar conteo de "Todos los Productos"
      if (counts['Todos los Productos'] !== undefined) {
        counts['Todos los Productos']++;
      }
    });

    return counts;
  }, [allProducts, categories]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const raf = requestAnimationFrame(checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group w-full">
      {/* Flecha Izquierda */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm border border-surface-700/50 rounded-full shadow-lg text-zinc-400 hover:text-white transition-all opacity-100 sm:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Contenedor de Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="w-full overflow-x-auto pb-6 scrollbar-hide px-1"
      >
        <div className="inline-flex gap-2 sm:gap-3 lg:gap-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                flex items-center gap-2 px-4 py-2 lg:px-3.5 lg:py-2 rounded-xl text-sm lg:text-sm font-medium whitespace-nowrap transition-all duration-200 border
                ${selectedCategory === category
                  ? 'bg-primary-500 text-white border-primary-400 shadow-md shadow-primary-500/20'
                  : 'bg-surface-800 text-zinc-400 border-surface-700 hover:bg-surface-700 hover:text-zinc-200 hover:border-surface-600'
                }
              `}
            >
              <span>{category}</span>
              <span className={`
                text-xs lg:text-xs px-1.5 lg:px-1.5 py-0.5 rounded-full
                ${selectedCategory === category
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-900 text-zinc-500'
                }
              `}>
                {categoryCounts[category] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flecha Derecha */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm border border-surface-700/50 rounded-full shadow-lg text-zinc-400 hover:text-white transition-all opacity-100 sm:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
