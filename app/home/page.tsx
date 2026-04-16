// FILE: app/home/page.tsx
// PURPOSE: Dashboard selection page — placeholder until full UI is built
// DESIGN REF: Wireframe page 6 of 13 (Dashboard selection)

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-grey)]">
      <div className="bg-[var(--color-blue-panel)] px-8 py-10">
        <h1 className="text-2xl font-bold text-[var(--color-text-white)]">
          Dashboard selection
        </h1>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-8 py-12">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-grey)] p-8 text-center">
          <p className="text-lg font-bold text-[var(--color-blue-link)]">PMO DASHBOARD</p>
        </div>
        <Link
          href="/dashboard/summary"
          className="rounded-lg border-2 border-[var(--color-border-blue)] bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg"
        >
          <p className="text-lg font-bold text-[var(--color-blue-link)]">IMPACT DASHBOARD</p>
        </Link>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-grey)] p-8 text-center">
          <p className="text-lg font-bold text-[var(--color-text-orange)]">AQI DASHBOARD</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">(Phase 3 - TBD)</p>
        </div>
      </div>
    </div>
  );
}
