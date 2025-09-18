import type { NextConfig } from "next";
import { env } from "./src/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": `${__dirname}/src`,
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
