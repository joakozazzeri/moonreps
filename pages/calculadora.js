import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Calculadora() {
  const [dollarRate, setDollarRate] = useState(null);
  const [products, setProducts] = useState([{ price: '', quantity: 1 }]);
  const [shippingCost, setShippingCost] = useState('');
  const [applyFranchise, setApplyFranchise] = useState(false);
  const [includeImportTax, setIncludeImportTax] = useState(true);
  const [results, setResults] = useState(null);

  const fetchDollarRate = async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares/tarjeta");
      const data = await response.json();
      setDollarRate(data.venta);
    } catch (error) {
      console.error("Error fetching dollar rate:", error);
      setDollarRate(1400); // Fallback
    }
  };

  useEffect(() => {
    fetchDollarRate();
  }, []);

  useEffect(() => {
    calculateCustoms();
  }, [products, shippingCost, applyFranchise, includeImportTax, dollarRate]);

  const addProduct = () => {
    setProducts([...products, { price: '', quantity: 1 }]);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const updateProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const calculateCustoms = () => {
    if (!dollarRate) return;

    const totalProductCost = products.reduce((sum, product) => {
      return sum + (Number(product.price) * Number(product.quantity));
    }, 0);

    const shipping = Number(shippingCost) || 0;
    const totalCIF = totalProductCost + shipping;

    let excess = 0;
    let duty = 0;
    let franchiseAmount = 0;

    if (applyFranchise) {
      franchiseAmount = Math.min(50, totalCIF);
      excess = Math.max(0, totalCIF - 50);
    } else {
      excess = totalCIF;
    }

    if (includeImportTax) {
      duty = excess * 0.50; // 50% tax on excess
    }

    const totalUSD = totalCIF + duty;
    const totalARS = totalUSD * dollarRate;

    setResults({
      totalProductCost,
      shipping,
      totalCIF,
      duty,
      totalUSD,
      totalARS
    });
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
      <Head>
        <title>Calculadora de Importación - Moon Reps</title>
        <meta name="description" content="Calcula los costos de importación a Argentina." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-display text-white mb-4">
            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Importación</span>
          </h1>
          <p className="text-zinc-400">
            Estima los costos de aduana y envío para tus compras internacionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-surface-900 border border-surface-800 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Productos</h3>
                <button onClick={addProduct} className="btn bg-surface-800 hover:bg-surface-700 text-sm py-2 px-3 border border-surface-700">
                  + Agregar
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {products.map((product, index) => (
                  <div key={index} className="flex gap-3 items-end animate-fadeIn">
                    <div className="flex-1">
                      <label className="text-xs text-zinc-500 mb-1 block">Precio (USD)</label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProduct(index, 'price', e.target.value)}
                        className="input w-full p-3"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-zinc-500 mb-1 block">Cant.</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                        className="input w-full p-3 text-center"
                        min="1"
                      />
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="p-3 text-zinc-500 hover:text-rose-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-surface-800 space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">Costo de Envío (USD)</label>
                  <input
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    className="input w-full p-3"
                    placeholder="0.00"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 p-3 bg-surface-800/50 rounded-xl cursor-pointer hover:bg-surface-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={applyFranchise}
                      onChange={(e) => setApplyFranchise(e.target.checked)}
                      className="w-5 h-5 rounded border-surface-600 bg-surface-700 text-primary-500 focus:ring-primary-500/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">Aplicar Franquicia (USD $50)</span>
                      <span className="text-xs text-zinc-500">Descuenta $50 USD del total imponible (12 cupos anuales).</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-surface-800/50 rounded-xl cursor-pointer hover:bg-surface-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeImportTax}
                      onChange={(e) => setIncludeImportTax(e.target.checked)}
                      className="w-5 h-5 rounded border-surface-600 bg-surface-700 text-primary-500 focus:ring-primary-500/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">Incluir Impuestos de Importación</span>
                      <span className="text-xs text-zinc-500">Calcula el 50% sobre el excedente de la franquicia.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-surface-900 to-surface-800 border border-surface-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="text-right">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Dólar Tarjeta</p>
                  <p className="text-xl font-bold text-white font-mono">${dollarRate || '---'}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-8">Resumen de Costos</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-400">
                  <span>Productos ({products.filter(p => p.price).length})</span>
                  <span>USD {results?.totalProductCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Envío Internacional</span>
                  <span>USD {results?.shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-surface-700 my-2" />
                <div className="flex justify-between text-zinc-300 font-medium">
                  <span>Total CIF</span>
                  <span>USD {results?.totalCIF.toFixed(2)}</span>
                </div>
                {results?.duty > 0 && (
                  <div className="flex justify-between text-amber-500">
                    <span>Impuestos Aduaneros (50%)</span>
                    <span>+ USD {results?.duty.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="bg-background/50 rounded-2xl p-6 space-y-4 border border-surface-700/50 backdrop-blur-sm">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-400 text-sm">Total Estimado (USD)</span>
                  <span className="text-2xl font-bold text-white">USD {results?.totalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-zinc-400 text-sm">Total Estimado (ARS)</span>
                  <span className="text-3xl font-bold text-primary-400 font-mono">
                    ARS {Math.round(results?.totalARS).toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-zinc-600 mt-6">
                * Los cálculos son estimativos y pueden variar según la cotización del día y regulaciones aduaneras vigentes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    notFound: true
  };
}
