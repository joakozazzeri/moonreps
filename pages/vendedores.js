import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';

const CATEGORY_ACCENT = {
  'Ropa':       { color: '#3D7BFF', bg: 'rgba(61,123,255,0.1)',  border: 'rgba(61,123,255,0.25)',  text: '#3D7BFF' },
  'Zapatillas': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)',  text: '#f59e0b' },
  'Accesorios': { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)',  text: '#a855f7' },
};

const FILTER_TABS = ['Todos', 'Ropa', 'Zapatillas', 'Accesorios'];

const VENDEDORES = [
  // Ropa
  { nombre: "DRAGONREPS",       descripcion: "Ofrece marcas como Supreme, Nike, Nocta, Corteiz, CP Company, entre otras.",                         link: "https://noghost.x.yupoo.com/",                    categoria: "Ropa" },
  { nombre: "ANGELKING47",      descripcion: "Especializado en marcas de Streetwear y Drip.",                                                        link: "https://angelking47.x.yupoo.com/albums",          categoria: "Ropa" },
  { nombre: "FIREREP",          descripcion: "Catálogo con Mobius, Akimbo, Mertra, Essentials y más.",                                               link: "https://firerep.x.yupoo.com/",                    categoria: "Ropa" },
  { nombre: "PENGREPS",         descripcion: "Especializado en Derschutze y Mertra.",                                                                link: "https://pengreps.x.yupoo.com/albums",             categoria: "Ropa" },
  { nombre: "GOAT",             descripcion: "Encuentra Corteiz, Trapstar, Syna y todo lo nuevo del mercado Drip.",                                  link: "https://goat-official.x.yupoo.com/",              categoria: "Ropa" },
  { nombre: "BULLREPS",         descripcion: "El mejor vendedor de Arcteryx. También tiene varias marcas de streetwear.",                            link: "https://bullrep.x.yupoo.com/",                    categoria: "Ropa" },
  { nombre: "PIKACHUSHOP",      descripcion: "Hellstar 1:1, Spider 1:1, EE y muchas otras marcas de la más alta calidad.",                          link: "https://pikachushop.x.yupoo.com/",                categoria: "Ropa" },
  { nombre: "TIGERREPS",        descripcion: "Variedad de Supreme, Derschutze, Nike, Jnco, Bigboi y más.",                                          link: "https://tiger-official.x.yupoo.com/",             categoria: "Ropa" },
  { nombre: "3MADMAN",          descripcion: "Dispone de Acne Studio, Supreme, Nike, Nocta, Spider, Arte, Akimbo, etc.",                            link: "https://3madman.x.yupoo.com/",                    categoria: "Ropa" },
  { nombre: "HOTDOG",           descripcion: "De los mejores en Brokenplanet y Synaworld.",                                                          link: "https://hotdog-official.x.yupoo.com/",            categoria: "Ropa" },
  { nombre: "TOPHOTFASH",       descripcion: "Todas las marcas de lujo y muchas más.",                                                               link: "https://tophotfashion.x.yupoo.com/",              categoria: "Ropa" },
  { nombre: "1TO1",             descripcion: "Las prendas de lujo más destacadas en este catálogo.",                                                 link: "https://1to1.x.yupoo.com/",                       categoria: "Ropa" },
  { nombre: "PLANE1908",        descripcion: "Artículos de CH, Gallery Dept, Celine, entre otros.",                                                  link: "https://plane1908.x.yupoo.com/",                  categoria: "Ropa" },
  { nombre: "CHAOSMADE",        descripcion: "Posee todas las marcas de Streetwear y Drip.",                                                         link: "https://chaosmade.x.yupoo.com/",                  categoria: "Ropa" },
  { nombre: "MALPHITE",         descripcion: "De lo más destacado en Stone Island.",                                                                  link: "https://malphite.x.yupoo.com/",                   categoria: "Ropa" },
  { nombre: "TOPSTONEY",        descripcion: "Gran variedad de lo mejor de Stone Island.",                                                            link: "https://topstoney.x.yupoo.com/",                  categoria: "Ropa" },
  { nombre: "JIEYI168",         descripcion: "Chaquetas Puffer de Canada Goose y otras marcas.",                                                     link: "https://jieyi168x.x.yupoo.com/albums",            categoria: "Ropa" },
  { nombre: "FEIYU8698",        descripcion: "De lo más recomendado en Canada Goose.",                                                               link: "https://feiyu8698.x.yupoo.com/",                  categoria: "Ropa" },
  { nombre: "LOGAN",            descripcion: "Encuentra Purple Jeans y muchas otras marcas.",                                                        link: "https://loganhere.x.yupoo.com/albums",            categoria: "Ropa" },
  { nombre: "AKDINGJI",         descripcion: "Una gran cantidad de ropa y diferentes marcas.",                                                       link: "https://akdingji.x.yupoo.com/",                   categoria: "Ropa" },
  { nombre: "ROCKETREPS",       descripcion: "Ropa de lujo de la mejor calidad disponible.",                                                         link: "https://rockets-reps.x.yupoo.com/",               categoria: "Ropa" },
  { nombre: "TOPACNEY",         descripcion: "De lo más selecto en Acne Studios.",                                                                   link: "https://topacney.x.yupoo.com/",                   categoria: "Ropa" },
  { nombre: "SHARKBREEDER",     descripcion: "Vendedor especializado en TNF y Arcteryx.",                                                            link: "https://shark-breeder.x.yupoo.com/",              categoria: "Ropa" },
  { nombre: "UNIONKINGDOM",     descripcion: "Prendas básicas de ropa de alta calidad.",                                                             link: "https://unionkingdom.x.yupoo.com/",               categoria: "Ropa" },
  { nombre: "MARTINREPS",       descripcion: "Ropa de una calidad excelente.",                                                                       link: "https://martinreps.x.yupoo.com/",                 categoria: "Ropa" },
  { nombre: "TAURUSREPS",       descripcion: "Todas las marcas con una gran relación calidad-precio.",                                               link: "https://deateath.x.yupoo.com/",                   categoria: "Ropa" },
  { nombre: "PPs",              descripcion: "De lo más destacado en Balenciaga y Chromehearts.",                                                    link: "https://patternerpp.x.yupoo.com/",                categoria: "Ropa" },
  { nombre: "REP KINGDOM",      descripcion: "Lo mejor que puedes encontrar en Polo Ralph Lauren.",                                                  link: "https://repkingdom.x.yupoo.com/",                 categoria: "Ropa" },
  { nombre: "SURVIVAL CLOTH",   descripcion: "Artículos de Stone Island, Chrome Hearts, etc.",                                                       link: "https://survival-cloth.x.yupoo.com/albums",       categoria: "Ropa" },
  { nombre: "CND CLOTH",        descripcion: "Ofrece Palace, Stussy, Supreme, entre otras.",                                                         link: "https://baymaxcloth.x.yupoo.com/",                categoria: "Ropa" },
  { nombre: "AAAAJERSEY",       descripcion: "Contraseña: 'aaaajersey'. Es el mejor vendedor de remeras de fútbol.",                                 link: "https://aaaajersey.x.yupoo.com/",                 categoria: "Ropa" },
  { nombre: "SCARLETLUX",       descripcion: "Amplia variedad en prendas de lujo y más.",                                                            link: "https://scarlettluxury.x.yupoo.com/albums",       categoria: "Ropa" },
  { nombre: "YIAYIAO",          descripcion: "Indumentaria y zapatillas para niños.",                                                                link: "https://weidian.com/?userid=1864128688",           categoria: "Ropa" },
  // Zapatillas
  { nombre: "JMDY",             descripcion: "Considerado el mejor vendedor de zapatillas.",                                                         link: "https://tianjin-no1.x.yupoo.com/",                categoria: "Zapatillas" },
  { nombre: "YOLO66",           descripcion: "Lo más destacado en zapatillas.",                                                                      link: "https://yolo66.x.yupoo.com/",                     categoria: "Zapatillas" },
  { nombre: "WWTOP",            descripcion: "De lo mejor en el ámbito de zapatillas.",                                                              link: "https://wwfake100.x.yupoo.com/",                  categoria: "Zapatillas" },
  { nombre: "QCXCAJ1",          descripcion: "Es un vendedor recomendado.",                                                                          link: "https://qcxcaj1.x.yupoo.com/",                    categoria: "Zapatillas" },
  { nombre: "PAIREPS",          descripcion: "Vendedor sugerido.",                                                                                   link: "https://pai-reps.x.yupoo.com/albums",             categoria: "Zapatillas" },
  { nombre: "BAYMAX",           descripcion: "La contraseña es: '000000'.",                                                                          link: "https://baymax5201314.x.yupoo.com/",              categoria: "Zapatillas" },
  { nombre: "AAAABULL",         descripcion: "La contraseña es: 'aaaaaa'.",                                                                          link: "https://aaaabull.x.yupoo.com/",                   categoria: "Zapatillas" },
  { nombre: "DRAGONREPS SHOES", descripcion: "Un vendedor muy recomendado.",                                                                         link: "https://dragonsneakers.x.yupoo.com/",             categoria: "Zapatillas" },
  { nombre: "CND SHOES",        descripcion: "Vendedor altamente recomendado.",                                                                      link: "https://baymaxsneaker.x.yupoo.com/",              categoria: "Zapatillas" },
  { nombre: "UMKAO",            descripcion: "Sugerido por la comunidad.",                                                                           link: "https://umkao.x.yupoo.com/",                      categoria: "Zapatillas" },
  { nombre: "OLDCHEN",          descripcion: "Recomendado.",                                                                                         link: "https://jhj88888888.x.yupoo.com/",                categoria: "Zapatillas" },
  // Accesorios
  { nombre: "OGWAVE",           descripcion: "Gorras y bufandas de diferentes estilos.",                                                             link: "https://ogwave.x.yupoo.com/",                     categoria: "Accesorios" },
  { nombre: "CND ISLAND",       descripcion: "Ropa interior y las mejores medias del mercado.",                                                      link: "https://baymaxsocks.x.yupoo.com/",                categoria: "Accesorios" },
  { nombre: "KIPPLING SELLER",  descripcion: "Bolsos y accesorios, con la mejor relación precio-calidad en Kipling.",                                link: "#",                                               categoria: "Accesorios" },
];

