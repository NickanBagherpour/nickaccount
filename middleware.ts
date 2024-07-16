// export { auth as middleware } from "@/auth";

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from '@/auth';
import { ROUTES } from '@/constants';

const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.REPORT_1, ROUTES.REPORT_2];


export async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL(ROUTES.AUTH, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect authenticated users away from auth page
  if (session && request.nextUrl.pathname === ROUTES.AUTH) {
    const absoluteURL = new URL(ROUTES.DASHBOARD, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
