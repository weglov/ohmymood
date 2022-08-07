const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    dest: "public",
  },
});

module.exports = nextConfig;
