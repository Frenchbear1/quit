/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  basePath: isProd && !isVercel ? "/QUIT" : "",
  assetPrefix: isProd && !isVercel ? "/QUIT/" : "",
}

export default nextConfig
