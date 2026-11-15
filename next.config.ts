import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // www -> apex. Matches only the exact host www.codeandmotions.com, so the
        // apex, localhost and any preview host are never redirected (no loop).
        // The destination is a literal absolute URL: no internal port can leak
        // into the Location header. 308 = permanent; path and query are preserved.
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.codeandmotions.com" }],
        destination: "https://codeandmotions.com/:path*",
        permanent: true,
      },
      {
        // The Short/Reels/TikTok page was folded into Social Media Videos.
        // Permanent (308) so search engines move to the new address.
        source: "/services/video-animation/short-reels-tiktok-videos",
        destination: "/services/video-animation/social-media-videos",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Installers in /public/downloads: always saved as a file, never sniffed or indexed.
        source: "/downloads/:path*",
        headers: [
          { key: "Content-Disposition", value: "attachment" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
