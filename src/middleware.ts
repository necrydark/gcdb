import authConfig from "@/src/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiUploadThing,
  authRoutes,
  publicRoutes,
} from "@/src/routes";
import NextAuth from "next-auth";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isUploadRoute = apiUploadThing.includes(nextUrl.pathname);

  const isPublicRoute = publicRoutes.some((route) => {
    if (typeof route === "string") {
      return nextUrl.pathname === route;
    } else if (route instanceof RegExp) {
      return route.test(nextUrl.pathname);
    }
    return false;
  });

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isUploadRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
