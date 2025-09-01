// pages/calculadora.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Calculadora() {
  // Estados para la calculadora
  const [dollarRate, setDollarRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  // Estados del formulario
  const [products, setProducts] = useState([]); // Productos agregados al cálculo
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', quantity: 1 }); // Producto en edición
  const [shippingCost, setShippingCost] = useState('');
  
  // Estados de configuración
  const [applyFranchise, setApplyFranchise] = useState(true);
  const [includeImportTax, setIncludeImportTax] = useState(true);
  const [fixedImportTax] = useState(7500); // Tasa fija en ARS
  
  // Estados de resultados
  const [results, setResults] = useState(null);

  // Función para obtener cotización del dólar
  const fetchDollarRate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dollar-rate');
      const data = await response.json();
      
      if (response.ok) {
        setDollarRate(data.rate);
        setLastUpdate(new Date(data.date));
      } else {
        // Usar valor por defecto si la API falla
        setDollarRate(1050);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching dollar rate:', error);
      // Valor por defecto si falla la API
      setDollarRate(1050);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  // Cargar cotización al montar el componente
  useEffect(() => {
    fetchDollarRate();
  }, []);

  // Calcular automáticamente cuando cambien los datos agregados
  useEffect(() => {
    calculateCustoms();
  }, [products, shippingCost, applyFranchise, includeImportTax, dollarRate]);

  // Funciones para manejar productos
  const addProduct = () => {
    if (currentProduct.name.trim() && currentProduct.price && parseFloat(currentProduct.price) > 0) {
      setProducts([...products, currentProduct]);
      setCurrentProduct({ name: '', price: '', quantity: 1 }); // Limpiar el formulario
    }
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateCurrentProduct = (field, value) => {
    setCurrentProduct({ ...currentProduct, [field]: value });
  };

  // Función para calcular aduanas
  const calculateCustoms = () => {
    if (!dollarRate) return;

    // Si no hay productos agregados, limpiar resultados
    if (products.length === 0) {
      setResults(null);
      return;
    }

    // Calcular valor total de productos (ya están validados)
    const totalProductValue = products.reduce((sum, product) => {
      return sum + (parseFloat(product.price) * parseInt(product.quantity));
    }, 0);

    const shipping = parseFloat(shippingCost) || 0;
    
    // Límite de franquicia en Argentina: USD 50
    const franchise = applyFranchise ? 50 : 0;
    
    // Calcular impuestos sobre base CIF (productos + envío)
    let customsDuty = 0;
    let importTaxARS = 0;
    const baseBeforeFranchise = totalProductValue + shipping; // CIF simplificado
    const taxableAmount = Math.max(baseBeforeFranchise - franchise, 0);
    if (taxableAmount > 0) {
      customsDuty = taxableAmount * 0.50; // 50% de derecho de importación
    }

    // Aplicar tasa de importación fija si está habilitada
    if (includeImportTax) {
      importTaxARS = fixedImportTax;
    }

    // Convertir tasa fija a USD para sumarla al total USD
    const importTaxUSD = importTaxARS > 0 && dollarRate ? (importTaxARS / dollarRate) : 0;

    // Costo total en USD (incluye tasa de importación convertida)
    const totalUSD = totalProductValue + shipping + customsDuty + importTaxUSD;
    
    // Conversión a pesos argentinos a partir del total en USD
    const totalARS = totalUSD * dollarRate;

    setResults({
      productValueUSD: totalProductValue,
      shippingUSD: shipping,
      taxableBaseUSD: baseBeforeFranchise,
      customsDutyUSD: customsDuty,
      importTaxARS: importTaxARS,
      importTaxUSD: importTaxUSD,
      totalUSD: totalUSD,
      totalARS: totalARS,
      franchise: franchise,
      dollarRate: dollarRate,
      products: products
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif" }}>
      {/* Diseño minimalista del fondo */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500/40 rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-blue-500/25 rounded-full"></div>
        
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"></div>
        
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-blue-400/15 to-transparent"></div>
        
        <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <Head>
        <title>Calculadora de Aduanas - Moon Reps</title>
        <meta name="description" content="Calculadora de aduanas para Argentina. Calcula costos de importación, impuestos y shipping desde China." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="hover:scale-105 transition-transform duration-200">
              <Image src="/logo.png" alt="Moon Reps Logo" width={120} height={48} className="object-contain sm:w-40" />
            </Link>
          </div>



          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold">Productos</span>
            </Link>

            <Link href="/vendedores" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold">Vendedores</span>
            </Link>

            <Link href="/calculadora" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-green-500/40 backdrop-blur-sm border-2 border-green-400/80 rounded-soft text-white shadow-lg shadow-green-500/25 hover:bg-green-500/50 hover:border-green-400/90 hover:shadow-green-500/40 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold">Calculadora</span>
            </Link>

            <Link href="/tutorial" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 rounded-soft text-orange-300 hover:text-white hover:bg-orange-500/30 hover:border-orange-500/70 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold">Tutorial</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 spacing-modern">


        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-modern mb-3">
            <span className="text-white">Calculadora de </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(59,130,246,0.8)] drop-shadow-[0_0_4px_rgba(59,130,246,0.6)] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">Impuestos Argentina</span>
          </h1>
          <p className="text-gray-400 text-subtitle text-sm sm:text-base">Calcula los costos reales de tus compras desde China</p>
        </div>

        {/* Botones promocionales */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://ikako.vip/r/moonreps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-modern text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer shadow-2xl hover:shadow-blue-500/25 backdrop-blur-sm"
          >
            <Image 
              src="/kakobuy-logo.png" 
              alt="Kakobuy Logo" 
              width={28} 
              height={28} 
              className="w-7 h-7 object-contain"
            />
            <span className="text-base font-bold">¡Regístrate en Kakobuy y recibe +$410 en cupones!</span>
          </a>

          <a 
            href="https://discord.gg/3UW8ZAAWrG" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 border border-indigo-500/30 rounded-modern text-white hover:from-indigo-600 hover:via-purple-700 hover:to-indigo-800 transition-all duration-200 cursor-pointer shadow-2xl hover:shadow-indigo-500/25 backdrop-blur-sm"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-base font-bold">Únete al Discord</span>
          </a>
        </div>

        {/* Cotización del dólar */}
        <div className="mb-8 bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Dólar Oficial</h3>
                <p className="text-gray-400 text-sm">
                  {lastUpdate ? `Actualizado: ${lastUpdate.toLocaleString('es-AR')}` : 'Cargando...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-bold text-green-400">
                  {loading ? (
                    <span className="inline-block w-6 h-6 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></span>
                  ) : (
                    `$${dollarRate?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                  )}
                </p>
                <p className="text-gray-400 text-sm">ARS</p>
              </div>
              <button
                onClick={fetchDollarRate}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-soft text-green-300 hover:text-white hover:bg-green-500/30 hover:border-green-500/70 transition-all duration-200 disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-semibold">Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            {/* Agregar Producto */}
            <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Agregar Producto</h2>
              </div>
              
              <div className="space-y-4">
                {/* Formulario para producto actual */}
                <div className="space-y-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Nombre del producto</label>
                    <input
                      type="text"
                      value={currentProduct.name}
                      onChange={(e) => updateCurrentProduct('name', e.target.value)}
                      placeholder="Ej: Buzo Supreme"
                      className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Precio (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">$</span>
                        <input
                          type="number"
                          value={currentProduct.price}
                          onChange={(e) => updateCurrentProduct('price', e.target.value)}
                          placeholder="0.00"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Cantidad</label>
                      <input
                        type="number"
                        value={currentProduct.quantity}
                        onChange={(e) => updateCurrentProduct('quantity', e.target.value)}
                        min="1"
                        className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Lista de productos agregados */}
                {products.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Productos agregados:</h3>
                    <div className="space-y-3">
                      {products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg border border-gray-500/30">
                          <div className="flex-1">
                            <p className="text-white font-medium">{product.name}</p>
                            <p className="text-gray-400 text-sm">${product.price} × {product.quantity} = ${(parseFloat(product.price) * parseInt(product.quantity)).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeProduct(index)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={addProduct}
                  disabled={!currentProduct.name.trim() || !currentProduct.price || parseFloat(currentProduct.price) <= 0}
                  className="w-full py-3 border-2 border-dashed border-orange-500/50 rounded-lg text-orange-400 hover:text-orange-300 hover:border-orange-400/70 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-orange-400 disabled:hover:border-orange-500/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Costo de Envío */}
            <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Costo de Envío</h2>
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2">Costo de envío (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    placeholder="Ej: 20.00"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-300">
                      <p className="font-semibold mb-1">💡 Tip para declarar envío:</p>
                      <p className="text-blue-300/80 leading-relaxed">
                        <span className="font-medium">Menos de 5kg:</span> Declara $10 USD<br/>
                        <span className="font-medium">Más de 5kg:</span> Declara $20 USD<br/>
                        <span className="text-blue-400">Correo Argentino no le da mucha importancia al costo de envío, pero es importante declarar correctamente el valor de los productos.</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Configuración */}
            <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Configuración</h2>
              </div>
              
              <div className="space-y-4">
                {/* Aplicar franquicia */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold text-lg">$</span>
                    </div>
                                         <div>
                       <h3 className="text-white font-semibold">Aplicar franquicia</h3>
                       <p className="text-gray-400 text-sm">Descuento de $50 USD</p>
                     </div>
                  </div>
                  <button
                    onClick={() => setApplyFranchise(!applyFranchise)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      applyFranchise ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        applyFranchise ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Incluir tasa de importación */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Incluir tasa de importación</h3>
                      <p className="text-gray-400 text-sm">Tasa fija: ${fixedImportTax.toLocaleString('es-AR')} ARS</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIncludeImportTax(!includeImportTax)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      includeImportTax ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeImportTax ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              

            </div>
          </div>

          {/* Resultados */}
          <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Resumen de Costos</h2>
            </div>
            
            {results ? (
              <div className="space-y-6">
                {/* Lista de productos */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Productos calculados:</h3>
                  <div className="space-y-2">
                    {results.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                          <p className="text-gray-400 text-sm">Cantidad: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">${parseFloat(product.price).toFixed(2)} USD</p>
                          <p className="text-gray-400 text-sm">Total: ${(parseFloat(product.price) * parseInt(product.quantity)).toFixed(2)} USD</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desglose de costos */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="flex items-center gap-2 text-blue-200">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-blue-500/20 border border-blue-500/30 text-blue-300">Productos</span>
                      Subtotal productos:
                    </span>
                    <span className="text-blue-300 font-semibold">${results.productValueUSD.toFixed(2)} USD</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="flex items-center gap-2 text-purple-200">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300">Envío</span>
                      Costo de envío:
                    </span>
                    <span className="text-purple-300 font-semibold">${results.shippingUSD.toFixed(2)} USD</span>
                  </div>
                  
                  {results.customsDutyUSD > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="flex items-center gap-2 text-amber-200">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300">Aduana</span>
                        Impuestos de Aduana (50%):
                      </span>
                      <span className="text-amber-300 font-semibold">${results.customsDutyUSD.toFixed(2)} USD</span>
                    </div>
                  )}
                  
                  {results.importTaxARS > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="flex items-center gap-2 text-amber-200">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300">Tasa</span>
                        Tasa de importación:
                      </span>
                      <span className="text-amber-300 font-semibold">${((results.importTaxUSD ?? (results.importTaxARS && results.dollarRate ? results.importTaxARS / results.dollarRate : 0))).toFixed(2)} USD</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-bold text-lg">Total USD:</span>
                    <span className="text-green-400 font-bold text-xl">${results.totalUSD.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-300 font-bold text-lg">Total Final ARS:</span>
                    <span className="text-green-400 font-bold text-xl">${results.totalARS.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>


              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-400 mb-2">Agrega productos para ver el cálculo</p>
                  <p className="text-gray-500 text-sm">Los resultados se actualizarán automáticamente</p>
                </div>
              </div>
            )}
          </div>
        </div>


      </main>

      <footer className="text-center py-6 mt-12">
        <p className="text-gray-400 text-sm">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">© 2025 </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Moon Reps</span>
          <span className="text-gray-400"> • Todos los derechos reservados</span>
        </p>
      </footer>
    </div>
  );
} 