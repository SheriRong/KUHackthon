/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    NEXT_PUBLIC_PINATA_API_SECRET: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
}

module.exports = nextConfig 