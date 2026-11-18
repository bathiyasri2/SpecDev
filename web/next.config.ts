import type { NextConfig } from "next";

const isProjectPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  ...(isProjectPages
    ? {
        basePath: "/SpecDev",
        assetPrefix: "/SpecDev/",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;