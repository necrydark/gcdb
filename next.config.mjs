import MillionLint from "@million/lint";
import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "gcdatabase.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "avatar.vercel.sh",
                port: ""
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                port: ""
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "3duibobjm6.ufs.sh",
                port: ""
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: ""
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                port: ""
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://eu-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://eu.i.posthog.com/:path*",
            },
            {
                source: "/ingest/flags",
                destination: "https://eu.i.posthog.com/flags",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
};


export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "gcwiki",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);

// export default MillionLint.next({
//     enabled: true,
//     rsc: true
// })(nextConfig);