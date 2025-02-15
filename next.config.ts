import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    CHUTES_API_URL: process.env.CHUTES_API_URL,
    CHUTES_API_TOKEN: process.env.CHUTES_API_TOKEN,
    CHUTES_MODEL: process.env.CHUTES_MODEL
  },
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
