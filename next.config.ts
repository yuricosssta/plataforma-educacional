import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'static.todamateria.com.br' },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     optimizeCss: true,
//   },
// };

// export default nextConfig;


