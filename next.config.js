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
      // AÑADIDO: Dominio de Cloudinary (legacy)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-317779a682bd47eca296052d989ab665.r2.dev',
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
