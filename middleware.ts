// FILE: middleware.ts
// PURPOSE: Basic route protection — redirect /dashboard/* and /home to /login if no auth cookie
// DESIGN REF: Wireframe page 5 (login is the entry gate)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  if (!authCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/dashboard/:path*'],
};
