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
        async redirects() {
          return [
            // 광고 랜딩 URL. src/app/franchise/page.tsx 의 redirect() 는 307(임시)이고
            // 쿼리스트링을 버려서, 네이버 광고 클릭에 붙는 n_media/n_query/NaPm 이
            // 랜딩 직전에 유실됐다(→ wcs.inflow() 가 광고 유입을 인식하지 못함).
            // config redirect 는 308(permanent)이며 쿼리스트링을 목적지로 넘긴다.
            // 정적 export(GitHub Pages) 빌드에서는 redirects()가 지원되지 않으므로
            // page.tsx 의 redirect() 를 폴백으로 남겨둔다.
            {
              source: "/franchise",
              destination: "/brand#franchise",
              permanent: true,
            },
          ];
        },
        async rewrites() {
          return [
            // Legacy gnuboard URLs → new App Router pages (preserves URL in browser)
            { source: "/bbs/board.php", destination: "/bbs/board" },
          ];
        },
      }),
};

export default nextConfig;
