/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/',
                permanent: true,
            },
            {
                source: '/admin/:path*',
                destination: '/:path*',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Allow all domains
            },
            {
                protocol: "http",
                hostname: "**", // Allow all domains for http
            },
        ],
    },
 
    // reactStrictMode: false,
};

export default nextConfig;
