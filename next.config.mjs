/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    api: {
      bodyParser: {
        sizeLimit: "20mb",
      },
    },
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
