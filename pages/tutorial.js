import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';

const STEPS = [
  {
    id: 1,
    title: "Crear tu cuenta en Kakobuy",
    description: "Para comenzar, creá una cuenta en Kakobuy. Este proceso es simple y te dará acceso a todas las funciones del servicio de agente. Una vez registrado, podés empezar a comprar productos de sitios chinos de forma segura.",
    content: { image: "https://i.imgur.com/uKLNco2.jpg", link: "https://ikako.vip/r/moonreps", buttonText: "¡Crear cuenta + $410 en Cupones!" },
    warning: "Verificá tu dirección de email después del registro para activar tu cuenta.",
  },
  {
    id: 2,
    title: "Buscar y encontrar productos",
    description: "Tenemos tres formas principales de buscar productos en Kakobuy:",
    content: {
      searchMethods: [
        { title: "Búsqueda en Kakobuy", description: "Pegá la URL de cualquier producto compatible (Weidian, Taobao) directo en Kakobuy. También podés buscar con una imagen del producto.", image: "https://i.imgur.com/cKm3N4O.jpg" },
        { title: "Búsqueda en Discord", description: "Usá los bots de búsqueda con solo una foto del producto, o preguntá en los canales y la comunidad te ayuda.", image: "https://i.imgur.com/N0K3fRO.jpg", link: "https://discord.gg/3UW8ZAAWrG", buttonText: "Acceder al Discord" },
        { title: "Búsqueda en Moon Reps", description: "En nuestra web recopilamos los productos de mejor calidad. Es nuestra selección de confianza para que encuentres joyitas sin perder tiempo.", image: "https://i.imgur.com/cAwyC04.jpg", recommended: true },
      ]
    },
  },
  {
    id: 3,
    title: "Agregar productos al carrito",
    description: "Revisá los productos antes de comprar. Verificá especificaciones, tallas, colores y cantidades. Kakobuy te permite consolidar productos de diferentes vendedores en un solo envío.",
    content: { image: "https://i.imgur.com/omTi8v4.jpg" },
  },
  {
    id: 4,
    title: "Realizar el pedido y pagar",
    description: "Revisá tu carrito, elegí cómo pagar y confirmá tu pedido. Este primer pago cubre los productos y su envío dentro de China. Kakobuy admite Stripe, Criptomonedas, WeChat y Alipay.",
    content: { image: "https://i.imgur.com/KXouw7Z.jpg" },
  },
  {
    id: 5,
    title: "Kakobuy procesa tu pedido",
    description: "Después del pago, Kakobuy revisa tu pedido (3–5 horas hábiles) y compra con los vendedores. Si tenés dudas: User Center → Order → Message.",
    content: {
      image: "https://i.imgur.com/fvPcA1i.jpg",
      orderStates: [
        { status: "Pending payment", desc: "Tu pago aún no fue recibido.", color: "cyan" },
        { status: "Paid", desc: "Tu pago ya fue recibido.", color: "cyan" },
        { status: "Purchased", desc: "El agente ya realizó la compra.", color: "blue" },
        { status: "Shipped", desc: "El vendedor envió al warehouse.", color: "blue" },
        { status: "Storing", desc: "Tu producto se almacena en el warehouse.", color: "purple" },
        { status: "Available for shipment", desc: "Tu producto ya puede enviarse.", color: "purple" },
        { status: "Submitted", desc: "Tu paquete está siendo procesado.", color: "orange" },
        { status: "Shipped (International)", desc: "Tu paquete ya fue enviado a tu país.", color: "orange" },
        { status: "Receipted", desc: "¡Recibiste tu paquete con éxito!", color: "green" },
        { status: "Canceled", desc: "Orden cancelada (falta de stock).", color: "red" },
        { status: "Refunding", desc: "Tu reembolso está en proceso.", color: "red" },
        { status: "Refunded", desc: "Reembolso realizado con éxito.", color: "red" },
      ],
    },
  },
  {
    id: 6,
    title: "Quality Check y almacenamiento",
    description: "Al llegar al almacén, Kakobuy toma fotos para que compruebes la calidad. Si encontrás problemas contactate por mensaje para que te ayuden a solucionarlo.",
    content: { image: "https://i.imgur.com/SBMkr3i.jpg", importantNote: "Kakobuy te da 180 días de almacenamiento gratis. Ideal para juntar varios pedidos de distintos vendedores y hacer un único envío con todo." },
  },
  {
    id: 7,
    title: "Realizar el envío internacional",
    description: "Seleccioná todos los productos a enviar haciendo click en la casilla al costado de cada uno. Una vez seleccionados, hacé click en \"Submit\" o \"Presentar\".",
    additionalInfo: "Dentro del apartado Submit ingresá los datos de tu dirección. Si te pide TAX ID, es tu DNI.\n\nPodés agregar extras opcionales al embalaje, como \"corner protection\". Luego elegí la línea de envío y realizá el pago (en Argentina solemos usar China Post SAL: muy barato, 15–25 días de entrega).",
    content: { note: "ANTES DE CONFIRMAR Y PAGAR, PODÉS USAR TUS CUPONES DE DESCUENTO" },
    image: "https://i.imgur.com/gO6kp5B.jpg",
  },
  {
    id: 8,
    title: "Seguimiento del envío",
    description: "Rastreá tu pedido desde la sección \"Warehouse\" / \"Almacén\" en Kakobuy, o copiando el código de seguimiento en 17TRACK.",
    content: { image: "https://i.imgur.com/Glc4nGI.jpg" },
  },
  {
    id: 9,
    title: "Declaración del paquete (Argentina)",
    description: "Con el código de seguimiento listo, hacé el aviso de compra en Correo Argentino EPAGO. Registrate e iniciá sesión.",
    content: {
      link: "https://epago.correoargentino.com.ar/#/login",
      buttonText: "Ir a Correo Argentino EPAGO",
      sections: [
        { type: "text", content: "Ingresá el código de seguimiento de Kakobuy y clickeá Buscar. Tu envío aparecerá listado abajo. Esperá a que el estado diga \"Listo para Declarar\"." },
        { type: "image", src: "https://i.imgur.com/T815NfX.jpg", alt: "Lista de envíos Correo Argentino" },
        { type: "text", content: "Una vez listo, clickeá \"Declarar y pagar\" y agregá TODOS los productos con su precio. En la descripción NUNCA pongas marcas, solo el tipo de prenda (ej: \"Remera\", \"Zapatilla\")." },
        { type: "imageRow", images: [{ src: "https://i.imgur.com/SpNbK93.png", alt: "Declaración de items" }, { src: "https://i.imgur.com/3sY0OVw.png", alt: "Formulario de autorización" }] },
        { type: "tip", content: "Si compraste un Short Denim Tears, en la declaración poné solo \"Short\". Para el precio usá el que aparece en Kakobuy." },
        { type: "text", content: "Para el costo de envío, aunque hayas pagado 200 USD, siempre poné 20 USD. A la Aduana le importa que declares bien el precio de los productos, no el envío." },
        { type: "text", content: "NUNCA marques \"Ignoro contenido del envío\". Dejala desmarcada. Debajo hay 3 opciones:\n\n• **Autorizo al correo**: El correo va a Aduana, verifica y te lo entrega en tu domicilio. (RECOMENDADO)\n\n• **Voy a ir yo / Autorizo a otra persona**: Van ustedes mismos a Aduana con órdenes de compra y envío." },
        { type: "image", src: "https://i.imgur.com/26ySXQD.png", alt: "Estado final" },
        { type: "text", content: "Pagá la declaración y esperá. Dependiendo la opción elegida, recibís en tu domicilio o te dan turno para ir a Aduana." },
      ],
      declarationInfo: {
        recommendations: ["Máximo 3 artículos de la misma especie por envío (3 remeras, 3 zapatillas, etc.)", "Valor máximo $3.000 USD por pedido"],
        avoid: ["Variar mucho en talles en el mismo paquete (ej: 42 y 35)", "Repetir modelos iguales en el mismo paquete"],
        taxes: {
          freeLimit: 50,
          notes: ["En tus primeros 12 envíos del año, si el valor es ≤ $50 USD no pagás impuestos.", "Si supera los $50 USD, pagás el 50% del excedente al valor del dólar oficial."],
          example: "Paquete de 90 USD → excedente: 40 USD → impuesto: 20 USD.",
        },
      },
    },
  },
  {
    id: 10,
    title: "¡Tutorial completo!",
    description: "¡Felicitaciones! Ya sabés cómo realizar tu primera compra desde China de forma segura y confiable. Cualquier duda, la comunidad te ayuda en el Discord.",
    content: { cta: { label: "Unirse al Discord", link: "https://discord.gg/3UW8ZAAWrG" } },
  },
];

