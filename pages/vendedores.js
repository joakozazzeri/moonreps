import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Vendedores() {
  const [vendedores] = useState([
    // Ropa
    { nombre: "DRAGONREPS", descripcion: "Ofrece marcas como Supreme, Nike, Nocta, Corteiz, CP Company, entre otras.", link: "https://noghost.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "ANGELKING47", descripcion: "Especializado en marcas de Streetwear y Drip.", link: "https://angelking47.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "FIREREP", descripcion: "Catálogo con Mobius, Akimbo, Mertra, Essentials y más.", link: "https://firerep.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "PENGREPS", descripcion: "Especializado en Derschutze y Mertra.", link: "https://pengreps.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "GOAT", descripcion: "Encuentra Corteiz, Trapstar, Syna y todo lo nuevo del mercado Drip.", link: "https://goat-official.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "BULLREPS", descripcion: "El mejor vendedor de Arcteryx. También tiene varias marcas de streetwear.", link: "https://bullrep.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "PIKACHUSHOP", descripcion: "Hellstar 1:1, Spider 1:1, EE y muchas otras marcas de la más alta calidad.", link: "https://pikachushop.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "TIGERREPS", descripcion: "Variedad de Supreme, Derschutze, Nike, Jnco, Bigboi y más.", link: "https://tiger-official.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "3MADMAN", descripcion: "Dispone de Acne Studio, Supreme, Nike, Nocta, Spider, Arte, Akimbo, etc.", link: "https://3madman.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "HOTDOG", descripcion: "De los mejores en Brokenplanet y Synaworld.", link: "https://hotdog-official.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "TOPHOTFASH", descripcion: "Todas las marcas de lujo y muchas más.", link: "https://tophotfashion.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "1TO1", descripcion: "Las prendas de lujo más destacadas en este catálogo.", link: "https://1to1.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "PLANE1908", descripcion: "Artículos de CH, Gallery Dept, Celine, entre otros.", link: "https://plane1908.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "CHAOSMADE", descripcion: "Posee todas las marcas de Streetwear y Drip.", link: "https://chaosmade.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "MALPHITE", descripcion: "De lo más destacado en Stone Island.", link: "https://malphite.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "TOPSTONEY", descripcion: "Gran variedad de lo mejor de Stone Island.", link: "https://topstoney.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "JIEYI168", descripcion: "Chaquetas Puffer de Canada Goose y otras marcas.", link: "https://jieyi168x.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "FEIYU8698", descripcion: "De lo más recomendado en Canada Goose.", link: "https://feiyu8698.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "LOGAN", descripcion: "Encuentra Purple Jeans y muchas otras marcas.", link: "https://loganhere.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "AKDINGJI", descripcion: "Una gran cantidad de ropa y diferentes marcas.", link: "https://akdingji.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "ROCKETREPS", descripcion: "Ropa de lujo de la mejor calidad disponible.", link: "https://rockets-reps.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "TOPACNEY", descripcion: "De lo más selecto en Acne Studios.", link: "https://topacney.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "SHARKBREEDER", descripcion: "Vendedor especializado en TNF y Arcteryx.", link: "https://shark-breeder.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "UNIONKINGDOM", descripcion: "Prendas básicas de ropa de alta calidad.", link: "https://unionkingdom.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "MARTINREPS", descripcion: "Ropa de una calidad excelente.", link: "https://martinreps.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "TAURUSREPS", descripcion: "Todas las marcas con una gran relación calidad-precio.", link: "https://deateath.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "PPs", descripcion: "De lo más destacado en Balenciaga y Chromehearts.", link: "https://patternerpp.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "REP KINGDOM", descripcion: "Lo mejor que puedes encontrar en Polo Ralph Lauren.", link: "https://repkingdom.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "SURVIVAL CLOTH", descripcion: "Artículos de Stone Island, Chrome Hearts, etc.", link: "https://survival-cloth.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "CND CLOTH", descripcion: "Ofrece Palace, Stussy, Supreme, entre otras.", link: "https://baymaxcloth.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "AAAAJERSEY", descripcion: "Contraseña: 'aaaajersey'. Es el mejor vendedor de remeras de fútbol.", link: "https://aaaajersey.x.yupoo.com/", categoria: "Ropa" },
    { nombre: "SCARLETLUX", descripcion: "Amplia variedad en prendas de lujo y más.", link: "https://scarlettluxury.x.yupoo.com/albums", categoria: "Ropa" },
    { nombre: "YIAYIAO", descripcion: "Indumentaria y zapatillas para niños.", link: "https://weidian.com/?userid=1864128688", categoria: "Ropa" },

    // Zapatillas
    { nombre: "JMDY", descripcion: "Considerado el mejor vendedor de zapatillas.", link: "https://tianjin-no1.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "YOLO66", descripcion: "Lo más destacado en zapatillas.", link: "https://yolo66.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "WWTOP", descripcion: "De lo mejor en el ámbito de zapatillas.", link: "https://wwfake100.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "QCXCAJ1", descripcion: "Es un vendedor recomendado.", link: "https://qcxcaj1.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "PAIREPS", descripcion: "Vendedor sugerido.", link: "https://pai-reps.x.yupoo.com/albums", categoria: "Zapatillas" },
    { nombre: "BAYMAX", descripcion: "La contraseña es: '000000'.", link: "https://baymax5201314.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "AAAABULL", descripcion: "La contraseña es: 'aaaaaa'.", link: "https://aaaabull.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "DRAGONREPS SHOES", descripcion: "Un vendedor muy recomendado.", link: "https://dragonsneakers.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "CND SHOES", descripcion: "Vendedor altamente recomendado.", link: "https://baymaxsneaker.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "UMKAO", descripcion: "Sugerido por la comunidad.", link: "https://umkao.x.yupoo.com/", categoria: "Zapatillas" },
    { nombre: "OLDCHEN", descripcion: "Recomendado.", link: "https://jhj88888888.x.yupoo.com/", categoria: "Zapatillas" },

    // Accesorios
    { nombre: "OGWAVE", descripcion: "Gorras y bufandas de diferentes estilos.", link: "https://ogwave.x.yupoo.com/", categoria: "Accesorios" },
    { nombre: "CND ISLAND", descripcion: "Ropa interior y las mejores medias del mercado.", link: "https://baymaxsocks.x.yupoo.com/", categoria: "Accesorios" },
    { nombre: "KIPPLING SELLER", descripcion: "Bolsos y accesorios, con la mejor relación precio-calidad en Kipling.", link: "#", categoria: "Accesorios" }
  ]);

  const categories = ["Ropa", "Zapatillas", "Accesorios", "Todos"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredVendedores = selectedCategory === "Todos"
    ? vendedores
    : vendedores.filter(v => v.categoria === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
      <Head>
        <title>Vendedores Recomendados - Moon Reps</title>
        <meta name="description" content="Lista de vendedores confiables de réplicas." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold font-display text-white">
            Vendedores <span className="text-primary-500">Recomendados</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Una selección de los proveedores más confiables de la comunidad.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory("Todos")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === "Todos"
              ? "bg-surface-800 text-white shadow-lg shadow-purple-500/10 ring-1 ring-white/10"
              : "text-zinc-400 hover:text-white hover:bg-surface-800/50"
              }`}
          >
            Todos
          </button>
          {categories.filter(c => c !== "Todos").map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat
                ? "bg-surface-800 text-white shadow-lg shadow-purple-500/10 ring-1 ring-white/10"
                : "text-zinc-400 hover:text-white hover:bg-surface-800/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendedores.map((vendedor, index) => (
            <a
              key={index}
              href={vendedor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-6 flex flex-col group h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                  {vendedor.nombre}
                </h3>
                <span className="badge bg-surface-800 text-zinc-400 border border-surface-700">
                  {vendedor.categoria}
                </span>
              </div>

              <p className="text-zinc-400 text-sm mb-6 flex-grow">
                {vendedor.descripcion}
              </p>

              <div className="flex items-center text-primary-500 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                Visitar catálogo
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}