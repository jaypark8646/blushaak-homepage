import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  ...(isGithubActions && { basePath: "/blushaak-homepage" }),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  ...(isGithubActions
    ? {}
    : {
        async rewrites() {
          return [
            // Legacy gnuboard URLs → new App Router pages (preserves URL in browser)
            { source: "/bbs/board.php", destination: "/bbs/board" },
          ];
        },
      }),
};

export default nextConfig;
