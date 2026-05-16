Voy a rediseñar por completo mi sitio "Moon Reps" (moonreps.vercel.app). Es un catálogo web de streetwear y réplicas premium con 3 vistas: Catálogo de productos (home), Vendedores Recomendados y Tutorial de Compra. Los productos redirigen a links externos de Kakobuy, no hay pasarela de pagos. El sitio actual se ve como un template genérico y necesita una identidad visual fuerte, moderna y profesional que se sienta como una app premium de streetwear (nivel StockX, GOAT, Nike SNKRS, Kith).

## INSTRUCCIONES CRÍTICAS

### 1. Skills

Antes de escribir una sola línea de código, buscá, instalá y leé de https://www.skills.sh todas las skills que consideres necesarias para lograr un resultado profesional de la más alta calidad. Como mínimo instalá y seguí las directrices de:

- leonxlnx/taste-skill → Design taste de alto nivel, evitar estética AI genérica, coherencia visual premium
- pbakaus/impeccable → Polish y delight (microinteracciones que sorprendan)
- emilkowalski/skill → Animaciones con propósito, sutiles y fluidas
- anthropics/skills/frontend-design → Guidelines de diseño frontend profesional
- vercel-labs/agent-skills → Best practices de React y web design
- heygen-com/hyperframes/gsap → Animaciones avanzadas de scroll y entrada

Si encontrás otras skills en https://www.skills.sh que puedan mejorar el resultado (diseño, animaciones, componentes, performance, accesibilidad, tailwind, shadcn), instalalas y usalas sin preguntarme.

### 2. Análisis del sitio actual

Antes de diseñar nada, analizá el sitio actual en moonreps.vercel.app (las 3 vistas) para entender:
- La estructura de datos existente (productos, categorías, vendedores, pasos del tutorial)
- Los links y CTAs que deben mantenerse (Kakobuy, Discord, catálogos de vendedores)
- La lógica de filtros y paginación
- Todo lo que funciona a nivel lógico se mantiene — lo que cambia es 100% lo visual y la experiencia

### 3. Design System — Configurá primero

