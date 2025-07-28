// components/ProductCard.js
import { useState } from 'react';
import Image from 'next/image';

const ProductCard = ({ product, onImageClick, priority = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = Array.isArray(product.imageUrls) && product.imageUrls.length > 0
    ? product.imageUrls
    : ['https://placehold.co/400x400/002365/ffffff?text=No+Image'];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-modern overflow-hidden group card-modern hover-lift flex flex-col h-full">
      <div 
        className="relative w-full h-48 sm:h-56 md:h-64 cursor-pointer overflow-hidden"
        onClick={() => onImageClick(imageUrls, currentIndex)}
      >
        <Image
          src={imageUrls[currentIndex]}
          alt={`${product.name} - image ${currentIndex + 1}`}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
          priority={priority}
        />
        {imageUrls.length > 1 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
            {currentIndex + 1} / {imageUrls.length}
          </div>
        )}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 sm:left-3 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-2 sm:p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-black/80 hover:scale-110 border border-white/20 icon-modern"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-2 sm:p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-black/80 hover:scale-110 border border-white/20 icon-modern"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-white text-sm sm:text-base mb-2 sm:mb-3 leading-relaxed break-words">{product.name}</h3>
        <p className="text-blue-400 font-bold text-lg sm:text-xl mb-4 sm:mb-5">${product.price.toFixed(2)}</p>
        <div className="mt-auto">
          <a
            href={product.buyLink || `/admin?edit=${product.id}`}
            target={product.buyLink ? "_blank" : "_self"}
            rel={product.buyLink ? "noopener noreferrer" : ""}
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-soft text-sm font-semibold btn-modern hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer"
          >
            {product.buyLink ? 'Comprar Ahora' : 'Editar Producto'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;