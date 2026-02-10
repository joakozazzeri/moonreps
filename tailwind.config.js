module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Elegance Palette
        background: '#09090b', // zinc-950
        surface: {
          900: '#18181b', // zinc-900
          800: '#27272a', // zinc-800
          700: '#3f3f46', // zinc-700
          600: '#52525b', // zinc-600
        },
        primary: {
          400: '#c084fc', // purple-400
          500: '#a855f7', // purple-500
          600: '#9333ea', // purple-600
        },
        accent: {
          green: '#22c55e', // green-500
          blue: '#5865F2', // discord blur
          amber: '#f59e0b', // amber-500
          rose: '#f43f5e', // rose-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionDuration: {
        'DEFAULT': '250ms',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}