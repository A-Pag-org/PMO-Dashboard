// FILE: app/logout/route.ts
// PURPOSE: Logout endpoint with safe cookie clearing semantics
// DESIGN REF: Wireframe flow (logout returns user to login)

import { NextResponse } from 'next/server';

export function GET(request: Request) {
  // Keep GET side-effect free to avoid accidental logout from prefetch/crawlers.
  return NextResponse.redirect(new URL('/login', request.url));
}

export function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url), 303);
  response.cookies.set('auth', '', { path: '/', maxAge: 0 });
  return response;
}
