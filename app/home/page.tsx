// FILE: app/home/page.tsx
// PURPOSE: Dashboard selection page — A-PAG branded header + 3-column card grid
// DESIGN REF: Wireframe page 6 of 13 (Dashboard selection)

import Link from 'next/link';
import { Home } from 'lucide-react';
import { DASHBOARD_OPTIONS } from '@/lib/constants';
import DashboardCard from '@/components/ui/DashboardCard';

const hrefMap: Record<string, string> = {
  impact: '/dashboard/summary',
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface-grey)]">
      {/* ── A-PAG brand strip ── */}
      <div className="flex items-center justify-between bg-[var(--color-ink)] px-8 py-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--color-accent)]">
            <Home className="h-4 w-4 text-[var(--color-ink)]" />
          </span>
        </div>
        <Link
          href="/login"
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          Sign out
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-navy)] px-8 pb-12 pt-8">
        <h1 className="text-2xl font-bold text-white">
          Dashboard selection
        </h1>
        <p className="mt-1 text-sm text-[var(--color-accent)]">
          Choose a dashboard to continue
        </p>
      </header>

      {/* ── Card grid ── */}
      <main className="-mt-4 flex flex-1 justify-center px-8 pb-16">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {DASHBOARD_OPTIONS.map((d) => (
            <DashboardCard
              key={d.slug}
              dashboard={d}
              href={hrefMap[d.slug]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
