/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // روی Vercel از خروجی پیش‌فرض استفاده می‌شود؛ standalone فقط برای لیارا
  ...(process.env.LIARA_PLATFORM || process.env.PLATFORM === "liara"
    ? { output: "standalone" }
    : {}),
  experimental: {
    serverComponentsExternalPackages: ["sqlite3"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/frames3/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
