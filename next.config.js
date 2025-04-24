/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'www.google.com'
    ],
  },
  experimental: {
    // 필요한 경우 실험적 기능 활성화
    // appDir: true,
  },
};

module.exports = nextConfig;
