// FILE: app/page.tsx
// PURPOSE: Root page — redirects to /home for testing, /login for production
// DESIGN REF: Wireframe page 5 (login is the entry point)

import { redirect } from 'next/navigation';

export default function RootPage() {
  // TODO: change back to '/login' when auth is re-enabled
  redirect('/home');
}
