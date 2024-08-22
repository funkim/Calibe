/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },
    swcMinify: true,
}

export default nextConfig
