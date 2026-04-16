// FILE: middleware.ts
// PURPOSE: Basic route protection — currently disabled for testing
// DESIGN REF: Wireframe page 5 (login is the entry gate)
// TODO: Re-enable auth check before production deployment

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Auth check disabled during development/testing.
  // Uncomment the block below to re-enable:
  //
  // const authCookie = request.cookies.get('auth');
  // if (!authCookie) {
  //   const loginUrl = new URL('/login', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/dashboard/:path*'],
};
