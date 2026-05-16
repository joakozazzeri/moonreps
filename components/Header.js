import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Productos',  path: '/' },
  { name: 'Vendedores', path: '/vendedores' },
  { name: 'Tutorial',   path: '/tutorial', highlight: true },
];

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  // Detecta scroll con listener pasivo (solo setea un boolean, sin costo real)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // estado inicial
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra menú mobile en cambio de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  // Bloquea scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(8, 16, 30, 0.92)'
            : 'rgba(8, 16, 30, 0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid transparent',
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10 -ml-1">
            <Image
              src="/logo.png"
              alt="Moon Reps"
              width={520}
              height={180}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide group transition-colors duration-200 flex items-center gap-2 ${
                  isActive(item.path) ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.name}
                {/* Badge "Guía" en Tutorial */}
                {item.highlight && !isActive(item.path) && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full tracking-wide"
                    style={{
                      background: 'rgba(61,123,255,0.15)',
                      border: '1px solid rgba(61,123,255,0.3)',
                      color: '#8ab4f8',
                    }}
                  >
                    Guía
                  </span>
                )}
                {/* Underline animado */}
                <span
                  className="absolute bottom-0.5 left-4 right-4 h-px bg-white"
                  style={{
                    transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                />
                {!isActive(item.path) && (
                  <span
                    className="absolute bottom-0.5 left-4 right-4 h-px bg-white/50 scale-x-0 group-hover:scale-x-100 origin-left"
                    style={{ transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  />
                )}
              </Link>
            ))}

            {/* CTA Discord en desktop */}
            <a
              href="https://discord.gg/3UW8ZAAWrG"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 btn btn-primary px-4 py-2 text-sm rounded-xl gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
              </svg>
              Discord
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-surface-800 transition-colors duration-200"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span
              className="block w-5 bg-white rounded-full"
              style={{
                height: '1.5px',
                transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
                transition: 'transform 320ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
            <span
              className="block w-5 bg-white rounded-full"
              style={{
                height: '1.5px',
                opacity: mobileOpen ? 0 : 1,
                transition: 'opacity 200ms ease',
              }}
            />
            <span
              className="block w-5 bg-white rounded-full"
              style={{
                height: '1.5px',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
                transition: 'transform 320ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: 'rgba(8, 16, 30, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 350ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-display tracking-widest transition-colors duration-200 flex items-center gap-3 ${
                isActive(item.path) ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 12vw, 4rem)',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) ${80 + i * 70}ms,
                             transform 450ms cubic-bezier(0.23, 1, 0.32, 1) ${80 + i * 70}ms`,
              }}
            >
              {item.name}
              {item.highlight && !isActive(item.path) && (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '0.7rem',
                    background: 'rgba(61,123,255,0.2)',
                    border: '1px solid rgba(61,123,255,0.35)',
                    color: '#8ab4f8',
                    letterSpacing: '0.05em',
                  }}
                >
                  Guía
                </span>
              )}
            </Link>
          ))}

          {/* CTAs mobile */}
          <div
            className="flex flex-col items-center gap-3 mt-6"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 310ms,
                           transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 310ms`,
            }}
          >
            <a
              href="https://ikako.vip/r/moonreps"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-8 py-3 text-sm rounded-xl"
            >
              Registro Kakobuy + $410 Cupones
            </a>
            <a
              href="https://discord.gg/3UW8ZAAWrG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Únete al Discord
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
