/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Qualities used by the gallery UI (grid + lightbox).
    qualities: [75, 80, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
