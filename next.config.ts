import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'richardnyande.co.uk' }],
        destination: 'https://www.richardnyande.co.uk/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
