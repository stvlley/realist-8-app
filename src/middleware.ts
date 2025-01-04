// /Users/stvlley/Desktop/realist-8-app/src/middleware.ts

import { auth } from '@/../auth' // Adjust the path based on your project structure
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '../routes';
import { NextResponse } from 'next/server';

export default auth(async (req) => { // Added 'ctx' parameter and made function async
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Allow API auth routes to proceed without modification
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // If the user is logged in and tries to access an auth route (e.g., login), redirect them
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If not logged in, allow access to the auth route
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    // If the user is not logged in and the route is not public, redirect to login
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // For all other cases, proceed with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Any .svg files
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.svg$).*)',
  ],
};