/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    // Configuración para evitar que Vercel optimice imágenes de Cloudinary
    unoptimized: false,
    // Configurar loader personalizado para Cloudinary
    loader: 'default',
    // Configurar dominios que no deben ser optimizados
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
