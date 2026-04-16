// FILE: app/login/page.tsx
// PURPOSE: Login page — two-column layout, sign-in form, Illustrative badge
// DESIGN REF: Wireframe page 5 of 13 (Log-in page)

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with real auth (NextAuth)
    document.cookie = 'auth=demo; path=/; max-age=86400';
    router.push('/home');
  }

  return (
    <div className="flex min-h-screen">
      {/* ── LEFT HALF — Blue panel ── */}
      <div className="relative hidden flex-1 items-center justify-center bg-[var(--color-blue-panel)] lg:flex">
        <h1 className="max-w-md px-12 text-center text-3xl font-bold leading-snug text-[var(--color-text-white)]">
          Delhi Air Pollution Mitigation Dashboard
        </h1>
      </div>

      {/* ── RIGHT HALF — Login form ── */}
      <div className="relative flex flex-1 items-center justify-center bg-[var(--color-surface)] px-6">
        {/* Illustrative badge */}
        <div className="absolute right-6 top-6">
          <Badge label="Illustrative" variant="slate" />
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Logo placeholder */}
          <div className="text-right">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              ProjectPro
            </span>
          </div>

          {/* Mobile-only title */}
          <h1 className="text-center text-2xl font-bold text-[var(--color-blue-panel)] lg:hidden">
            Delhi Air Pollution Mitigation Dashboard
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 pr-12 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[var(--color-success)] text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Callout note */}
          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Common log-in for all dashboards (PMO, Impact, AQI)
          </p>
        </div>
      </div>
    </div>
  );
}
