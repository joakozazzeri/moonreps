// components/ProductCard.js
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProductCard = ({ product, priority = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  
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

  // Función para determinar si la imagen es de Cloudinary
  const isCloudinaryImage = (url) => {
    return url && url.includes('res.cloudinary.com');
  };

  const currentImageUrl = imageUrls[currentIndex];
  const isCloudinary = isCloudinaryImage(currentImageUrl);

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-modern overflow-hidden group card-modern hover-lift flex flex-col h-full">
      <div 
        className="relative w-full aspect-square overflow-hidden"
      >
        {isCloudinary ? (
          // Para imágenes de Cloudinary, usar img tag normal para evitar optimización de Vercel
          <img
            src={currentImageUrl}
            alt={`${product.name} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          // Para otras imágenes, usar el componente Image de Next.js
          <Image
            src={currentImageUrl}
            alt={`${product.name} - image ${currentIndex + 1}`}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
            priority={priority}
            // Las imágenes de Cloudinary se sirven directamente desde res.cloudinary.com
            // sin pasar por el optimizador de Vercel, ahorrando ancho de banda
          />
        )}
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
        <p className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent font-bold text-lg sm:text-xl mb-4 sm:mb-5">${product.price.toFixed(2)}</p>
        <div className="mt-auto space-y-2">
          <a
            href={product.buyLink || `/admin?edit=${product.id}`}
            target={product.buyLink ? "_blank" : "_self"}
            rel={product.buyLink ? "noopener noreferrer" : ""}
            className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-blue-400/70 via-purple-500/70 to-blue-600/70 text-white px-4 py-3.5 sm:px-6 sm:py-4 rounded-soft text-sm font-semibold btn-modern hover:from-blue-400/90 hover:via-purple-500/90 hover:to-blue-600/90 transition-all duration-300 cursor-pointer"
          >
            {product.buyLink && (
              <Image
                src="/kakobuy-logo.png"
                alt="Kakobuy Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain rounded-md"
              />
            )}
            {product.buyLink ? 'Comprar Ahora' : 'Editar Producto'}
          </a>
          
          {product.buyLink && (
            <button
              onClick={() => {
                router.push(`/qc?url=${encodeURIComponent(product.buyLink)}`);
              }}
              className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-green-500/70 via-green-600/70 to-green-700/70 text-white px-4 py-3.5 sm:px-6 sm:py-4 rounded-soft text-sm font-semibold btn-modern hover:from-green-500/90 hover:via-green-600/90 hover:to-green-700/90 transition-all duration-300 cursor-pointer"
            >
              <Image
                src="/logo-uufinds.png"
                alt="UUFinds Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain rounded-md"
              />
              Ver QC
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;