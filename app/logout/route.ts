// FILE: app/logout/route.ts
// PURPOSE: Clear auth cookie and redirect to login
// DESIGN REF: Wireframe flow (logout returns user to login)

import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.set('auth', '', { path: '/', maxAge: 0 });
  return response;
}
