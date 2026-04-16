// FILE: app/dashboard/detail/page.tsx
// PURPOSE: Detailed view page — uses shared layout components, content coming in a future block
// DESIGN REF: Wireframe pages 9–10 of 13

import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';

export default function DetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar title="DETAILED VIEW" showBackLink />

      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-lg text-[var(--color-text-muted)]">
          Detailed view content (filters, map, metrics, data tables) — coming soon.
        </p>
      </main>

      <BottomBar showDetailedView={false} showManualData />
    </div>
  );
}
