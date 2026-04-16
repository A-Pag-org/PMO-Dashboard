// FILE: app/home/page.tsx
// PURPOSE: Dashboard selection page — blue header + 3-column card grid
// DESIGN REF: Wireframe page 6 of 13 (Dashboard selection)

import { DASHBOARD_OPTIONS } from '@/lib/constants';
import DashboardCard from '@/components/ui/DashboardCard';

const hrefMap: Record<string, string> = {
  impact: '/dashboard/summary',
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface-grey)]">
      {/* ── Blue gradient header ── */}
      <header className="bg-gradient-to-br from-[var(--color-blue-panel)] to-[var(--color-blue-header)] px-8 pb-12 pt-10">
        <h1 className="text-2xl font-bold text-[var(--color-text-white)]">
          Dashboard selection
        </h1>
        <p className="mt-1 text-sm text-[var(--color-blue-light)] opacity-80">
          Choose a dashboard to continue
        </p>
      </header>

      {/* ── Card grid — overlaps the header ── */}
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