export default function Vendedores() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const filterRef = useRef(null);
  const btnRefs = useRef({});

  const filteredVendedores = selectedCategory === 'Todos'
    ? VENDEDORES
    : VENDEDORES.filter(v => v.categoria === selectedCategory);

  useReveal([selectedCategory]);

  const updateIndicator = useCallback(() => {
    const btn = btnRefs.current[selectedCategory];
    const container = filterRef.current;
    if (btn && container) {
      const cr = container.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      setIndicator({ left: br.left - cr.left, width: br.width, ready: true });
    }
  }, [selectedCategory]);

  useEffect(() => {
    const raf = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(raf);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <Head>
        <title>Vendedores Recomendados — Moon Reps</title>
        <meta name="description" content="Los mejores vendedores de réplicas premium seleccionados por la comunidad." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute" style={{
              width: '55%', height: '75%',
              right: '-8%', bottom: '-20%',
              background: 'radial-gradient(ellipse, rgba(0,35,101,0.35) 0%, rgba(0,35,101,0.08) 55%, transparent 100%)',
              filter: 'blur(120px)',
              animation: 'driftSlowAlt 55s ease-in-out infinite',
            }} />
            <div className="absolute" style={{
              width: '35%', height: '50%',
              left: '-5%', top: '-10%',
              background: 'radial-gradient(ellipse, rgba(61,123,255,0.06) 0%, rgba(61,123,255,0.015) 55%, transparent 100%)',
              filter: 'blur(140px)',
              animation: 'driftSlow 40s ease-in-out infinite',
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
              style={{
                background: 'rgba(0,35,101,0.45)',
                border: '1px solid rgba(61,123,255,0.28)',
                animation: 'badgeIn 0.55s cubic-bezier(0.23,1,0.32,1) 0.3s both',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bright flex-shrink-0" style={{ animation: 'glowPulse 6s ease-in-out infinite' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#8ab4f8' }}>
                {VENDEDORES.length} vendedores verificados
              </span>
            </div>

            <h1
              className="font-display text-white animate-fade-up"
              style={{
                fontSize: 'clamp(2.5rem, 11vw, 8.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
                maxWidth: '14ch',
              }}
            >
              Vendedores<br />
              <span style={{ color: 'rgba(255,255,255,0.48)' }}>de confianza</span>
            </h1>

            <p
              className="text-zinc-400 text-lg sm:text-xl leading-relaxed mt-7 animate-fade-up"
              style={{ maxWidth: '480px', animationDelay: '90ms' }}
            >
              Los mejores proveedores seleccionados por la comunidad, verificados para garantizar calidad y confianza.
            </p>
          </div>
        </section>

        {/* ── CATÁLOGO ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-8">

          {/* Sticky filter bar */}
          <div
            className="sticky top-16 z-30 py-4 -mx-4 sm:-mx-6 px-4 sm:px-6"
            style={{
              background: 'rgba(8,16,30,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center justify-between gap-4">

              {/* Filter tabs with sliding indicator — scrollable on mobile */}
              <div className="overflow-x-auto scrollbar-hide flex-1">
              <div ref={filterRef} className="relative inline-flex gap-1 py-1">

                {indicator.ready && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1 bottom-1 rounded-xl pointer-events-none"
                    style={{
                      left: indicator.left,
                      width: indicator.width,
                      background: '#002365',
                      border: '1px solid rgba(61,123,255,0.22)',
                      boxShadow: '0 4px 16px rgba(0,35,101,0.45), 0 0 0 1px rgba(61,123,255,0.1)',
                      transition: 'left 320ms cubic-bezier(0.23,1,0.32,1), width 320ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  />
                )}

                {FILTER_TABS.map(tab => {
                  const accent = CATEGORY_ACCENT[tab];
                  return (
                    <button
                      key={tab}
                      ref={el => { btnRefs.current[tab] = el; }}
                      onClick={() => setSelectedCategory(tab)}
                      className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                        selectedCategory === tab ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {tab}
                      {accent && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                          style={{
                            background: selectedCategory === tab ? accent.color : 'rgba(255,255,255,0.18)',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              </div>{/* /scroll wrapper */}

              <span className="text-xs text-zinc-600 whitespace-nowrap flex-shrink-0">
                {filteredVendedores.length} vendedores
              </span>
            </div>
          </div>

          {/* Vendor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredVendedores.map((vendedor, index) => {
              const accent = CATEGORY_ACCENT[vendedor.categoria] || {};
              return (
                <div
                  key={vendedor.nombre}
                  className="reveal"
                  style={{ transitionDelay: `${Math.min(index, 8) * 55}ms` }}
                >
                <a
                  href={vendedor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col p-6 h-full rounded-2xl cursor-pointer"
                  style={{
                    background: '#18253d',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                    transition: 'transform 250ms cubic-bezier(0.23,1,0.32,1), border-color 200ms, box-shadow 250ms cubic-bezier(0.23,1,0.32,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)';
                  }}
                >
                  {/* Left accent border — grows from bottom on hover */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-350 ease-out"
                    style={{ background: accent.color || '#3D7BFF', transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-[15px] font-bold text-white leading-snug">
                      {vendedor.nombre}
                    </h3>
                    <span
                      className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: accent.bg || 'rgba(255,255,255,0.06)',
                        border: `1px solid ${accent.border || 'rgba(255,255,255,0.1)'}`,
                        color: accent.text || '#a1a1aa',
                      }}
                    >
                      {vendedor.categoria}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
                    {vendedor.descripcion}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold mt-auto"
                    style={{ color: accent.color || '#3D7BFF' }}
                  >
                    Visitar catálogo
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
