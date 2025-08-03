import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 10;

  const tutorialSteps = [
    {
      id: 1,
      title: "Paso 1: Cómo crear tu cuenta para comprar en Kakobuy",
      description: "Para comenzar a usar Kakobuy, necesitas crear una cuenta en su plataforma. Este proceso es simple y te permitirá acceder a todas las funciones del servicio de agente. Una vez registrado, podrás empezar a comprar productos de sitios chinos de forma segura y confiable.",
      content: {
        image: "https://i.imgur.com/uKLNco2.jpg",
        link: "https://ikako.vip/r/moonreps"
      },
      warning: "Asegúrate de verificar tu dirección de correo electrónico después del registro para activar tu cuenta."
    },
    {
      id: 2,
      title: "Paso 2: Cómo buscar y encontrar productos en Kakobuy",
      description: "Tenemos tres formas principales de buscar productos en Kakobuy:",
      content: {
        searchMethods: [
          {
            title: "Búsqueda mediante Kakobuy",
            description: "¿Ya tienes un enlace? Pega la URL de un producto de cualquier sitio chino compatible (como Weidian o Taobao) directamente en Kakobuy para procesar tu búsqueda de forma rápida y sencilla. También es posible buscar mediante una imagen del producto.",
            image: "https://i.imgur.com/cKm3N4O.jpg"
          },
          {
            title: "Búsqueda mediante Discord",
            description: "Únete a nuestro Discord. Puedes usar los bots de búsqueda con solo una foto del producto o preguntar directamente en los canales para que la misma comunidad te ayude a encontrarlo.",
            image: "https://i.imgur.com/N0K3fRO.jpg"
          },
          {
            title: "Búsqueda mediante Spreadsheet",
            description: "En nuestra web recopilamos los productos de mejor calidad y que la rompen en la comunidad. Es nuestra selección de confianza para que encuentres joyitas sin perder el tiempo buscando.",
            image: "https://i.imgur.com/cAwyC04.jpg",
            recommended: true
          }
        ]
      }
    },
    {
      id: 3,
      title: "Paso 3: Cómo Agregar Productos a tu Carrito",
      description: "Revisa los productos seleccionados antes de proceder con la compra. Asegúrate de verificar las especificaciones, tallas, colores y cantidades antes de agregar al carrito. Kakobuy te permite consolidar productos de diferentes vendedores en un solo envío.",
      content: {
        image: "https://i.imgur.com/omTi8v4.jpg"
      }
    },
    {
      id: 4,
      title: "Paso 4: Como realizar tu pedido y hacer el pago",
      description: "Revisa tu carrito, elige cómo pagar y confirma tu pedido. Este primer pago cubre tus productos y su envío dentro de China. Kakobuy admite múltiples monedas y métodos de pago, incluyendo Stripe, Criptomonedas, WeChat y Alipay.",
      content: {
        image: "https://i.imgur.com/KXouw7Z.jpg"
      }
    },
    {
      id: 5,
      title: "Paso 5: Kakobuy procesa tu pedido",
      description: "Después de que realizas el pago, Kakobuy revisa tu pedido (generalmente en 3-5 horas hábiles) y realiza los pedidos con los vendedores. El envío al almacén suele tardar de 3 a 5 días. Puedes visualizar el estado de tus pedidos entrando al apartado de \"Orden\" en tu perfil.",
      content: {
        image: "https://i.imgur.com/fvPcA1i.jpg"
      }
    },
    {
      id: 6,
      title: "Paso 6: Quality Check y almacenamiento",
      description: "Una vez lleguen tus productos al almacén, Kakobuy tomará varias fotos para que compruebes la calidad de los mismos. Si encuentras problemas o fallas revisando las fotos puedes contactarte por mensaje para que te ayuden a solucionarlo",
      content: {
        image: "https://i.imgur.com/SBMkr3i.jpg"
      }
    },
    {
      id: 7,
      title: "Paso 7: Realizar \"rehearsal\" o \"ensayo de envío\"",
      description: "Seleccionaremos todos los productos que queramos enviar en un mismo paquete haciendo click en la pestaña al costado de cada producto. Una vez seleccionados haremos click en \"Rehearsal packing\" o \"Envío de ensayo\".",
      additionalInfo: "Una vez dentro del apartado de Rehearsal pondremos los datos de nuestra dirección de envío. Si en algún apartado les pide el TAX ID es el DNI. Tendremos para elegir estos extras opcionales para agregar a nuestro embalaje",
      image: "https://i.imgur.com/usPa0xA.jpg",
      importantNote: "IMPORTANTE PARA NO PAGAR COSTOS EXCESIVOS DE ENVÍO",
      content: {
        faq: [
          {
            question: "¿Qué es el \"rehearsal\" o \"envío de ensayo\"?",
            answer: "Es pagar una pequeña tarifa para que Kakobuy arme tu paquete final antes de tiempo y te diga su peso y tamaño exactos."
          },
          {
            question: "¿Y para qué me sirve eso?",
            answer: "Para saber el precio real del envío y no llevarte sorpresas. Te permite comparar los costos de las diferentes paqueterías con los datos reales de tu paquete y elegir la más barata."
          },
          {
            question: "¿Por qué importa tanto?",
            answer: "Porque casi todas las empresas de envío cobran por el volumen del paquete. Con el rehearsal te enteras del costo real y evitas pagar de más por una caja muy grande."
          }
        ]
      }
    },
    {
      id: 8,
      title: "Paso 8: Realizar envío internacional",
      description: "Una vez esté embalado nuestro paquete podremos observar su respectivo peso. Le daremos click al botón que dice \"Información de la parcela\" y luego en \"Paquete\". Ahora solo tenemos que elegir nuestro método de envío y realizar el pago como en los pasos anteriores",
      content: {
        image: "https://i.imgur.com/Sx0bI6P.jpg"
      }
    },
    {
      id: 9,
      title: "Paso 9: Seguimiento internacional",
      description: "Puedes rastrear tu pedido desde la sección de \"Warehouse\"/\"Almacén\" o copiando el código de seguimiento en 17TRACK.",
      descriptionWithLink: "Puedes rastrear tu pedido desde la sección de \"Warehouse\"/\"Almacén\" o copiando el código de seguimiento en 17TRACK.",
      trackingLink: "https://www.17track.net/es",
      content: {
        image: "https://i.imgur.com/Glc4nGI.jpg"
      }
    },
    {
      id: 10,
      title: "Paso 10: Declaración Correo Argentino",
      description: "Una vez ya tengamos nuestro código de seguimiento tenemos que hacer el aviso de compra en Correo Argentino, entraremos a Correo Argentino EPAGO y nos registraremos e iniciaremos sesión.",
      content: {
        link: "https://epago.correoargentino.com.ar/#/login"
      }
    }
  ];

  const currentStepData = tutorialSteps.find(step => step.id === currentStep);
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps && !isTransitioning) {
      const currentScrollY = window.scrollY;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        // Mantener la posición del scroll
        window.scrollTo(0, currentScrollY);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1 && !isTransitioning) {
      const currentScrollY = window.scrollY;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        // Mantener la posición del scroll
        window.scrollTo(0, currentScrollY);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber !== currentStep && !isTransitioning) {
      const currentScrollY = window.scrollY;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(stepNumber);
        // Mantener la posición del scroll
        window.scrollTo(0, currentScrollY);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  const openImageModal = (imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500/40 rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-blue-500/25 rounded-full"></div>
      </div>

      <Head>
        <title>Tutorial Interactivo - Kakobuy</title>
        <meta name="description" content="Aprende a usar Kakobuy con nuestro tutorial interactivo paso a paso" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo - siempre visible */}
          <div className="flex items-center">
            <Image src="/logo.png" alt="Repse Logo" width={120} height={48} className="object-contain hover:scale-105 transition-transform duration-200 sm:w-40" />
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
              <span className="text-sm sm:text-base font-semibold hidden sm:inline">Productos</span>
            </Link>

            {/* Botón Vendedores */}
            <Link href="/vendedores" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-soft text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm sm:text-base font-semibold hidden sm:inline">Vendedores</span>
            </Link>

            {/* Botón Tutorial */}
            <Link href="/tutorial" className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-orange-500/40 backdrop-blur-sm border border-orange-500/70 rounded-soft text-white hover:bg-orange-500/50 hover:border-orange-500/90 transition-all duration-200 cursor-pointer ml-2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm sm:text-base font-semibold hidden sm:inline">Tutorial</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10 spacing-modern">
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="font-semibold pointer-events-none">Únete al Discord</span>
          </a>
        </div>

        {/* Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          <div className="text-center mb-6 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
              Tutorial: ¿Como comprar en Kakobuy?
            </h1>
            <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-6">
              En este tutorial te enseñaremos como realizar tu primera compra. Te mostraremos cómo buscar productos, realizar su respectiva compra y enviarlos a tu país.
            </p>
          </div>



          {/* Navegación móvil - Solo visible en móvil */}
          <div className="lg:hidden mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <h3 className="text-base font-semibold text-white mb-3">
                Navegación del Tutorial
              </h3>

              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Grid de pasos */}
              <div className="grid grid-cols-5 gap-1 mb-4">
                {tutorialSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={isTransitioning}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      step.id === currentStep
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600'
                    } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {step.id}
                  </button>
                ))}
              </div>

              {/* Indicador de paso actual */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Paso Actual</p>
                <p className="text-white font-medium text-sm">
                  Paso {currentStep}: {currentStepData.title.split(':')[1] || currentStepData.title}
                </p>
              </div>

              {/* Botones de navegación */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isTransitioning}
                  className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-200 text-sm ${
                    currentStep === 1 || isTransitioning
                      ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:border-gray-500 hover:scale-105'
                  }`}
                >
                  {isTransitioning ? 'Cargando...' : 'Anterior'}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === totalSteps || isTransitioning}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                    currentStep === totalSteps || isTransitioning
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  {isTransitioning ? 'Cargando...' : 'Siguiente'}
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Columna izquierda - Contenido del tutorial */}
            <div className="lg:col-span-2">
              <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-6 transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {currentStepData.title}
                </h2>
                
                {/* Nota importante para el paso 7 */}
                {currentStep === 7 && currentStepData.importantNote && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                    <p className="text-orange-400 font-bold text-center text-sm sm:text-base">
                      {currentStepData.importantNote}
                    </p>
                  </div>
                )}
                
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  {currentStep === 9 ? (
                    <>
                      Puedes rastrear tu pedido desde la sección de "Warehouse/Almacén" o copiando el código de seguimiento en{' '}
                      <a 
                        href="https://www.17track.net/es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-bold no-underline"
                      >
                        17TRACK
                      </a>
                      .
                    </>
                  ) : currentStep === 10 ? (
                    <>
                      Una vez ya tengamos nuestro código de seguimiento tenemos que hacer el aviso de compra en Correo Argentino, entraremos a{' '}
                      <a 
                        href="https://epago.correoargentino.com.ar/#/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-bold no-underline"
                      >
                        Correo Argentino EPAGO
                      </a>
                      {' '}y nos registraremos e iniciaremos sesión.
                    </>
                  ) : (
                    currentStepData.description
                  )}
                </p>

                {/* Texto adicional para el paso 10 - Arriba del grid */}
                {currentStep === 10 && (
                  <p className="text-gray-300 mb-6">
                    Luego veremos un apartado para introducir un código de seguimiento, aquí pegaremos el código que nos dieron en Kakobuy y clickearemos Buscar. Una vez hecho esto veremos nuestro envío listado abajo, ahora tan sólo queda esperar a que el estado se actualice y aparezca "Listo para Declarar".
                  </p>
                )}


                

                
                {/* Información adicional para el paso 7 */}
                {currentStep === 7 && currentStepData.additionalInfo && (
                  <div className="mb-6">
                    <p className="text-gray-300">
                      {currentStepData.additionalInfo}
                    </p>
                  </div>
                )}

                {/* Imagen para el paso 7 - Antes del contenedor del FAQ */}
                {currentStep === 7 && currentStepData.image && (
                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <img 
                        src={currentStepData.image} 
                        alt="Kakobuy Rehearsal Options" 
                        className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal(currentStepData.image, "Kakobuy Rehearsal Options")}
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-300">
                        Una vez tengamos todo listo, le damos a Presentación o Submit y realizamos el pago respectivo como lo hicimos en el Paso 4. Una vez pagado podremos ver nuestro paquete en el apartado de "Ensayo" o "Rehearsal". El proceso de embalaje tarda de 1-3 días.
                      </p>
                    </div>
                  </div>
                )}

                {/* Segunda imagen para el paso 7 */}
                {currentStep === 7 && (
                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <img 
                        src="https://i.imgur.com/agV3Gc2.jpg" 
                        alt="Kakobuy Rehearsal Process" 
                        className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal("https://i.imgur.com/agV3Gc2.jpg", "Kakobuy Rehearsal Process")}
                      />
                    </div>
                  </div>
                )}

                {/* Área de contenido informativo */}
                <div className="bg-gray-700/50 rounded-lg p-4 max-w-2xl mx-auto">
                  {currentStepData.content.title && (
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {currentStepData.content.title}
                    </h3>
                  )}
                  {currentStepData.content.description && (
                    <p className="text-gray-300 mb-4">
                      {currentStepData.content.description}
                    </p>
                  )}
                  
                  {/* Imagen para el paso 8 */}
                  {currentStep === 8 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy International Shipping" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy International Shipping")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Imagen para el paso 9 */}
                  {currentStep === 9 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Tracking" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Tracking")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Imagen para el paso 10 */}
                  {currentStep === 10 && (
                    <div className="space-y-4">
                      <div className="relative max-w-md mx-auto">
                        <img 
                          src="https://i.imgur.com/T815NfX.jpg" 
                          alt="Correo Argentino EPAGO" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal("https://i.imgur.com/T815NfX.jpg", "Correo Argentino EPAGO")}
                        />
                      </div>
                    </div>
                  )}


                  {currentStepData.content.title && (
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {currentStepData.content.title}
                    </h3>
                  )}
                  {currentStepData.content.description && (
                    <p className="text-gray-300 mb-4">
                      {currentStepData.content.description}
                    </p>
                  )}
                  
                  {/* Imagen y enlace para el paso 1 */}
                  {currentStep === 1 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Registration" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Registration")}
                        />
                      </div>
                      {currentStepData.content.link && (
                        <div className="text-center">
                          <a 
                            href={currentStepData.content.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 text-white font-semibold rounded-lg hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            ¡Crear Cuenta en Kakobuy!
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Imagen para el paso 3 */}
                  {currentStep === 3 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Shopping Cart" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Shopping Cart")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Imagen para el paso 4 */}
                  {currentStep === 4 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Shipping Configuration" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Shipping Configuration")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Imagen para el paso 5 */}
                  {currentStep === 5 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Order Processing" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Order Processing")}
                        />
                      </div>
                      
                      {/* Footer con información de contacto */}
                      <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                        <p className="text-gray-300 text-sm text-center">
                          Si tienes alguna pregunta durante este proceso, puedes contactar al servicio al cliente de Kakobuy a través de 'User Center' → 'Order' → 'Message'.
                        </p>
                      </div>
                      
                      {/* Estados del pedido */}
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-white mb-4 text-center">
                          Estados de un Pedido en Kakobuy
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                          <span className="text-cyan-400 font-semibold">Pending payment:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu pago aún no fue recibido por el agente.</p>
                        </div>
                        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                          <span className="text-cyan-400 font-semibold">Paid:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu pago ya fue recibido.</p>
                        </div>
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                          <span className="text-blue-400 font-semibold">Purchased:</span>
                          <p className="text-gray-300 text-sm mt-1">El agente ya realizó la compra de tu producto.</p>
                        </div>
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                          <span className="text-blue-400 font-semibold">Shipped:</span>
                          <p className="text-gray-300 text-sm mt-1">El vendedor ya envió tu producto al warehouse.</p>
                        </div>
                        <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-3">
                          <span className="text-pink-400 font-semibold">Storing:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu producto está siendo almacenado en el warehouse.</p>
                        </div>
                        <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-3">
                          <span className="text-pink-400 font-semibold">Available for shipment:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu producto ya puede ser enviado.</p>
                        </div>
                        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
                          <span className="text-orange-400 font-semibold">Submitted:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu paquete ya está siendo procesado para enviarlo.</p>
                        </div>
                        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
                          <span className="text-orange-400 font-semibold">Shipped (International):</span>
                          <p className="text-gray-300 text-sm mt-1">Tu paquete ya fue enviado a tu país.</p>
                        </div>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                          <span className="text-green-400 font-semibold">Receipted:</span>
                          <p className="text-gray-300 text-sm mt-1">Ya recibiste tu paquete con éxito.</p>
                        </div>
                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                          <span className="text-red-400 font-semibold">Canceled:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu orden fue cancelada (posiblemente por falta de stock).</p>
                        </div>
                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                          <span className="text-red-400 font-semibold">Refunding:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu reembolso está en proceso.</p>
                        </div>
                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                          <span className="text-red-400 font-semibold">Refunded:</span>
                          <p className="text-gray-300 text-sm mt-1">Tu reembolso fue realizado con éxito.</p>
                        </div>
                                              </div>
                      </div>
                    </div>
                  )}

                  {/* Imagen para el paso 6 */}
                  {currentStep === 6 && currentStepData.content.image && (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={currentStepData.content.image} 
                          alt="Kakobuy Quality Check" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(currentStepData.content.image, "Kakobuy Quality Check")}
                        />
                      </div>
                      
                      {/* Nota importante sobre almacenamiento */}
                      <div className="mt-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <h4 className="text-blue-400 font-semibold mb-1">Nota Importante</h4>
                            <p className="text-gray-300 text-sm">
                              Kakobuy te da 180 días de almacenamiento gratis. Es ideal para que puedas juntar varios pedidos de distintos vendedores y después hacer un único envío con todo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}



                  {/* FAQ para el paso 7 */}
                  {currentStep === 7 && currentStepData.content.faq && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">
                        Preguntas Frecuentes sobre el Rehearsal
                      </h4>
                      <div className="space-y-4">
                        {currentStepData.content.faq.map((item, index) => (
                          <div key={index} className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="text-blue-400 font-semibold mb-2">
                                  {item.question}
                                </h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Métodos de búsqueda para el paso 2 */}
                  {currentStep === 2 && currentStepData.content.searchMethods && (
                    <div className="space-y-6">
                      {currentStepData.content.searchMethods.map((method, index) => (
                        <div key={index} className={`rounded-lg p-4 border transition-all duration-200 ${
                          method.recommended 
                            ? 'bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                            : 'bg-gray-600/30 border-gray-500/30'
                        }`}>
                          {method.recommended && (
                            <div className="flex items-center justify-center mb-3">
                              <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                RECOMENDADO
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/3">
                              <img 
                                src={method.image} 
                                alt={method.title}
                                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => openImageModal(method.image, method.title)}
                              />
                            </div>
                            <div className="md:w-2/3">
                              <h4 className="text-lg font-semibold text-white mb-2">
                                {method.title}
                              </h4>
                              <p className="text-gray-300 mb-4">
                                {method.description}
                              </p>
                              {method.title === "Búsqueda mediante Discord" && (
                                <div className="mt-4">
                                  <a 
                                    href="https://discord.gg/moonreps" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-lg text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 cursor-pointer"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                                    </svg>
                                    <span className="font-semibold">Únete al Discord</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Texto adicional para el paso 10 - Debajo del grid */}
                {currentStep === 10 && (
                  <div className="mt-6">
                    <p className="text-gray-300">
                      Una vez el paquete esté listo tocaremos "Declarar y pagar" y dentro del apartado tenemos que agregar TODOS los productos que hayamos comprado junto con el respectivo precio que hayamos pagado por cada uno. En la descripción de cada producto NUNCA pondremos marcas o detalles particulares, simplemente pondremos el tipo de prenda.
                    </p>
                  </div>
                )}



                {/* Grid de imágenes para el paso 10 */}
                {currentStep === 10 && (
                  <div className="mt-6 bg-gray-700/50 rounded-lg p-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <img 
                          src="https://i.imgur.com/SpNbK93.jpg" 
                          alt="Declaración Correo Argentino 1" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal("https://i.imgur.com/SpNbK93.jpg", "Declaración Correo Argentino 1")}
                        />
                      </div>
                      <div className="relative">
                        <img 
                          src="https://i.imgur.com/3sY0OVw.jpg" 
                          alt="Declaración Correo Argentino 2" 
                          className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal("https://i.imgur.com/3sY0OVw.jpg", "Declaración Correo Argentino 2")}
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                      <p className="text-orange-300 text-sm text-center">
                        Por ejemplo: si yo me compré un Short Denim Tears, en la descripción del producto a declarar pondré "Short". En precio pondremos el precio que aparece en Kakobuy como en la imagen.
                      </p>
                    </div>
                  </div>
                )}

                {/* Texto adicional para el paso 10 - Debajo del grid */}
                {currentStep === 10 && (
                  <div className="mt-6">
                    <p className="text-gray-300 mb-4">
                      Después de haber agregado todos nuestros productos tendremos que poner el costo de envío. Por más que hayamos pagado 200 USD de envío no pondremos ese número, yo siempre coloco 20 USD de valor de envío y nunca me retuvieron ningún paquete, a la Aduana lo que le importa es que declaremos bien el precio de los productos. Recomiendo utilizar 20 USD en shipping y no arriesgarse a poner menos.
                    </p>
                    <p className="text-gray-300 mb-4">
                      NUNCA marcaremos la opción de ignoro contenido del envío, la dejaremos por defecto como viene desmarcada. Debajo de eso tenemos 3 opciones para elegir:
                    </p>
                    <div className="space-y-2">
                      <p className="text-orange-300 text-base font-semibold">
                        Autorizo al correo: El correo irá a la Aduana a recibir y verificar nuestro paquete y ellos nos lo entregarán en nuestro domicilio. (RECOMENDADO)
                      </p>
                      <p className="text-gray-300 text-base">
                        <span className="text-gray-300 font-semibold">Voy a ir yo/Autorizo a otra persona:</span> Si son de Capital Federal pueden ir a Aduana a verificar y recibir el paquete ustedes mismos.
                      </p>
                    </div>
                  </div>
                )}

                {/* Imagen adicional para el paso 10 */}
                {currentStep === 10 && (
                  <div className="mt-6 bg-gray-700/50 rounded-lg p-4 max-w-lg mx-auto">
                    <div className="relative">
                      <img 
                        src="https://i.imgur.com/26ySXQD.jpg" 
                        alt="Opciones de entrega Correo Argentino" 
                        className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal("https://i.imgur.com/26ySXQD.jpg", "Opciones de entrega Correo Argentino")}
                      />
                    </div>
                  </div>
                )}

                {/* Texto final para el paso 10 */}
                {currentStep === 10 && (
                  <div className="mt-6">
                    <p className="text-gray-300">
                      Finalmente pagaremos la Declaración y tendremos que esperar. Dependiendo la opción que hayamos elegido recibiremos el paquete en nuestro hogar o nos darán un turno para ir a retirarlo en Aduana.
                    </p>
                  </div>
                )}

                {/* Texto adicional para el paso 8 - Fuera del contenedor */}
                {currentStep === 8 && (
                  <div className="mt-6">
                    <p className="text-gray-300">
                      Después de pagar el envío, tu estado será "Paid". ¡No te preocupes por el código de seguimiento todavía! Una vez que Kakobuy envíe tu paquete, el estado cambiará a "Shipped" y te darán el número de seguimiento.
                    </p>
                  </div>
                )}



                              {/* Advertencia/Instrucción */}
              {currentStepData.warning && (
                <div className="flex items-center justify-center text-orange-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {currentStepData.warning}
                </div>
              )}
              </div>
            </div>

            {/* Columna derecha - Navegación del tutorial (solo desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Navegación del Tutorial de Compra
                </h3>

                {/* Barra de progreso */}
                <div className="mb-6">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Grid de pasos */}
                <div className="grid grid-cols-5 gap-1 mb-6">
                  {tutorialSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      disabled={isTransitioning}
                      className={`p-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                        step.id === currentStep
                          ? 'bg-white text-gray-900'
                          : 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600'
                      } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {step.id}
                    </button>
                  ))}
                </div>

                {/* Indicador de paso actual */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">Paso Actual</p>
                  <p className="text-white font-medium text-base">
                    Paso {currentStep}: {currentStepData.title.split(':')[1] || currentStepData.title}
                  </p>
                </div>

                {/* Botones de navegación */}
                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || isTransitioning}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 text-base ${
                      currentStep === 1 || isTransitioning
                        ? 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:border-gray-500 hover:scale-105'
                    }`}
                  >
                    {isTransitioning ? 'Cargando...' : 'Anterior'}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === totalSteps || isTransitioning}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 text-base ${
                      currentStep === totalSteps || isTransitioning
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-105'
                    }`}
                  >
                    {isTransitioning ? 'Cargando...' : 'Siguiente'}
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 sm:py-6 mt-8 sm:mt-12">
        <p className="text-gray-400 text-xs sm:text-sm">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">© 2025 </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Moon Reps</span>
          <span className="text-gray-400"> • Todos los derechos reservados</span>
        </p>
      </footer>

      {/* Modal de imagen */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
} 