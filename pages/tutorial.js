import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const tutorialSteps = [
    {
      id: 1,
      title: "Paso 1: Cómo crear tu cuenta para comprar en Kakobuy",
      description: "Para comenzar a usar Kakobuy, necesitas crear una cuenta en su plataforma. Este proceso es simple y te permitirá acceder a todas las funciones del servicio de agente. Una vez registrado, podrás empezar a comprar productos de sitios chinos de forma segura y confiable.",
      content: {
        image: "https://i.imgur.com/uKLNco2.jpg",
        link: "https://ikako.vip/r/moonreps",
        buttonText: "¡Crea tu cuenta de Kakobuy! (+ $410 en Cupones)"
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
            image: "https://i.imgur.com/N0K3fRO.jpg",
            link: "https://discord.gg/3UW8ZAAWrG",
            buttonText: "Accede al Discord"
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
      description: "Después de que realizas el pago, Kakobuy revisa tu pedido (generalmente en 3-5 horas hábiles) y realiza los pedidos con los vendedores. Si tienes alguna pregunta durante este proceso, puedes contactar al servicio al cliente de Kakobuy a través de 'User Center' → 'Order' → 'Message'.",
      content: {
        image: "https://i.imgur.com/fvPcA1i.jpg",
        orderStates: [
          { status: "Pending payment", desc: "Tu pago aún no fue recibido por el agente.", color: "cyan" },
          { status: "Paid", desc: "Tu pago ya fue recibido.", color: "cyan" },
          { status: "Purchased", desc: "El agente ya realizó la compra de tu producto.", color: "blue" },
          { status: "Shipped", desc: "El vendedor ya envió tu producto al warehouse.", color: "blue" },
          { status: "Storing", desc: "Tu producto está siendo almacenado en el warehouse.", color: "purple" },
          { status: "Available for shipment", desc: "Tu producto ya puede ser enviado.", color: "purple" },
          { status: "Submitted", desc: "Tu paquete ya está siendo procesado para enviarlo.", color: "orange" },
          { status: "Shipped (International)", desc: "Tu paquete ya fue enviado a tu país.", color: "orange" },
          { status: "Receipted", desc: "Ya recibiste tu paquete con éxito.", color: "green" },
          { status: "Canceled", desc: "Tu orden fue cancelada (posiblemente por falta de stock).", color: "red" },
          { status: "Refunding", desc: "Tu reembolso está en proceso.", color: "red" },
          { status: "Refunded", desc: "Tu reembolso fue realizado con éxito.", color: "red" }
        ]
      }
    },
    {
      id: 6,
      title: "Paso 6: Quality Check y almacenamiento",
      description: "Una vez lleguen tus productos al almacén, Kakobuy tomará varias fotos para que compruebes la calidad de los mismos. Si encuentras problemas o fallas revisando las fotos puedes contactarte por mensaje para que te ayuden a solucionarlo.",
      content: {
        image: "https://i.imgur.com/SBMkr3i.jpg",
        importantNote: "Kakobuy te da 180 días de almacenamiento gratis. Es ideal para que puedas juntar varios pedidos de distintos vendedores y después hacer un único envío con todo."
      }
    },
    {
      id: 7,
      title: "Paso 7: Realizar envío internacional",
      description: "Seleccionaremos todos los productos que queramos enviar en un mismo paquete haciendo click en la pestaña al costado de cada producto. Una vez seleccionados haremos click en \"Submit\" o \"Presentar\".",
      additionalInfo: "Una vez dentro del apartado de Submit pondremos los datos de nuestra direcci\u00f3n de env\u00edo. Si en alg\u00fan apartado les pide el TAX ID es el DNI. Tendremos para elegir estos extras opcionales para agregar a nuestro embalaje. Yo no suelo utilizar ninguna pero pueden usar \"corner protection\" para proteger m\u00e1s su paquete.\n\nLuego de eso tendremos que elegir la l\u00ednea de env\u00edo y realizar el pago como en el paso 4 (en Argentina solemos usar China Post SAL ya que es muy barato y tarda entre 15-25d).",
      image: "https://i.imgur.com/gO6kp5B.jpg",
      content: {
        note: "ANTES DE TOCAR SUBMIT Y PAGAR PODREMOS HACER USO DE LOS CUPONES DE DESCUENTO"
      }
    },
    {
      id: 8,
      title: "Paso 8: Seguimiento internacional",
      description: "Puedes rastrear tu pedido desde la sección de \"Warehouse\"/\"Almacén\" o copiando el código de seguimiento en 17TRACK.",
      content: {
        image: "https://i.imgur.com/Glc4nGI.jpg"
      }
    },
    {
      id: 9,
      title: "Paso 9: Declaración del Paquete (Argentina)",
      description: "Una vez ya tengamos nuestro código de seguimiento tenemos que hacer el aviso de compra en Correo Argentino, entraremos a Correo Argentino EPAGO y nos registraremos e iniciaremos sesión.",
      content: {
        link: "https://epago.correoargentino.com.ar/#/login",
        buttonText: "Ir a Correo Argentino EPAGO",
        sections: [
          {
            type: "text",
            content: "Luego veremos un apartado para introducir un código de seguimiento, aquí pegaremos el código que nos dieron en Kakobuy y clickearemos Buscar. Una vez hecho esto veremos nuestro envío listado abajo, ahora tan sólo queda esperar a que el estado se actualice y aparezca \"Listo para Declarar\"."
          },
          {
            type: "image",
            src: "https://i.imgur.com/T815NfX.jpg",
            alt: "Lista de envíos Correo Argentino"
          },
          {
            type: "text",
            content: "Una vez el paquete esté listo tocaremos \"Declarar y pagar\" y dentro del apartado tenemos que agregar TODOS los productos que hayamos comprado junto con el respectivo precio que hayamos pagado por cada uno. En la descripción de cada producto NUNCA pondremos marcas o detalles particulares, simplemente pondremos el tipo de prenda."
          },
          {
            type: "imageRow",
            images: [
              {
                src: "https://i.imgur.com/SpNbK93.png",
                alt: "Ejemplo de declaraci\u00f3n de items"
              },
              {
                src: "https://i.imgur.com/3sY0OVw.png",
                alt: "Formulario de env\u00edo y autorizaci\u00f3n"
              }
            ]
          },
          {
            type: "tip",
            content: "Por ejemplo: si yo me compré un Short Denim Tears, en la descripción del producto a declarar pondré \"Short\". En precio pondremos el precio que aparece en Kakobuy como en la imagen."
          },
          {
            type: "text",
            content: "Después de haber agregado todos nuestros productos tendremos que poner el costo de envío. Por más que hayamos pagado 200 USD de envío no pondremos ese número, yo siempre coloco 20 USD de valor de envío y nunca me retuvieron ningún paquete, a la Aduana lo que le importa es que declaremos bien el precio de los productos. Recomiendo utilizar 20 USD en shipping y no arriesgarse a poner menos."
          },
          {
            type: "text",
            content: "NUNCA marcaremos la opción de \"Ignoro contenido del envío\", la dejaremos por defecto como viene desmarcada. Debajo de eso tenemos 3 opciones para elegir:\n\n• **Autorizo al correo**: El correo irá a la Aduana a recibir y verificar nuestro paquete y ellos nos lo entregarán en nuestro domicilio. (RECOMENDADO)\n\n\u2022 **Voy a ir yo/Autorizo a otra persona**: Pueden ir ustedes mismos a Aduana a verificar y recibir el paquete ustedes mismos pero tendr\u00e1n que llevar ordenes de compra y env\u00edo"
          },
          
          {
            type: "image",
            src: "https://i.imgur.com/26ySXQD.png",
            alt: "Estado final"
          },
          {
            type: "text",
            content: "Finalmente pagaremos la Declaración y tendremos que esperar. Dependiendo la opción que hayamos elegido recibiremos el paquete en nuestro hogar o nos darán un turno para ir a retirarlo en Aduana."
          }
        ],
        declarationInfo: {
          recommendations: [
            "Traer como máximo 3 artículos de la misma especie por envío. (3 remeras, 3 pantalones, 3 zapatillas, etc.)",
            "Valor máximo $3000 USD por pedido"
          ],
          avoid: [
            "Variar mucho en talles (ej: talle 42 y 35)",
            "Repetir modelos iguales en el mismo paquete"
          ],
          taxes: {
            freeLimit: 50,
            taxRate: 0.5,
            notes: [
              "En tus primeros 12 envíos del año, siempre que el valor del paquete sea de 50 USD o menos no pagas impuestos.",
              "Si supera los 50 USD, pagas el 50% del excedente al valor del dólar oficial."
            ],
            example: "Si tu paquete vale 90 USD: 90 - 50 = 40 USD excedente. Impuesto = 20 USD."
          }
        }
      }
    },
    {
      id: 10,
      title: "\u00a1Fin del Tutorial!",
      description: "\u00a1Felicitaciones! Has completado el tutorial completo de Kakobuy. Ahora ya sabes c\u00f3mo realizar tu primera compra desde China de forma segura y confiable.",
      content: {
        cta: {
          label: "Acceder al Discord",
          link: "https://discord.gg/3UW8ZAAWrG"
        }
      }
    }
  ];

  const currentStepData = tutorialSteps.find(step => step.id === currentStep);
  const progress = (currentStep / totalSteps) * 100;
  const hasContent = Boolean(
    currentStepData?.content?.link ||
    currentStepData?.content?.declarationInfo ||
    currentStepData?.content?.sections ||
    currentStepData?.content?.image ||
    currentStepData?.image ||
    currentStepData?.content?.images ||
    currentStepData?.content?.searchMethods ||
    currentStepData?.content?.orderStates ||
    currentStepData?.content?.importantNote ||
    currentStepData?.content?.note
  );

  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col">
      <Head>
        <title>Tutorial de Compra - Moon Reps</title>
        <meta name="description" content="Aprende a comprar paso a paso con nuestra guía interactiva." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-white mb-4">
            Guía de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Compra</span>
          </h1>
          <p className="text-zinc-400">
            Aprende a importar tus productos favoritos de manera segura y sencilla.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar de Pasos (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-2">
            {tutorialSteps.map((step, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentStep(stepNum)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${isActive
                    ? 'bg-surface-800 text-white shadow-md border border-surface-700'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-surface-900'
                    }`}
                >
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border flex-shrink-0
                    ${isActive ? 'bg-primary-500 border-primary-400 text-white' :
                      isCompleted ? 'bg-surface-700 border-surface-600 text-zinc-300' :
                        'bg-transparent border-surface-700 text-zinc-600'}
                  `}>
                    {stepNum}
                  </span>
                  <span className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-white' : ''}`}>
                    {step.title.split(":")[0]} {/* Mostrar solo "Paso X" o título corto */}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-9 space-y-6">
            {/* Barra de Progreso (Mobile) */}
            <div className="lg:hidden mb-6">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Paso {currentStep} de {totalSteps}</span>
                <span>{Math.round(progress)}% completado</span>
              </div>
              <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Tarjeta de Paso */}
            <div className="bg-surface-900 border border-surface-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
              {/* Número de fondo gigante */}
              <div className="absolute -top-6 -right-6 text-[12rem] font-bold text-surface-800/20 select-none pointer-events-none">
                {currentStep}
              </div>

              <div className="relative z-10 flex-grow space-y-6">
                <h2 className="text-3xl font-bold text-white font-display">
                  {currentStepData.title}
                </h2>

                {/* 2. Información de Declaración */}
                {currentStepData.content?.declarationInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Recomendaciones */}
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-lg">
                          <span>✅</span> Recomendaciones y límites:
                        </div>
                        <ul className="space-y-2 text-emerald-200/80 text-sm">
                          {currentStepData.content.declarationInfo.recommendations.map((item, i) => (
                            <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                      {/* A Evitar */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3 text-red-400 font-bold text-lg">
                          <span>❌</span> Lo que debes evitar:
                        </div>
                        <ul className="space-y-2 text-red-200/80 text-sm">
                          {currentStepData.content.declarationInfo.avoid.map((item, i) => (
                            <li key={i} className="flex gap-2"><span className="text-red-500">•</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Impuestos */}
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-lg">
                          <span>❓</span> Preguntas Frecuentes:
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-300 text-sm mb-1">¿Cuándo no pago impuestos?</h4>
                          <p className="text-blue-200/80 text-sm">En tus primeros 12 envíos del año, siempre que el valor del paquete sea de {currentStepData.content.declarationInfo.taxes.freeLimit} USD o menos.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-300 text-sm mb-1">¿Qué pasa si mi paquete vale más de 50 USD?</h4>
                          <ul className="space-y-1 text-blue-200/80 text-sm mb-3">
                            {currentStepData.content.declarationInfo.taxes.notes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                          <div className="bg-blue-500/20 rounded-lg p-3 text-xs text-blue-200 font-mono">
                            <strong>Ejemplo práctico:</strong><br />
                            {currentStepData.content.declarationInfo.taxes.example}
                          </div>
                        </div>
                      </div>
                  </div>
                )}

                <p className="text-xl text-zinc-300 leading-relaxed">
                  {currentStepData.description}
                </p>

                {currentStepData.content?.cta && (
                  <div className="flex justify-center">
                    <a
                      href={currentStepData.content.cta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary px-10 py-4 text-lg font-bold shadow-lg shadow-primary-500/20 inline-flex items-center gap-3"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-6 h-6 fill-current"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037 13.796 13.796 0 00-.61 1.252 18.661 18.661 0 00-5.487 0 13.747 13.747 0 00-.61-1.252.077.077 0 00-.078-.037A19.736 19.736 0 003.684 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.056 19.926 19.926 0 006.03 3.028.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.105 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 01.078.01c.12.099.246.197.372.291a.077.077 0 01-.006.128 12.28 12.28 0 01-1.873.892.077.077 0 00-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.903 19.903 0 006.031-3.028.077.077 0 00.031-.055c.5-5.177-.838-9.673-3.548-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.156-1.086-2.156-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.095 2.156 2.42 0 1.333-.955 2.418-2.156 2.418zm7.974 0c-1.183 0-2.156-1.086-2.156-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.175 1.095 2.156 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                      </svg>
                      {currentStepData.content.cta.label}
                    </a>
                  </div>
                )}

                {currentStepData.warning && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-200 text-sm">
                    ⚠️ {currentStepData.warning}
                  </div>
                )}

                {currentStepData.additionalInfo && (
                  <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                    {currentStepData.additionalInfo.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Contenido específico según el paso */}
                {hasContent && (
                  <div className="bg-surface-800/50 rounded-2xl p-6 border border-surface-700/50 mt-8 space-y-8">

                  {/* 1. Link Principal */}
                  {currentStepData.content?.link && (
                    <div className="flex justify-center pb-4 border-b border-surface-700/50 mb-4">
                      <a
                        href={currentStepData.content.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary px-8 py-3 text-lg font-bold shadow-lg shadow-primary-500/20 transform hover:scale-105 transition-all"
                      >
                        {currentStepData.content.buttonText || "Acceder al Sitio"}
                      </a>
                    </div>
                  )}

                  

                  {/* 3. Secciones Detalladas */}
                  {currentStepData.content?.sections && (
                    <div className="space-y-8 mb-8">
                      {currentStepData.content.sections.map((section, idx) => {
                        if (section.type === 'text') {
                          return (
                            <p key={idx} className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
                              {section.content.split('**').map((part, i) =>
                                i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                              )}
                            </p>
                          );
                        }
                        if (section.type === 'image') {
                          return (
                            <div key={idx} className="relative aspect-auto rounded-xl overflow-hidden border border-surface-700 shadow-lg bg-surface-800">
                              <Image
                                src={section.src}
                                alt={section.alt || "Imagen del tutorial"}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                                unoptimized
                              />
                            </div>
                          );
                        }
                        if (section.type === 'imageRow') {
                          return (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {section.images.map((img, imageIdx) => (
                                <div key={imageIdx} className="relative aspect-auto rounded-xl overflow-hidden border border-surface-700 shadow-lg bg-surface-800">
                                  <Image
                                    src={img.src}
                                    alt={img.alt || "Imagen del tutorial"}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        }
                        if (section.type === 'tip') {
                          return (
                            <div key={idx} className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-5 text-orange-200">
                              <div className="font-bold mb-2 flex items-center gap-2 text-orange-400 uppercase tracking-wide text-sm">
                                <span>💡</span> Ejemplo Práctico
                              </div>
                              <p className="leading-relaxed text-sm italic">
                                "{section.content}"
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}

                  {/* Imágenes principales (Single or Array) */}
                  {(currentStepData.content?.image || currentStepData.image) && !currentStepData.content?.sections && !currentStepData.content?.images && (
                    <div className="relative aspect-auto rounded-xl overflow-hidden border border-surface-700 shadow-lg">
                      <Image
                        src={currentStepData.content?.image || currentStepData.image}
                        alt={currentStepData.title}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Imágenes Múltiples (Paso 9) */}
                  {currentStepData.content?.images && !currentStepData.content?.sections && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStepData.content.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-surface-700 shadow-lg">
                          <Image
                            src={img}
                            alt={`${currentStepData.title} ${idx + 1}`}
                            width={600}
                            height={337}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}



                  {/* Métodos de Búsqueda (Paso 2) */}
                  {currentStepData.content?.searchMethods && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentStepData.content.searchMethods.map((method, idx) => (
                        <div key={idx} className={`bg-surface-900 p-5 rounded-2xl border ${method.recommended ? 'border-primary-500 ring-1 ring-primary-500/50' : 'border-surface-700'} flex flex-col h-full shadow-lg`}>
                          {method.recommended && <div className="text-xs font-bold text-primary-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" /> Recomendado
                          </div>}
                          <h3 className="font-bold text-white mb-3 text-lg">{method.title}</h3>
                          <div className="relative aspect-video mb-4 rounded-xl overflow-hidden border border-surface-700 bg-surface-800">
                            <Image
                              src={method.image}
                              alt={method.title}
                              width={400}
                              height={225}
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                          </div>
                          <p className="text-sm text-zinc-400 mb-6 flex-grow leading-relaxed">{method.description}</p>
                          {method.link && (
                            <a
                              href={method.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary w-full justify-center py-2 text-sm font-semibold"
                            >
                              {method.buttonText || "Ver más"}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Estados del Pedido (Paso 5) */}
                  {currentStepData.content?.orderStates && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 text-center">Estados de un Pedido en Kakobuy</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentStepData.content.orderStates.map((state, idx) => {
                          const colors = {
                            cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
                            blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
                            purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
                            orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
                            green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                            red: "bg-red-500/10 border-red-500/20 text-red-400"
                          };
                          return (
                            <div key={idx} className={`${colors[state.color]} border rounded-xl p-4 transition-all hover:bg-opacity-20`}>
                              <span className="block font-bold text-lg mb-1">{state.status}:</span>
                              <p className="text-zinc-300 text-sm leading-snug">{state.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Notas Importantes (Paso 6, 7) */}
                  {(currentStepData.content?.importantNote || currentStepData.content?.note) && (
                    <div className="bg-primary-500/10 border border-primary-500/20 p-5 rounded-xl flex gap-4 items-start">
                      <div className="text-2xl">💡</div>
                      <div>
                        {currentStepData.content?.importantNote && (
                          <>
                            <div className="font-bold text-primary-300 mb-1">Nota Importante</div>
                            <p className="text-primary-100 text-sm leading-relaxed">{currentStepData.content.importantNote}</p>
                          </>
                        )}
                        {currentStepData.content?.note && (
                          <p className="text-primary-200 font-bold text-sm tracking-wide">{currentStepData.content.note}</p>
                        )}
                      </div>
                    </div>
                  )}

                  </div>
                )}
              </div>

              {/* Navegación */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-surface-800 relative z-10">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className="btn btn-secondary px-6 py-2 disabled:opacity-30 disabled:hover:bg-surface-800"
                >
                  Anterior
                </button>

                <div className="hidden sm:block text-zinc-500 text-sm">
                  {currentStep} / {totalSteps}
                </div>

                <button
                  onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                  disabled={currentStep === totalSteps}
                  className="btn btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
