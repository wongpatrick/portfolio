import type { NextConfig } from "next";

// When deployed on GitHub Pages under the default repo subpath (https://wongpatrick.github.io/portfolio),
// basePath must be set to "/portfolio" so all CSS/JS asset bundles resolve correctly.
// If you attach a custom domain (e.g. patrickwong.dev), set CUSTOM_DOMAIN=true or change basePath to "".
const basePath = process.env.CUSTOM_DOMAIN ? "" : "/portfolio";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
