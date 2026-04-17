// FILE: app/auth/login/route.ts
// PURPOSE: Set auth cookie on server and redirect to home
// DESIGN REF: Wireframe auth flow (login -> home)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: replace with real auth validation
  // Consume request body to support future credential checks.
  try {
    await request.json();
  } catch {
    // Ignore parse errors in demo mode.
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('auth', 'demo', {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    httpOnly: true,
  });
  return response;
}
