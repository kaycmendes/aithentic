import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //tailwind css
  css: ['globals.css'],
  //add the tailwind config
  tailwindConfig: './tailwind.config.js',
  //add the postcss config
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
};

export default nextConfig;
