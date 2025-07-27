// pages/admin.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductForm from '../components/ProductForm';
import AdminProductList from '../components/AdminProductList';
import BulkUploader from '../components/BulkUploader';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]); // Estado para las categorías

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    // Extraemos las categorías únicas de los productos para pasarlas al formulario
    const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para actualizar la lista de categorías sin recargar la página
  const updateCategories = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory].sort());
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    updateCategories(newProduct.category);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    updateCategories(updatedProduct.category);
    setEditingProduct(null);
  };

  const handleProductDeleted = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleClearAllProducts = () => {
    setProducts([]);
    setCategories([]); // También limpiamos las categorías
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 text-gray-100">
      <Head>
        <title>Moon Reps - Admin Dashboard</title>
        <meta name="description" content="Panel de administración para Moon Reps" />
      </Head>
      <div className="container mx-auto spacing-modern">
        <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white text-modern mb-3">Panel de Administración</h1>
              <p className="text-gray-400 text-subtitle">Gestiona tus productos y catálogo</p>
            </div>
            <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors link-improved flex items-center gap-2 icon-modern">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a la tienda
            </a>
        </div>
        
        <div className="mb-12">
            <BulkUploader />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-brand-dark/60 backdrop-blur-sm border border-brand-light/30 rounded-modern p-8 card-modern">
              <h2 className="text-2xl font-semibold text-white text-modern mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-brand-light icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
              </h2>
              <ProductForm
                onProductAdded={handleProductAdded}
                onProductUpdated={handleProductUpdated}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                existingCategories={categories} // Pasamos las categorías existentes
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-brand-dark/60 backdrop-blur-sm border border-brand-light/30 rounded-modern p-8 card-modern">
              <h2 className="text-2xl font-semibold text-white text-modern mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-brand-light icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Lista de Productos
              </h2>
              <AdminProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleProductDeleted}
                onClearAll={handleClearAllProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
