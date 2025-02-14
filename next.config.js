/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //add tailwind css
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

module.exports = nextConfig; 