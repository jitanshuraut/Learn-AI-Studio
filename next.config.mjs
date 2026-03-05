/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // disable ESLint during builds to avoid parsing errors with import syntax
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
