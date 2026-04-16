// FILE: app/dashboard/upload/page.tsx
// PURPOSE: Manual data upload page — placeholder until full UI is built
// DESIGN REF: Wireframe pages 11–12 of 13

import Link from 'next/link';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between bg-[var(--color-navy)] px-6 py-3">
        <Link
          href="/dashboard/summary"
          className="text-sm text-[var(--color-text-white)] hover:underline"
        >
          &larr; Back to Summary page
        </Link>
        <span className="rounded-full bg-[var(--color-navy-mid)] px-4 py-1 text-sm font-semibold text-[var(--color-text-white)]">
          MANUAL DATA UPLOAD SCREEN
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
      <div className="p-8 text-center text-[var(--color-text-muted)]">
        <p className="text-lg">Upload page content will be built in upcoming blocks.</p>
      </div>
    </div>
  );
}
