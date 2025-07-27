// components/Pagination.js
import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [hoveredPage, setHoveredPage] = useState(null);

  // Función para generar los números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Máximo 5 páginas visibles
    
    if (totalPages <= maxVisible) {
      // Si hay 5 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay más de 5 páginas, mostrar una selección inteligente
      if (currentPage <= 3) {
        // Páginas iniciales: 1, 2, 3, 4, 5, ..., última
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Páginas finales: 1, ..., penúltima-2, penúltima-1, penúltima, última
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Páginas intermedias: 1, ..., actual-1, actual, actual+1, ..., última
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8 sm:mt-12 mb-6 sm:mb-8">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-soft transition-all duration-200 cursor-pointer ${
          currentPage === 1
            ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 text-gray-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 hover-lift'
        }`}
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Números de página */}
      {pageNumbers.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-400 text-xs sm:text-sm font-medium">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              onMouseEnter={() => setHoveredPage(page)}
              onMouseLeave={() => setHoveredPage(null)}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-soft transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-soft'
                  : 'bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 text-gray-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 hover-lift'
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold">{page}</span>
            </button>
          )}
        </div>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-soft transition-all duration-200 cursor-pointer ${
          currentPage === totalPages
            ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 text-gray-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 hover-lift'
        }`}
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 