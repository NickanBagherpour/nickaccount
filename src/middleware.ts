import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from '@/auth';

import { ROUTES } from './constants';

const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.REPORT_1, ROUTES.REPORT_2];

// Function to check if a URL has the same origin as the request
function isSameOrigin(request: NextRequest, url: string | null): boolean {
  if (!url) return false;
  try {
    return new URL(url).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  // Redirect unauthenticated users trying to access protected routes
  if (!session?.user && isProtected) {
    const loginUrl = new URL(ROUTES.HOME, request.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth page
  if (session?.user && isAuthPage) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    const redirectUrl = isSameOrigin(request, callbackUrl) && callbackUrl ? callbackUrl : ROUTES.HOME;

    // Ensure redirectUrl is always a string
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
