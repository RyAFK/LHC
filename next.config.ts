import type { NextConfig } from "next";
import { shopifyRedirects } from "@/lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return shopifyRedirects.map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.permanent,
    }));
  },
};

export default nextConfig;