- Dark mode profundo como base (#0a0a0a, #111111, #1a1a1a para capas de profundidad)
- NO uses grises genéricos — usá negros con matices que generen profundidad y atmósfera
- Acento principal vibrante (violeta eléctrico, cyan, o verde lima — elegí UNO dominante y usalo con intención)
- Tipografía con carácter: una fuente display bold para títulos que impacte (no Inter, no Roboto, no Arial, no system fonts) y una sans-serif limpia para body. Buscá fonts en Google Fonts que tengan personalidad
- Variables CSS para todos los colores, espaciados, radios y bordes
- Consistencia absoluta entre las 3 vistas
- El design system debe sentirse streetwear/urbano/premium, no corporativo ni tech startup

### 4. Animaciones y efectos — Esto diferencia el sitio

- Entrada de página: staggered reveal de elementos (fade-up con delay escalonado)
- Product cards: hover con scale sutil (1.02-1.05), glow en el borde, elevación de sombra, transición de 300ms ease-out
- Filtros de categoría: transición suave al seleccionar, indicador animado que se desliza
- Scroll animations: elementos que aparecen suavemente al entrar en viewport (IntersectionObserver o Framer Motion)
- Botones: efecto ripple o shimmer en hover, transición de color fluida
- Navbar: blur backdrop en scroll (glassmorphism), transición suave al hacer scroll
- Hero section: gradient mesh animado o efecto glow pulsante sutil de fondo
- Page transitions: fade suave entre vistas
- Loading: skeleton screens con shimmer animation para las cards mientras cargan las imágenes
- Stepper del tutorial: transición animada entre pasos, barra de progreso con fill animado
- Cursores personalizados o efectos de cursor si suman a la experiencia

### 5. Componentes específicos

**NAVBAR:**
- Sticky con backdrop-blur y borde inferior sutil
- Logo Moon Reps a la izquierda
- Links de navegación con underline animado en hover
- Efecto de transparencia → sólido al scrollear
- Hamburger menu animado en mobile (transición X)

**HERO (Home):**
- Título grande, bold, impactante — que se sienta como un statement
- Subtítulo descriptivo: "Seleccionamos manualmente lo mejor en calidad para que tus compras en Kakobuy sean rápidas y seguras"
- 2 CTAs: Kakobuy registro (primario, con color acento, efecto shimmer o glow) y Discord (secundario, outline con hover fill)
- Fondo con efecto visual que genere atmósfera (gradient mesh, glow, noise texture, o partículas sutiles)
- Badge o chip animado tipo "🔥 +1000 productos seleccionados" con entrada delayed

**PRODUCT CARDS:**
- Imagen con aspect-ratio consistente, object-fit cover
- Lazy loading con skeleton placeholder shimmer
- Nombre del producto (truncado con ellipsis si es largo)
- Precio con formato claro y tamaño destacado
- Badge "★ DESTACADO" con glow animado pulsante para los productos destacados
- Botón comprar que aparece con slide-up o se transforma en hover
- Hover: toda la card se eleva sutilmente con borde glow del color acento
- La card completa debe sentirse como un objeto premium, no como un div con borde

**FILTROS DE CATEGORÍA:**
- Las categorías son: Todos (1000), Remeras (255), Pantalones (140), Abrigos (192), Accesorios (135), Zapatillas (101), Conjuntos (1), Shorts (61), Conjuntos 2 (4), Girls (91)
- Pills/chips horizontales scrolleables en mobile
- Contador de productos visible en cada categoría
- Indicador activo animado (sliding indicator que se desliza, no solo cambio de color)
- Transición suave del contenido al cambiar categoría (fade o slide)

**PAGINACIÓN:**
- Diseño minimalista con números de página
- Botones anterior/siguiente
- Página actual destacada con acento
- Transición suave al cambiar de página

**VENDOR CARDS (Vista Vendedores):**
- Diseño claramente diferenciado de las product cards
- Nombre del vendedor prominente y bold
- Tag de categoría (Ropa/Zapatillas/Accesorios) con color coding por tipo
- Descripción corta del vendedor
- Botón "Visitar catálogo" con arrow icon que se mueve en hover
- Hover: borde lateral con acento de color que crece desde abajo o efecto de iluminación lateral
- Filtros por categoría: Todos, Ropa, Zapatillas, Accesorios

**STEPPER (Vista Tutorial):**
- 10 pasos de compra con progress bar horizontal con fill animado y porcentaje
- Steps numerados con estados visuales claros (completado ✓ / actual destacado / pendiente opaco)
- Transición slide horizontal entre pasos (no corte abrupto)
- Cada paso tiene: número, título, descripción, imagen ilustrativa, y algunos tienen CTAs a Kakobuy
- Imagen del paso con zoom suave o fade al entrar
- Botones anterior/siguiente con estados disabled claros y animación de hover

**FOOTER:**
- Minimalista, con links a Discord y Kakobuy
- "© 2026 Moon Reps. Todos los derechos reservados."
- Borde top sutil con gradiente del color acento

### 6. Performance

- Lazy loading para todas las imágenes de productos
- Code splitting por ruta
- Optimizar animaciones con will-change y transform (no animar width/height/margin)
- Preferir CSS animations sobre JS donde sea posible para animaciones simples
- Respetar prefers-reduced-motion para accesibilidad
- Imágenes con loading="lazy" y decode="async"

### 7. Responsive

- Mobile-first obligatorio
- Grilla de productos: 1 col mobile, 2 cols tablet, 3-4 cols desktop
- Navbar: hamburger menu en mobile con slide-in animado desde la derecha
- Filtros: scroll horizontal con snap en mobile, wrap en desktop
- Cards de vendedores: stack vertical en mobile, grid en desktop
- Hero: ajustar tamaño de tipografía y spacing proporcionalmente
- Tocar y probar cada breakpoint

## FLUJO DE TRABAJO

Implementá en este orden, confirmándome cada paso antes de seguir al siguiente:

1. Instalar skills + analizar el sitio actual + design system (variables, tipografía, colores, tokens)
2. Layout base + Navbar + Footer
3. Home: Hero section completa
4. Home: Filtros + Product Grid + Paginación
5. Vendedores: Filtros + Vendor Cards
6. Tutorial: Stepper + Contenido de pasos
7. Animaciones globales (scroll reveals, hover states, transiciones entre páginas)
8. Responsive final en todos los breakpoints
9. Performance audit + optimizaciones finales

No procedas al siguiente paso sin mi aprobación. Mostrá el resultado visual de cada paso.