const STATE_COLORS = {
  cyan:   "bg-cyan-500/10   border-cyan-500/25   text-cyan-400",
  blue:   "bg-blue-500/10   border-blue-500/25   text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/25 text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/25 text-orange-400",
  green:  "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
  red:    "bg-red-500/10    border-red-500/25    text-red-400",
};

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('right');
  const totalSteps = STEPS.length;
  const progress = (currentStep / totalSteps) * 100;
  const step = STEPS[currentStep - 1];

  useReveal([currentStep]);

  const goNext = () => {
    if (currentStep < totalSteps) { setDirection('right'); setCurrentStep(s => s + 1); }
  };
  const goPrev = () => {
    if (currentStep > 1) { setDirection('left'); setCurrentStep(s => s - 1); }
  };
  const goTo = (n) => {
    setDirection(n > currentStep ? 'right' : 'left');
    setCurrentStep(n);
  };

  // Steps with just an image + text → two-column desktop layout
  const hasSimpleImage = !!(step.content?.image || step.image) &&
    !step.content?.sections && !step.content?.searchMethods && !step.content?.orderStates;

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <Head>
        <title>Tutorial de Compra — Moon Reps</title>
        <meta name="description" content="Aprende a comprar paso a paso con nuestra guía interactiva." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute" style={{ width: '80%', height: '100%', left: '-20%', bottom: '-25%', background: 'radial-gradient(ellipse, rgba(0,35,101,0.35) 0%, rgba(0,35,101,0.08) 55%, transparent 100%)', filter: 'blur(120px)', animation: 'driftSlow 40s ease-in-out infinite' }} />
            <div className="absolute" style={{ width: '55%', height: '65%', right: '-10%', top: '-15%', background: 'radial-gradient(ellipse, rgba(61,123,255,0.07) 0%, rgba(61,123,255,0.02) 55%, transparent 100%)', filter: 'blur(140px)', animation: 'driftSlowAlt 55s ease-in-out infinite' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(0,35,101,0.45)', border: '1px solid rgba(61,123,255,0.28)', animation: 'badgeIn 0.55s cubic-bezier(0.23,1,0.32,1) 0.3s both' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bright flex-shrink-0" style={{ animation: 'glowPulse 6s ease-in-out infinite' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#8ab4f8' }}>
                {totalSteps} pasos de compra
              </span>
            </div>

            <h1 className="font-display text-white animate-fade-up" style={{ fontSize: 'clamp(2.5rem, 11vw, 8.5rem)', lineHeight: 0.88, letterSpacing: '-0.015em', maxWidth: '14ch' }}>
              Guía de<br /><span style={{ color: 'rgba(255,255,255,0.48)' }}>compra</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mt-7 animate-fade-up" style={{ maxWidth: '460px', animationDelay: '90ms' }}>
              Todo lo que necesitás saber para importar tus productos favoritos de forma segura.
            </p>
          </div>
        </section>

        {/* ── STEPPER ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

          {/* Progress bar + meta */}
          <div className="mb-8 reveal">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">
                Paso <span className="text-white font-bold">{currentStep}</span> de {totalSteps}
              </span>
              <span className="text-sm font-bold" style={{ color: '#3D7BFF' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #002365, #3D7BFF)',
                  transition: 'width 450ms cubic-bezier(0.23,1,0.32,1)',
                }}
              />
            </div>
          </div>

          {/* Step indicator (desktop) */}
          <div className="hidden md:flex items-center gap-0 mb-10 reveal" style={{ transitionDelay: '60ms' }}>
            {STEPS.map((s, i) => {
              const n = i + 1;
              const done = n < currentStep;
              const active = n === currentStep;
              return (
                <div key={n} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => goTo(n)}
                    className="relative flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-300"
                    style={{
                      background: done ? '#002365' : active ? '#3D7BFF' : 'rgba(255,255,255,0.05)',
                      border: active ? '2px solid rgba(61,123,255,0.7)' : done ? '2px solid rgba(0,35,101,0.6)' : '2px solid rgba(255,255,255,0.08)',
                      color: done || active ? '#fff' : '#52525b',
                      boxShadow: active ? '0 0 0 4px rgba(61,123,255,0.15)' : 'none',
                    }}
                    title={s.title}
                  >
                    {done ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : n}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px mx-1"
                      style={{
                        background: n < currentStep
                          ? 'linear-gradient(90deg, #002365, rgba(0,35,101,0.4))'
                          : 'rgba(255,255,255,0.07)',
                        transition: 'background 400ms',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: '#0f1a2e',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Background step number */}
            <div
              className="absolute -top-4 -right-4 font-display select-none pointer-events-none"
              style={{ fontSize: 'clamp(8rem, 18vw, 14rem)', lineHeight: 1, color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.02em' }}
              aria-hidden="true"
            >
              {currentStep}
            </div>

            {/* Animated content */}
            <div
              key={`step-${currentStep}-${direction}`}
              className="relative z-10 p-6 sm:p-8"
              style={{ animation: `${direction === 'right' ? 'slideInRight' : 'slideInLeft'} 0.38s cubic-bezier(0.23,1,0.32,1) both` }}
            >
              {/* Step label + title — always shown */}
              <div className="mb-5">
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#3D7BFF' }}>
                  Paso {currentStep}
                </p>
                <h2 className="font-display text-white" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
                  {step.title}
                </h2>
              </div>

              {hasSimpleImage ? (
                /* ── TWO-COLUMN: text left, image right ── */
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 md:items-center gap-5">

                  {/* Left: text + extras + CTA */}
                  <div className="space-y-4">
                    <p className="text-zinc-300 text-base leading-relaxed">{step.description}</p>

                    {step.warning && (
                      <div className="flex gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-4">
                        <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                        <p className="text-amber-200 text-sm leading-relaxed">{step.warning}</p>
                      </div>
                    )}

                    {step.additionalInfo && (
                      <div className="space-y-3">
                        {step.additionalInfo.split('\n\n').map((p, i) => (
                          <p key={i} className="text-zinc-300 text-sm leading-relaxed">{p}</p>
                        ))}
                      </div>
                    )}

                    {(step.content?.importantNote || step.content?.note) && (
                      <div className="flex gap-3 rounded-2xl p-4" style={{ background: 'rgba(61,123,255,0.08)', border: '1px solid rgba(61,123,255,0.2)' }}>
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3D7BFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                          {step.content?.importantNote && (
                            <>
                              <p className="text-sm font-bold mb-1" style={{ color: '#3D7BFF' }}>Nota importante</p>
                              <p className="text-zinc-300 text-sm leading-relaxed">{step.content.importantNote}</p>
                            </>
                          )}
                          {step.content?.note && (
                            <p className="text-sm font-bold tracking-wide" style={{ color: '#3D7BFF' }}>{step.content.note}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step.content?.link && (
                      <div>
                        <a href={step.content.link} target="_blank" rel="noopener noreferrer"
                          className="btn btn-primary px-7 py-3 text-sm font-bold gap-2">
                          {step.content.buttonText || "Acceder"}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: image constrained */}
                  <div className="relative rounded-2xl overflow-hidden border border-surface-700/60 flex items-center justify-center" style={{ background: '#0a1220', minHeight: '180px' }}>
                    <Image
                      src={step.content?.image || step.image}
                      alt={step.title}
                      width={800}
                      height={600}
                      className="w-full object-contain"
                      style={{ maxHeight: '280px' }}
                      unoptimized
                    />
                  </div>
                </div>

              ) : (
                /* ── SINGLE COLUMN: complex steps ── */
                <div className="space-y-5">

                  {/* Declaration info (paso 9) */}
                  {step.content?.declarationInfo && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-4">
                        <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          Recomendaciones
                        </div>
                        <ul className="space-y-1.5">
                          {step.content.declarationInfo.recommendations.map((r, i) => (
                            <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-4">
                        <div className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          Evitar
                        </div>
                        <ul className="space-y-1.5">
                          {step.content.declarationInfo.avoid.map((a, i) => (
                            <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-500 flex-shrink-0">•</span>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:col-span-2 bg-accent/10 border border-accent-bright/20 rounded-2xl p-4">
                        <div className="text-accent-bright font-bold text-sm mb-2">Impuestos</div>
                        <ul className="space-y-1 mb-2">
                          {step.content.declarationInfo.taxes.notes.map((n, i) => (
                            <li key={i} className="text-sm text-zinc-300">{n}</li>
                          ))}
                        </ul>
                        <div className="font-mono text-xs text-accent-bright bg-accent/15 rounded-xl px-4 py-2 inline-block">
                          Ejemplo: {step.content.declarationInfo.taxes.example}
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-zinc-300 text-base leading-relaxed">{step.description}</p>

                  {/* CTA final (paso 10) */}
                  {step.content?.cta && (
                    <div className="flex justify-center py-4">
                      <a href={step.content.cta.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary px-10 py-4 text-base font-bold gap-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                        </svg>
                        {step.content.cta.label}
                      </a>
                    </div>
                  )}

                  {/* Search methods (paso 2) */}
                  {step.content?.searchMethods && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {step.content.searchMethods.map((m, i) => (
                        <div key={i} className={`flex flex-col rounded-2xl overflow-hidden border ${m.recommended ? 'border-accent-bright/30' : 'border-surface-700/60'}`}
                          style={{ background: '#18253d' }}>
                          {m.recommended && (
                            <div className="px-4 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-2"
                              style={{ background: 'rgba(61,123,255,0.12)', color: '#3D7BFF', borderBottom: '1px solid rgba(61,123,255,0.2)' }}>
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" style={{ animation: 'glowPulse 6s ease-in-out infinite' }} />
                              Recomendado
                            </div>
                          )}
                          <div className="relative overflow-hidden" style={{ height: '130px' }}>
                            <Image src={m.image} alt={m.title} width={400} height={225}
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" unoptimized />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-white mb-1.5 text-sm">{m.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{m.description}</p>
                            {m.link && (
                              <a href={m.link} target="_blank" rel="noopener noreferrer"
                                className="btn btn-secondary mt-3 py-2 text-xs justify-center">{m.buttonText}</a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Order states (paso 5) */}
                  {step.content?.orderStates && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Estados del pedido</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {step.content.orderStates.map((s, i) => (
                          <div key={i} className={`${STATE_COLORS[s.color]} border rounded-xl p-3`}>
                            <span className="block font-bold text-sm mb-0.5">{s.status}</span>
                            <p className="text-zinc-400 text-xs leading-snug">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed sections (paso 9) */}
                  {step.content?.sections && (
                    <div className="space-y-4">
                      {step.content.sections.map((section, idx) => {
                        if (section.type === 'text') return (
                          <p key={idx} className="text-zinc-300 leading-relaxed whitespace-pre-line">
                            {section.content.split('**').map((part, i) =>
                              i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                            )}
                          </p>
                        );
                        if (section.type === 'image') return (
                          <div key={idx} className="relative rounded-2xl overflow-hidden border border-surface-700/60" style={{ background: '#0a1220' }}>
                            <Image src={section.src} alt={section.alt || ''} width={1200} height={800}
                              className="w-full object-contain" style={{ maxHeight: '260px' }} unoptimized />
                          </div>
                        );
                        if (section.type === 'imageRow') return (
                          <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {section.images.map((img, j) => (
                              <div key={j} className="relative rounded-2xl overflow-hidden border border-surface-700/60" style={{ background: '#0a1220' }}>
                                <Image src={img.src} alt={img.alt || ''} width={1200} height={800}
                                  className="w-full object-contain" style={{ maxHeight: '200px' }} unoptimized />
                              </div>
                            ))}
                          </div>
                        );
                        if (section.type === 'tip') return (
                          <div key={idx} className="flex gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-4">
                            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            <p className="text-amber-200 text-sm italic leading-relaxed">&ldquo;{section.content}&rdquo;</p>
                          </div>
                        );
                        return null;
                      })}
                    </div>
                  )}

                  {/* Main CTA button (paso 9) */}
                  {step.content?.link && (
                    <div className="flex justify-center">
                      <a href={step.content.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary px-8 py-3.5 text-sm font-bold gap-2">
                        {step.content.buttonText || "Acceder"}
                      </a>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5 border-t border-surface-800">
              <button
                onClick={goPrev}
                disabled={currentStep === 1}
                className="btn btn-secondary px-5 py-2.5 text-sm gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>

              {/* Mobile step dots */}
              <div className="flex items-center gap-1.5 md:hidden">
                {STEPS.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: i + 1 === currentStep ? '#3D7BFF' : i + 1 < currentStep ? 'rgba(61,123,255,0.4)' : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>

              <div className="hidden md:block text-sm text-zinc-500">
                {currentStep} / {totalSteps}
              </div>

              <button
                onClick={goNext}
                disabled={currentStep === totalSteps}
                className="btn btn-primary px-5 py-2.5 text-sm gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {currentStep === totalSteps ? 'Completado' : 'Siguiente'}
                {currentStep < totalSteps && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
