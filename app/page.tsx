// FILE: app/page.tsx
// PURPOSE: Root page — redirects to /login entry route
// DESIGN REF: Wireframe page 5 (login is the entry point)

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}
