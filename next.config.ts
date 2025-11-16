
// import { withPayload } from "@payloadcms/next/withPayload";
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default withPayload(withPayload(withPayload(nextConfig)));

import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ★ This fixes workspace root + lock conflict
  },
};

export default withPayload(nextConfig);
