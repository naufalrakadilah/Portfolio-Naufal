import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Default Next.js 75 bikin teks di mockup agak blur; semua gambar dinaikkan ke 90.
    qualities: [90],
  },
};

export default nextConfig;
