// FILE: middleware.ts
// PURPOSE: Route protection for authenticated dashboard access
// DESIGN REF: Wireframe page 5 (login is the entry gate)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth')?.value;
  const hasAuth = authCookie === 'demo';

  const isProtectedRoute =
    pathname === '/home' || pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';

  if (isProtectedRoute && !hasAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && hasAuth) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/home';
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/home', '/dashboard/:path*'],
};
