/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/QUIT" : "",
  assetPrefix: isProd ? "/QUIT/" : "",
}

export default nextConfig
