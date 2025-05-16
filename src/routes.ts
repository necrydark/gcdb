//TODO: Pass character slug through

/**
 * List of public routes
 * @type {(string | RegExp)[]}
 */
// export const privateRoutes = ["/profile/(.*)"];
export const publicRoutes = [
  "/",
  "/cooking",
  "/characters",
  "/relics",
  "/status_effect",
  "/contact",
  "/gear",
  "/resources",
  "/resources/(*)",
  /^\/characters\/[a-zA-Z0-9_-]+$/,
  "/auth/confirm-email",
  /^\/profile\/[a-zA-Z0-9_-]+$/,
];

/**
 * List of auth routes
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Prefix for API Authentication Routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * API Route for uploading images for user profiles
 * @type {string}
 */
export const apiUploadThing = "/api/uploadthing";

/**
 * Default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
