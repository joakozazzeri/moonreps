import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, priority = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
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

      {/* Featured: línea de acento en el borde superior */}
      {product.featured && (
        <div
          className="absolute top-0 inset-x-0 h-px z-20 pointer-events-none rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(61,123,255,0.85) 50%, transparent 100%)' }}
        />
      )}

      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <div
            className="glow-pulse inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: '#001845',
              border: '1px solid rgba(61,123,255,0.35)',
              color: '#ffffff',
            }}
          >
            <span style={{ color: '#3D7BFF' }}>★</span>
            DESTACADO
          </div>
        </div>
      )}

      {/* ── Imagen ── */}
      <div className="relative aspect-[4/5] bg-surface-900 overflow-hidden flex-shrink-0">

        {/* Skeleton */}
        {!imageLoaded && images.length > 0 && (
          <div className="absolute inset-0 z-10 skeleton" />
        )}

        {images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={priority}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-700">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Gradiente inferior: funde la imagen con el cuerpo de la card */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #18253d 0%, rgba(24,37,61,0) 100%)' }}
        />

        {/* Flechas de navegación */}
        {hasMultipleImages && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75 transition-colors pointer-events-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75 transition-colors pointer-events-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Contador de imágenes */}
        {hasMultipleImages && (
          <div className="absolute bottom-2.5 right-3 z-20 text-[10px] font-mono tabular-nums select-none"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-grow">

        {/* Nombre + marca */}
        <div className="flex-grow mb-3">
          {product.brand && (
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-1 truncate">
              {product.brand}
            </p>
          )}
          <h3 className="font-medium text-zinc-100 text-sm line-clamp-2 leading-snug" title={product.name}>
            {product.name}
          </h3>
        </div>

        {/* Precio */}
        <div className="flex items-baseline gap-1.5 mb-3">
          {product.price ? (
            <>
              <span className="text-[11px] font-medium text-zinc-500 leading-none">USD</span>
              <span className="text-xl font-bold text-white tabular-nums leading-none">
                {Number(product.price).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm text-zinc-500 italic">Sin precio</span>
          )}
        </div>

        {/* Separador */}
        <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Botones */}
        <div className="space-y-1.5">
          <a
            href={product.buyLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden btn btn-primary w-full py-2.5 text-sm gap-2 ${!product.buyLink && 'opacity-50 cursor-not-allowed'}`}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 9H4l1-9z" />
            </svg>
            <span className="relative z-10">Comprar</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 pointer-events-none"
            />
          </a>

          {product.qcLink && (
            <a
              href={product.qcLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver fotos QC
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
