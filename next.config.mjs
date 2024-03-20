/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Adjust the limit to 50MB
    },
    api: {
      bodyParser: {
        sizeLimit: "50mb", // Adjust the limit to 50MB
      },
    },
  },
  images: {
    domains: ["localhost", "instantbackgroundremover"],
  },
};

export default nextConfig;
