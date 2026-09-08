import type { NextConfig } from "next";

// When hosted on default GitHub Pages (https://wongpatrick.github.io/portfolio/),
// basePath must be set to "/portfolio" so all CSS/JS assets resolve under the subpath.
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
