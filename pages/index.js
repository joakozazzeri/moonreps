import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FilterMenu from '../components/FilterMenu';
import Pagination from '../components/Pagination';
import WelcomePopup from '../components/WelcomePopup';
import CTAButtons from '../components/CTAButtons';
import { supabase } from '../lib/supabase';

export default function Home({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos los Productos');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // -- Filtros Avanzados --
  const [sortBy, setSortBy] = useState('none');
  const [showFeatured, setShowFeatured] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Todas');

  // -- Scroll to Top on Page Change --
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // -- Reset Page on Filter Change --
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy, showFeatured, selectedBrand]);

  // -- Lógica de Filtrado y Ordenamiento --
  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos los Productos' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
      const matchesFeatured = showFeatured ? product.featured : true;

      return matchesSearch && matchesCategory && matchesBrand && matchesFeatured;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, searchTerm, selectedCategory, sortBy, showFeatured, selectedBrand]);

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
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
      <Head>
        <title>Moon Reps - Catálogo Premium</title>
        <meta name="description" content="Encuentra las mejores réplicas con calidad garantizada." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomePopup />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto mt-8 sm:mt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
            Bienvenido al <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Spreadsheet de Moon Reps</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Seleccionamos manualmente lo mejor en calidad para que tus compras en Kakobuy sean rápidas y seguras.
          </p>

          <CTAButtons />
        </section>

        {/* Filters & Search - Sticky Header */}
        <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-surface-800/50 space-y-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              products={filteredProducts} // Pasar filtered para que los contadores sean dinámicos
              allProducts={initialProducts}
            />

            <FilterMenu
              onSortChange={setSortBy}
              onFilterChange={(key, val) => key === 'featured' && setShowFeatured(val)}
              onBrandChange={setSelectedBrand}
              availableBrands={brands}
              activeFilters={{ sortBy, showFeatured, selectedBrand }}
            />
          </div>
        </section>

        {/* Product Grid */}
        <section className="min-h-[500px]">
          {filteredProducts.length > 0 ? (
            <div
              key={currentPage}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn"
            >
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
                  setSelectedBrand('Todas');
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
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>

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
