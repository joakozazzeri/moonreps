/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Deshabilitar ESLint durante el build para evitar errores
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photo.yupoo.com',
        port: '',
        pathname: '/**',
      },
      // AÑADIDO: Agregamos el dominio de Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Ya no necesitamos SVG, pero lo dejamos por si acaso
    dangerouslyAllowSVG: true, 
    // Deshabilitar optimización para ahorrar ancho de banda de Vercel
    unoptimized: true,
  },
}

module.exports = nextConfig
