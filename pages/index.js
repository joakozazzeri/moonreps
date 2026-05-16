import { useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FilterMenu from '../components/FilterMenu';
import Pagination from '../components/Pagination';
import WelcomePopup from '../components/WelcomePopup';
import { supabase } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';
import StarField from '../components/StarField';

export default function Home({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos los Productos');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // -- Filtros Avanzados --
  const [sortBy, setSortBy] = useState('none');
  const [showFeatured, setShowFeatured] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const filterBarRef = useRef(null);

  // Re-observa .reveal cuando cambia la lista de productos mostrados
  useReveal([currentPage, selectedCategory, sortBy, showFeatured, selectedBrands]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // -- Reset Page on Filter Change --
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy, showFeatured, selectedBrands]);

  // -- Lógica de Filtrado y Ordenamiento --
  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos los Productos' || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesFeatured = showFeatured ? product.featured : true;

      return matchesSearch && matchesCategory && matchesBrand && matchesFeatured;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, searchTerm, selectedCategory, sortBy, showFeatured, selectedBrands]);

  // -- Paginación --
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // -- Datos para Filtros --
  const categories = ['Todos los Productos', ...new Set(initialProducts.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(initialProducts.map(p => p.brand).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <Head>
        <title>Moon Reps — Catálogo Premium de Reps</title>
        <meta name="description" content="Seleccionamos manualmente lo mejor en calidad para que tus compras en Kakobuy sean rápidas y seguras." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomePopup />
      <Header />

      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32">

          {/* Galaxia de estrellas animadas */}
          <StarField count={200} />

          {/* Glow de profundidad — sutil, estático */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 20% 110%, rgba(0,35,101,0.28) 0%, transparent 70%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

            {/* Badge animado con delay */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
              style={{
                background: 'rgba(0,35,101,0.45)',
                border: '1px solid rgba(61,123,255,0.28)',
                animation: 'badgeIn 0.55s cubic-bezier(0.23,1,0.32,1) 0.3s both',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-bright flex-shrink-0"
                style={{ animation: 'glowPulse 6s ease-in-out infinite' }}
              />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#8ab4f8' }}>
                +1000 productos seleccionados
              </span>
            </div>

            {/* Headline — Bebas Neue, left-aligned, impactante */}
            <h1
              className="font-display text-white animate-fade-up"
              style={{
                fontSize: 'clamp(2.6rem, 11vw, 8rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
                maxWidth: '16ch',
              }}
            >
              Las mejores<br />
              reps en<br />
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>un solo lugar</span>
            </h1>

            {/* Subtítulo */}
            <p
              className="text-zinc-400 text-lg sm:text-xl leading-relaxed mt-7 animate-fade-up"
              style={{
                maxWidth: '500px',
                animationDelay: '90ms',
              }}
            >
              Solo lo que vale la pena, filtrado por calidad real. Comprá con Kakobuy y recibí en cualquier país de Latinoamérica, con total confianza.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-3 mt-10 animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              {/* Primario: navy sólido — hero destacado */}
              <a
                href="https://ikako.vip/r/moonreps"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-hero px-8 py-4 text-base rounded-xl gap-3 w-full sm:w-auto justify-center"
              >
                <Image
                  src="/kakobuy-logo.png"
                  alt="Kakobuy"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain flex-shrink-0"
                />
                Registro + $410 Cupones
              </a>

              {/* Secundario: outline */}
              <a
                href="https://discord.gg/3UW8ZAAWrG"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-7 py-3.5 text-sm rounded-xl gap-2.5 w-full sm:w-auto justify-center"
              >
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#5865F2' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                </svg>
                Únete al Discord
              </a>

              {/* Terciario: tutorial — ghost con borde sutil */}
              <Link
                href="/tutorial"
                className="btn px-7 py-3.5 text-sm rounded-xl gap-2 w-full sm:w-auto justify-center text-zinc-300 hover:text-white transition-colors duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Guía de compra
              </Link>
            </div>
          </div>
        </section>

        {/* ── BARRA DE FILTROS — sticky fuera del flex para que funcione correctamente ── */}
        <div
          ref={filterBarRef}
          className="relative z-10 py-4"
          style={{
            background: 'rgba(8,16,30,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={filteredProducts}
                allProducts={initialProducts}
              />
              <FilterMenu
                onSortChange={setSortBy}
                onFilterChange={(key, val) => key === 'featured' && setShowFeatured(val)}
                onBrandChange={setSelectedBrands}
                availableBrands={brands}
                activeFilters={{ sortBy, showFeatured, selectedBrands }}
              />
            </div>
          </div>
        </div>

        {/* ── CATÁLOGO ── */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pb-16 pt-8">

          {/* Product Grid */}
          <section className="min-h-[500px]">
            {filteredProducts.length > 0 ? (
              <div
                key={currentPage}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {currentProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="reveal"
                    style={{ transitionDelay: `${Math.min(index, 7) * 55}ms` }}
                  >
                    <ProductCard product={product} priority={index < 4} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface-900/50 rounded-3xl border border-surface-800 border-dashed">
                <p className="text-zinc-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos los Productos');
                    setSortBy('none');
                    setShowFeatured(false);
                    setSelectedBrands([]);
                  }}
                  className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return { props: { initialProducts: [] } };
  }

  // Transformar datos si es necesario (ej: asegurar imageUrls es array)
  const processedProducts = products.map(p => {
    let images = [];
    if (typeof p.imageUrls === 'string') {
      try {
        images = JSON.parse(p.imageUrls);
        if (!Array.isArray(images)) images = [images];
      } catch (e) {
        images = [p.imageUrls];
      }
    } else if (Array.isArray(p.imageUrls)) {
      images = p.imageUrls;
    } else if (p.imageUrls) {
      images = [p.imageUrls];
    } else if (p.image_url) {
      // Fallback for legacy column if it exists
      images = Array.isArray(p.image_url) ? p.image_url : [p.image_url];
    }

    return {
      ...p,
      imageUrls: images.filter(Boolean)
    };
  });

  return {
    props: {
      initialProducts: processedProducts,
    },
  };
}
