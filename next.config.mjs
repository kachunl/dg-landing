// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    ...(process.env.NODE_ENV === "production" && {
        basePath: "/dg-landing",
        assetPrefix: "/dg-landing/",
    }),
};

export default nextConfig;