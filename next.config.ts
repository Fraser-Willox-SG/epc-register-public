import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@scottish-government/designsystem-react"],
  serverExternalPackages: ["playwright"],
};

export default nextConfig;
