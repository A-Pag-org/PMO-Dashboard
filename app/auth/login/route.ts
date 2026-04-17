// FILE: app/auth/login/route.ts
// PURPOSE: Set auth cookie on server and redirect to home
// DESIGN REF: Wireframe auth flow (login -> home)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/home', request.url));
  response.cookies.set('auth', 'demo', {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    httpOnly: false,
  });
  return response;
}
