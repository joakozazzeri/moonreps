export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  // Lógica simple para mostrar páginas (se puede mejorar para rangos grandes)
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Mostrar solo un rango alrededor de la página actual si hay muchas
  const visiblePages = pages.filter(p =>
    p === 1 ||
    p === totalPages ||
    (p >= currentPage - 1 && p <= currentPage + 1)
  );

  // Agregar elipses
  const pagesWithEllipsis = [];
  visiblePages.forEach((p, idx) => {
    if (idx > 0 && p > visiblePages[idx - 1] + 1) {
      pagesWithEllipsis.push('...');
    }
    pagesWithEllipsis.push(p);
  });

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-surface-700 bg-surface-800 text-zinc-400 hover:text-white hover:border-surface-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pagesWithEllipsis.map((page, idx) => (
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="text-zinc-600 px-2">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95
              ${currentPage === page
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-surface-800 text-zinc-400 border border-surface-700 hover:text-white hover:border-surface-600'
              }
            `}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-surface-700 bg-surface-800 text-zinc-400 hover:text-white hover:border-surface-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
