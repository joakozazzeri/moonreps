// pages/vendedores.js
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Vendedores() {
  const [vendedores] = useState([
    {
      nombre: "DRAGONREPS",
      descripcion: "Ofrece marcas como Supreme, Nike, Nocta, Corteiz, CP Company, entre otras.",
      link: "https://noghost.x.yupoo.com/"
    },
    {
      nombre: "ANGELKING47",
      descripcion: "Especializado en marcas de Streetwear y Drip.",
      link: "https://angelking47.x.yupoo.com/albums"
    },
    {
      nombre: "FIREREP",
      descripcion: "Catálogo con Mobius, Akimbo, Mertra, Essentials y más.",
      link: "https://firerep.x.yupoo.com/"
    },
    {
      nombre: "PENGREPS",
      descripcion: "Especializado en Derschutze y Mertra.",
      link: "https://pengreps.x.yupoo.com/albums"
    },
    {
      nombre: "GOAT",
      descripcion: "Encuentra Corteiz, Trapstar, Syna y todo lo nuevo del mercado Drip.",
      link: "https://goat-official.x.yupoo.com/"
    },
    {
      nombre: "BULLREPS",
      descripcion: "El mejor vendedor de Arcteryx. También tiene varias marcas de streetwear.",
      link: "https://bullrep.x.yupoo.com/"
    },
    {
      nombre: "PIKACHUSHOP",
      descripcion: "Hellstar 1:1, Spider 1:1, EE y muchas otras marcas de la más alta calidad.",
      link: "https://pikachushop.x.yupoo.com/"
    },
    {
      nombre: "TIGERREPS",
      descripcion: "Variedad de Supreme, Derschutze, Nike, Jnco, Bigboi y más.",
      link: "https://tiger-official.x.yupoo.com/"
    },
    {
      nombre: "3MADMAN",
      descripcion: "Dispone de Acne Studio, Supreme, Nike, Nocta, Spider, Arte, Akimbo, etc.",
      link: "https://3madman.x.yupoo.com/"
    },
    {
      nombre: "HOTDOG",
      descripcion: "De los mejores en Brokenplanet y Synaworld.",
      link: "https://hotdog-official.x.yupoo.com/"
    },
    {
      nombre: "TOPHOTFASH",
      descripcion: "Todas las marcas de lujo y muchas más.",
      link: "https://tophotfashion.x.yupoo.com/"
    },
    {
      nombre: "1TO1",
      descripcion: "Las prendas de lujo más destacadas en este catálogo.",
      link: "https://1to1.x.yupoo.com/"
    },
    {
      nombre: "PLANE1908",
      descripcion: "Artículos de CH, Gallery Dept, Celine, entre otros.",
      link: "https://plane1908.x.yupoo.com/"
    },
    {
      nombre: "CHAOSMADE",
      descripcion: "Posee todas las marcas de Streetwear y Drip.",
      link: "https://chaosmade.x.yupoo.com/"
    },
    {
      nombre: "MALPHITE",
      descripcion: "De lo más destacado en Stone Island.",
      link: "https://malphite.x.yupoo.com/"
    },
    {
      nombre: "TOPSTONEY",
      descripcion: "Gran variedad de lo mejor de Stone Island.",
      link: "https://topstoney.x.yupoo.com/"
    },
    {
      nombre: "JIEYI168",
      descripcion: "Chaquetas Puffer de Canada Goose y otras marcas.",
      link: "https://jieyi168x.x.yupoo.com/albums"
    },
    {
      nombre: "FEIYU8698",
      descripcion: "De lo más recomendado en Canada Goose.",
      link: "https://feiyu8698.x.yupoo.com/"
    },
    {
      nombre: "LOGAN",
      descripcion: "Encuentra Purple Jeans y muchas otras marcas.",
      link: "https://loganhere.x.yupoo.com/albums"
    },
    {
      nombre: "AKDINGJI",
      descripcion: "Una gran cantidad de ropa y diferentes marcas.",
      link: "https://akdingji.x.yupoo.com/"
    },
    {
      nombre: "ROCKETREPS",
      descripcion: "Ropa de lujo de la mejor calidad disponible.",
      link: "https://rockets-reps.x.yupoo.com/"
    },
    {
      nombre: "TOPACNEY",
      descripcion: "De lo más selecto en Acne Studios.",
      link: "https://topacney.x.yupoo.com/"
    },
    {
      nombre: "SHARKBREEDER",
      descripcion: "Vendedor especializado en TNF y Arcteryx.",
      link: "https://shark-breeder.x.yupoo.com/"
    },
    {
      nombre: "UNIONKINGDOM",
      descripcion: "Prendas básicas de ropa de alta calidad.",
      link: "https://unionkingdom.x.yupoo.com/"
    },
    {
      nombre: "MARTINREPS",
      descripcion: "Ropa de una calidad excelente.",
      link: "https://martinreps.x.yupoo.com/"
    },
    {
      nombre: "TAURUSREPS",
      descripcion: "Todas las marcas con una gran relación calidad-precio.",
      link: "https://deateath.x.yupoo.com/"
    },
    {
      nombre: "PPs",
      descripcion: "De lo más destacado en Balenciaga y Chromehearts.",
      link: "https://patternerpp.x.yupoo.com/"
    },
    {
      nombre: "REP KINGDOM",
      descripcion: "Lo mejor que puedes encontrar en Polo Ralph Lauren.",
      link: "https://repkingdom.x.yupoo.com/"
    },
    {
      nombre: "SURVIVAL CLOTH",
      descripcion: "Artículos de Stone Island, Chrome Hearts, etc.",
      link: "https://survival-cloth.x.yupoo.com/albums"
    },
    {
      nombre: "CND CLOTH",
      descripcion: "Ofrece Palace, Stussy, Supreme, entre otras.",
      link: "https://baymaxcloth.x.yupoo.com/"
    },
    {
      nombre: "AAAAJERSEY",
      descripcion: "Contraseña: 'aaaajersey'. Es el mejor vendedor de remeras de fútbol.",
      link: "https://aaaajersey.x.yupoo.com/"
    },
    {
      nombre: "SCARLETLUX",
      descripcion: "Amplia variedad en prendas de lujo y más.",
      link: "https://scarlettluxury.x.yupoo.com/albums"
    },
    {
      nombre: "YIAYIAO",
      descripcion: "Indumentaria y zapatillas para niños.",
      link: "https://weidian.com/?userid=1864128688"
    },
    {
      nombre: "OGWAVE",
      descripcion: "Gorras y bufandas de diferentes estilos.",
      link: "https://ogwave.x.yupoo.com/"
    },
    {
      nombre: "CND ISLAND",
      descripcion: "Ropa interior y las mejores medias del mercado.",
      link: "https://baymaxsocks.x.yupoo.com/"
    },
    {
      nombre: "KIPPLING SELLER",
      descripcion: "Bolsos y accesorios, con la mejor relación precio-calidad en Kipling.",
      link: "#"
    },
    {
      nombre: "JMDY",
      descripcion: "Considerado el mejor vendedor de zapatillas.",
      link: "https://tianjin-no1.x.yupoo.com/"
    },
    {
      nombre: "YOLO66",
      descripcion: "Lo más destacado en zapatillas.",
      link: "https://yolo66.x.yupoo.com/"
    },
    {
      nombre: "WWTOP",
      descripcion: "De lo mejor en el ámbito de zapatillas.",
      link: "https://wwfake100.x.yupoo.com/"
    },
    {
      nombre: "QCXCAJ1",
      descripcion: "Es un vendedor recomendado.",
      link: "https://qcxcaj1.x.yupoo.com/"
    },
    {
      nombre: "PAIREPS",
      descripcion: "Vendedor sugerido.",
      link: "https://pai-reps.x.yupoo.com/albums"
    },
    {
      nombre: "BAYMAX",
      descripcion: "La contraseña es: '000000'.",
      link: "https://baymax5201314.x.yupoo.com/"
    },
    {
      nombre: "AAAABULL",
      descripcion: "La contraseña es: 'aaaaaa'.",
      link: "https://aaaabull.x.yupoo.com/"
    },
    {
      nombre: "DRAGONREPS SHOES",
      descripcion: "Un vendedor muy recomendado.",
      link: "https://dragonsneakers.x.yupoo.com/"
    },
    {
      nombre: "CND SHOES",
      descripcion: "Vendedor altamente recomendado.",
      link: "https://baymaxsneaker.x.yupoo.com/"
    },
    {
      nombre: "UMKAO",
      descripcion: "Sugerido por la comunidad.",
      link: "https://umkao.x.yupoo.com/"
    },
    {
      nombre: "OLDCHEN",
      descripcion: "Recomendado.",
      link: "https://jhj88888888.x.yupoo.com/"
    }
  ]);

  // Categorías por nombre
  const nombresRopa = new Set([
    "DRAGONREPS",
    "ANGELKING47",
    "FIREREP",
    "PENGREPS",
    "GOAT",
    "BULLREPS",
    "PIKACHUSHOP",
    "TIGERREPS",
    "3MADMAN",
    "HOTDOG",
    "TOPHOTFASH",
    "1TO1",
    "PLANE1908",
    "CHAOSMADE",
    "MALPHITE",
    "TOPSTONEY",
    "JIEYI168",
    "FEIYU8698",
    "LOGAN",
    "AKDINGJI",
    "ROCKETREPS",
    "TOPACNEY",
    "SHARKBREEDER",
    "UNIONKINGDOM",
    "MARTINREPS",
    "TAURUSREPS",
    "PPs",
    "REP KINGDOM",
    "SURVIVAL CLOTH",
    "CND CLOTH",
    "AAAAJERSEY",
    "SCARLETLUX",
    "YIAYIAO",
  ]);

  const nombresZapatillas = new Set([
    "JMDY",
    "YOLO66",
    "WWTOP",
    "QCXCAJ1",
    "PAIREPS",
    "BAYMAX",
    "AAAABULL",
    "DRAGONREPS SHOES",
    "CND SHOES",
    "UMKAO",
    "OLDCHEN",
  ]);

  const nombresAccesorios = new Set([
    "OGWAVE",
    "CND ISLAND",
    "KIPPLING SELLER",
  ]);

  const vendedoresRopa = vendedores.filter(v => nombresRopa.has(v.nombre));
  const vendedoresZapatillas = vendedores.filter(v => nombresZapatillas.has(v.nombre));
  const vendedoresAccesorios = vendedores.filter(v => nombresAccesorios.has(v.nombre));

  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif" }}>
      {/* Diseño minimalista del fondo general */}
      <div className="absolute inset-0 opacity-8">
        {/* Patrón de puntos sutiles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500/40 rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-blue-500/25 rounded-full"></div>
        
        <div className="absolute top-32 left-1/5 w-1 h-1 bg-purple-500/35 rounded-full"></div>
        <div className="absolute top-48 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-64 left-2/3 w-1 h-1 bg-purple-400/40 rounded-full"></div>
        <div className="absolute top-80 right-1/2 w-2 h-2 bg-blue-500/20 rounded-full"></div>
        
        {/* Puntos adicionales para más densidad */}
        <div className="absolute top-120 left-1/6 w-1 h-1 bg-blue-500/25 rounded-full"></div>
        <div className="absolute top-140 right-1/5 w-1.5 h-1.5 bg-purple-500/30 rounded-full"></div>
        <div className="absolute top-160 left-4/5 w-1 h-1 bg-blue-400/35 rounded-full"></div>
        
        {/* Líneas horizontales sutiles */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"></div>
        
        {/* Líneas verticales sutiles */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-blue-400/15 to-transparent"></div>
        
        {/* Círculos grandes y difuminados para profundidad */}
        <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <Head>
        <title>Vendedores - Moon Reps</title>
        <meta name="description" content="Lista de vendedores recomendados por Moon Reps" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo - siempre visible */}
          <div className="flex items-center">
            <Link href="/" className="hover:scale-105 transition-transform duration-200">
              <Image src="/logo.png" alt="Repse Logo" width={120} height={48} className="object-contain sm:w-40" />
            </Link>
          </div>

          {/* Botones - ocultos en móvil, visibles en desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Botón Kakobuy */}
            <a 
              href="https://ikako.vip/r/moonreps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
            >
              <Image 
                src="/kakobuy-logo.png" 
                alt="Kakobuy Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
              <span className="text-base font-semibold">¡Regístrate en Kakobuy y recibe +$410 en cupones!</span>
            </a>

            {/* Botón Discord */}
            <a 
              href="https://discord.gg/moonreps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-base font-semibold">Únete al Discord</span>
            </a>
          </div>

          <div className="flex items-center">
            {/* Botón Productos - más pequeño en móvil */}
            <Link href="/" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">Productos</span>
            </Link>

            {/* Botón Vendedores */}
            <Link href="/vendedores" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-blue-500/40 backdrop-blur-sm border-2 border-blue-400/80 rounded-soft text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500/50 hover:border-blue-400/90 hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">Vendedores</span>
            </Link>

            {/* Botón Tutorial */}
            <Link href="/tutorial" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 rounded-soft text-orange-300 hover:text-white hover:bg-orange-500/30 hover:border-orange-500/70 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">Tutorial</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 spacing-modern">
        {/* Botones promocionales para móvil */}
        <div className="lg:hidden mb-6 space-y-3 relative z-10">
          <a 
            href="https://ikako.vip/r/moonreps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer text-sm relative z-10 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://ikako.vip/r/moonreps', '_blank');
            }}
          >
            <Image 
              src="/kakobuy-logo.png" 
              alt="Kakobuy Logo" 
              width={20} 
              height={20} 
              className="w-5 h-5 object-contain pointer-events-none"
            />
            <span className="font-semibold pointer-events-none">¡Regístrate en Kakobuy y recibe +$410 en cupones!</span>
          </a>

          <a 
            href="https://discord.gg/moonreps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-soft text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer text-sm relative z-10 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://discord.gg/moonreps', '_blank');
            }}
          >
            <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="font-semibold pointer-events-none">Únete al Discord</span>
          </a>
        </div>

        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-modern mb-3">
            <span className="text-white">Vendedores recomendados por </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(59,130,246,0.8)] drop-shadow-[0_0_4px_rgba(59,130,246,0.6)] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">Moon Reps</span>
          </h1>
          <p className="text-gray-400 text-subtitle text-sm sm:text-base">Descubre a los vendedores con mejor reputación entre la comunidad</p>
        </div>

        {/* Vista de tabla para desktop */}
        <div className="hidden lg:block space-y-10">
          {/* Ropa */}
          <section className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern overflow-hidden shadow-2xl">
            <div className="px-6 py-8 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-600/30">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Ropa</h2>
            </div>
            {/* Header de la tabla */}
            <div className="bg-gray-700/30 backdrop-blur-sm border-b border-gray-600/30">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>VENDEDOR</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>DESCRIPCIÓN</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>LINK</h3>
                </div>
              </div>
            </div>

            {/* Contenido de la tabla */}
            <div className="divide-y divide-gray-700/30">
              {vendedoresRopa.length > 0 ? (
                vendedoresRopa.map((vendedor, index) => (
                  <div key={index} className="hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="grid grid-cols-3 gap-4 p-6">
                      <div className="text-center flex items-center justify-center">
                        <h4 className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "'Outfit', 'Nunito', 'Inter', sans-serif" }}>{vendedor.nombre}</h4>
                      </div>
                      <div className="text-center flex items-center justify-center px-4">
                        <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{vendedor.descripcion}</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </section>

          {/* Zapatillas */}
          <section className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern overflow-hidden shadow-2xl">
            <div className="px-6 py-8 text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 border-b border-gray-600/30">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent">Zapatillas</h2>
            </div>
            <div className="bg-gray-700/30 backdrop-blur-sm border-b border-gray-600/30">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>VENDEDOR</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>DESCRIPCIÓN</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>LINK</h3>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-700/30">
              {vendedoresZapatillas.length > 0 ? (
                vendedoresZapatillas.map((vendedor, index) => (
                  <div key={index} className="hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="grid grid-cols-3 gap-4 p-6">
                      <div className="text-center flex items-center justify-center">
                        <h4 className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "'Outfit', 'Nunito', 'Inter', sans-serif" }}>{vendedor.nombre}</h4>
                      </div>
                      <div className="text-center flex items-center justify-center px-4">
                        <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{vendedor.descripcion}</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </section>

          {/* Accesorios */}
          <section className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern overflow-hidden shadow-2xl">
            <div className="px-6 py-8 text-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-b border-gray-600/30">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent">Accesorios</h2>
            </div>
            <div className="bg-gray-700/30 backdrop-blur-sm border-b border-gray-600/30">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>VENDEDOR</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>DESCRIPCIÓN</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>LINK</h3>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-700/30">
              {vendedoresAccesorios.length > 0 ? (
                vendedoresAccesorios.map((vendedor, index) => (
                  <div key={index} className="hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="grid grid-cols-3 gap-4 p-6">
                      <div className="text-center flex items-center justify-center">
                        <h4 className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "'Outfit', 'Nunito', 'Inter', sans-serif" }}>{vendedor.nombre}</h4>
                      </div>
                      <div className="text-center flex items-center justify-center px-4">
                        <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{vendedor.descripcion}</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Vista de tarjetas para móvil y tablet */}
        <div className="lg:hidden space-y-10">
          {/* Ropa */}
          <div>
            <div className="text-center mb-6 p-6 bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Ropa</h2>
            </div>
            <div className="space-y-4">
              {vendedoresRopa.length > 0 ? (
                vendedoresRopa.map((vendedor, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-4 hover:bg-gray-700/20 transition-colors duration-200 shadow-lg">
                    <div className="space-y-4">
                      {/* Nombre del vendedor */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">{vendedor.nombre}</h4>
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      {/* Descripción */}
                      <div>
                        <p className="text-base text-gray-300 leading-relaxed">{vendedor.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 text-center shadow-lg">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500 text-sm">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </div>

          {/* Zapatillas */}
          <div>
            <div className="text-center mb-6 p-6 bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent">Zapatillas</h2>
            </div>
            <div className="space-y-4">
              {vendedoresZapatillas.length > 0 ? (
                vendedoresZapatillas.map((vendedor, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-4 hover:bg-gray-700/20 transition-colors duration-200 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">{vendedor.nombre}</h4>
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <p className="text-base text-gray-300 leading-relaxed">{vendedor.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 text-center shadow-lg">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500 text-sm">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </div>

          {/* Accesorios */}
          <div>
            <div className="text-center mb-6 p-6 bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent">Accesorios</h2>
            </div>
            <div className="space-y-4">
              {vendedoresAccesorios.length > 0 ? (
                vendedoresAccesorios.map((vendedor, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-4 hover:bg-gray-700/20 transition-colors duration-200 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">{vendedor.nombre}</h4>
                        <a 
                          href={vendedor.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white text-sm font-semibold rounded-soft hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                        >
                          <span>Ver Vendedor</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <p className="text-base text-gray-300 leading-relaxed">{vendedor.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800/20 backdrop-blur-md border border-gray-700/30 rounded-modern p-6 text-center shadow-lg">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-4 icon-modern" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No hay vendedores disponibles</h3>
                  <p className="text-gray-500 text-sm">Los vendedores se agregarán próximamente</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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