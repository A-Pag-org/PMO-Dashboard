// FILE: app/dashboard/summary/page.tsx
// PURPOSE: Summary page — placeholder until full UI is built
// DESIGN REF: Wireframe pages 7–8 of 13

import Link from 'next/link';

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between bg-[var(--color-navy)] px-6 py-3">
        <Link href="/home" className="text-sm text-[var(--color-text-white)] hover:underline">
          Home
        </Link>
        <span className="rounded-full bg-[var(--color-navy-mid)] px-4 py-1 text-sm font-semibold text-[var(--color-text-white)]">
          SUMMARY PAGE
        </span>
        <div className="flex gap-3">
          <span className="rounded bg-[var(--color-navy-mid)] px-3 py-1 text-sm text-[var(--color-text-white)]">
            PMO Dashboard
          </span>
          <span className="rounded bg-[var(--color-navy-mid)] px-3 py-1 text-sm text-[var(--color-text-white)]">
            AQI Dashboard
          </span>
        </div>
      </div>
      <div className="bg-[var(--color-blue-header)] px-6 py-4">
        <h1 className="text-xl font-bold text-[var(--color-text-white)]">
          Overall Delhi-NCR Performance
        </h1>
      </div>
      <div className="p-8 text-center text-[var(--color-text-muted)]">
        <p className="text-lg">Summary page content will be built in upcoming blocks.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/dashboard/detail"
            className="rounded bg-[var(--color-navy)] px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Detailed view
          </Link>
          <Link
            href="/dashboard/upload"
            className="rounded bg-[var(--color-navy)] px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Enter manual data field
          </Link>
        </div>
      </div>
    </div>
  );
}
