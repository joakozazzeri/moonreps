import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, priority = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.imageUrls || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="card card-hover group flex flex-col h-full relative">
      {/* Badge Featured */}
      {product.featured && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-lg shadow-primary-900/50 backdrop-blur-sm border-b border-r border-primary-400/30">
            ★ DESTACADO
          </div>
        </div>
      )}

      {/* Image Carousel */}
      <div className="relative aspect-[4/5] bg-surface-800 overflow-hidden">
        {images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-700">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors pointer-events-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors pointer-events-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Image Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${idx === currentImageIndex
                  ? 'bg-white w-3'
                  : 'bg-white/50 backdrop-blur-sm'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-medium text-zinc-100 text-sm line-clamp-2 mb-1" title={product.name}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            {product.price ? (
              <span className="text-lg font-bold text-white">
                ${Number(product.price).toFixed(2)}
              </span>
            ) : (
              <span className="text-sm text-zinc-500 italic">Precio no disponible</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 mt-auto">
          <a
            href={product.buyLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary w-full py-2.5 text-sm ${!product.buyLink && 'opacity-50 cursor-not-allowed'}`}
          >
            Comprar
          </a>

          {product.qcLink && (
            <a
              href={product.qcLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full py-2 text-xs text-zinc-400 hover:text-white"
            >
              Ver QC
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
