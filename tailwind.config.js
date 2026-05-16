module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base oscura con tinte navy — cohesión total con el logo #002365
        background: '#08101e',
        surface: {
          950: '#0a1220',
          900: '#0f1a2e',
          800: '#18253d',
          700: '#243050',
          600: '#2e3d63',
          500: '#3a4d7a',
          400: '#4a6096',
          300: '#6b84b8',
        },

        // Acento principal: navy brand
        accent: {
          DEFAULT: '#002365',   // brand navy — botones sólidos, badges
          light:   '#1A4FBF',   // navy más claro — bordes visibles sobre dark
          bright:  '#3D7BFF',   // azul eléctrico — glows, underlines activos
          glow:    'rgba(61, 123, 255, 0.25)',
        },

        // Legacy "primary" → mapeado a navy para backward compat
        primary: {
          400: '#4A7DE8',
          500: '#002365',
          600: '#001845',
        },

        // Plataformas
        discord: '#5865F2',
        kakobuy: '#FF6B35',
      },

      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'ui-monospace', 'monospace'],
      },

      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1.25rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },

      transitionTimingFunction: {
        'out-expo':    'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-expo': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'spring':      'cubic-bezier(0.32, 0.72, 0, 1)',
      },

      transitionDuration: {
        DEFAULT: '200ms',
        fast:    '150ms',
        slow:    '400ms',
        page:    '600ms',
      },

      boxShadow: {
        'accent-sm': '0 0 12px rgba(61, 123, 255, 0.2)',
        'accent':    '0 0 24px rgba(61, 123, 255, 0.3)',
        'accent-lg': '0 0 48px rgba(61, 123, 255, 0.45)',
        'navy':      '0 4px 20px rgba(0, 35, 101, 0.6)',
        'surface':   '0 4px 24px rgba(0, 0, 0, 0.5)',
        'surface-lg':'0 8px 48px rgba(0, 0, 0, 0.7)',
        'inset-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },

      animation: {
        'shimmer':    'shimmer 1.8s linear infinite',
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-in':    'fadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) both',
        'slide-up':   'slideUp 0.3s cubic-bezier(0.23, 1, 0.32, 1) both',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.23, 1, 0.32, 1) both',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'badge-in':   'badgeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.4s both',
      },

      keyframes: {
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(61, 123, 255, 0.25)' },
          '50%':      { boxShadow: '0 0 28px rgba(61, 123, 255, 0.55)' },
        },
        badgeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
