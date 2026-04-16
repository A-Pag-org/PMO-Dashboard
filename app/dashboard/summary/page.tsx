// FILE: app/dashboard/summary/page.tsx
// PURPOSE: Summary page — uses shared layout components, content placeholder for Block 3
// DESIGN REF: Wireframe pages 7–8 of 13

import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';

export default function SummaryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar title="SUMMARY PAGE" />

      <div className="bg-[var(--color-blue-header)] px-6 py-4">
        <h1 className="text-xl font-bold text-[var(--color-text-white)]">
          Overall Delhi-NCR Performance
        </h1>
      </div>

      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-lg text-[var(--color-text-muted)]">
          Initiative cards, map, and table will be built in Block 3.
        </p>
      </main>

      <BottomBar showDetailedView showManualData />
    </div>
  );
}
