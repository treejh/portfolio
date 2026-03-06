/** @type {import('next').NextConfig} */
const nextConfig = {
   turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
    ],
  },
  typescript: {
    // 빌드 시 타입 체크를 실행하지 않음
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
