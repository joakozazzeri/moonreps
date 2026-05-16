import { useRef, useEffect, useMemo, useState, useCallback } from 'react';

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory, allProducts }) {
  const scrollContainerRef = useRef(null);
  const innerRef = useRef(null);
  const buttonRefs = useRef({});
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const categoryCounts = useMemo(() => {
    const counts = {};
    if (!allProducts) return counts;
    categories.forEach(cat => { counts[cat] = 0; });
    allProducts.forEach(product => {
      const cat = product.category || 'Sin categoría';
      if (counts[cat] !== undefined) counts[cat]++;
      if (counts['Todos los Productos'] !== undefined) counts['Todos los Productos']++;
    });
    return counts;
  }, [allProducts, categories]);

  const updateIndicator = useCallback(() => {
    const activeBtn = buttonRefs.current[selectedCategory];
    const inner = innerRef.current;
    if (activeBtn && inner) {
      const innerRect = inner.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - innerRect.left,
        width: btnRect.width,
        ready: true,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    const raf = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(raf);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

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
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="flex items-center gap-1 w-full min-w-0">

      {/* Flecha izquierda — fuera del scroll, no tapa nada */}
      <button
        onClick={() => scroll('left')}
        aria-hidden={!showLeftArrow}
        className="flex-shrink-0 p-1.5 rounded-full border border-surface-700/50 text-zinc-400 hover:text-white hover:border-surface-600 transition-all duration-200"
        style={{ opacity: showLeftArrow ? 1 : 0, pointerEvents: showLeftArrow ? 'auto' : 'none' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex-1 min-w-0 overflow-x-auto scrollbar-hide"
        style={{ paddingBottom: '4px' }}
      >
        <div ref={innerRef} className="relative inline-flex gap-1 min-w-max py-1">

          {/* Sliding background pill */}
          {indicator.ready && (
            <div
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-xl pointer-events-none"
              style={{
                left: indicator.left,
                width: indicator.width,
                background: '#002365',
                border: '1px solid rgba(61,123,255,0.22)',
                boxShadow: '0 4px 16px rgba(0,35,101,0.45), 0 0 0 1px rgba(61,123,255,0.1)',
                transition: 'left 320ms cubic-bezier(0.23,1,0.32,1), width 320ms cubic-bezier(0.23,1,0.32,1)',
              }}
            />
          )}

          {categories.map((category) => (
            <button
              key={category}
              ref={el => { buttonRefs.current[category] = el; }}
              onClick={() => setSelectedCategory(category)}
              className={`
                relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                whitespace-nowrap transition-colors duration-200
                ${selectedCategory === category ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}
              `}
            >
              <span>{category}</span>
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full transition-colors duration-200
                ${selectedCategory === category ? 'bg-white/15 text-white/80' : 'bg-surface-800 text-zinc-500'}
              `}>
                {categoryCounts[category] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flecha derecha — fuera del scroll, no tapa nada */}
      <button
        onClick={() => scroll('right')}
        aria-hidden={!showRightArrow}
        className="flex-shrink-0 p-1.5 rounded-full border border-surface-700/50 text-zinc-400 hover:text-white hover:border-surface-600 transition-all duration-200"
        style={{ opacity: showRightArrow ? 1 : 0, pointerEvents: showRightArrow ? 'auto' : 'none' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}
