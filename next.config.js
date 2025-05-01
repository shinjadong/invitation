/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'www.google.com',
      'bhmrakolqc17mtsl.public.blob.vercel-storage.com',
      'imagedelivery.net'
    ],
  },
  experimental: {
    // 필요한 경우 실험적 기능 활성화
    // appDir: true,
  },
  eslint: {
    // Warning: 배포 시 ESLint 검사를 건너뜁니다
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: 배포 시 TypeScript 타입 검사를 건너뜁니다
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
