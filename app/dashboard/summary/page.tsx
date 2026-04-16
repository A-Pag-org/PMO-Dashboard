// FILE: app/dashboard/summary/page.tsx
// PURPOSE: Summary page — initiative cards (left), map/table toggle (right), bottom bar
// DESIGN REF: Wireframe pages 7–8 of 13 (Summary Page 1/2 + 2/2)

import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';
import { INITIATIVES } from '@/lib/constants';
import SummaryContent from './SummaryContent';

export default function SummaryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar title="SUMMARY PAGE" />

      <div className="bg-[var(--color-blue-header)] px-6 py-4">
        <h1 className="text-xl font-bold text-[var(--color-text-white)]">
          Overall Delhi-NCR Performance
        </h1>
      </div>

      <SummaryContent initiatives={INITIATIVES} />

      <BottomBar showDetailedView showManualData />
    </div>
  );
}
