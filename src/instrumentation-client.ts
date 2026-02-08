import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

// Initialize PostHog analytics
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
  debug: process.env.NODE_ENV === "development",
});

// Export Sentry hook for router transition tracking
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
