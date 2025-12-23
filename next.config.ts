import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
// export default withMDX(nextConfig);
export default nextConfig;
