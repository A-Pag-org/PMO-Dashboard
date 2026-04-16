// FILE: app/dashboard/summary/page.tsx
// PURPOSE: Summary page — fits entirely within viewport, no scrolling
// DESIGN REF: Wireframe pages 7–8 of 13 (Summary Page 1/2 + 2/2)

import TopBar from '@/components/layout/TopBar';
import { INITIATIVES } from '@/lib/constants';
import SummaryContent from './SummaryContent';

export default function SummaryPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <TopBar activePage="summary" />

      <div className="shrink-0 bg-[var(--color-blue-header)] px-6 py-2">
        <h1 className="text-base font-bold text-[var(--color-text-white)]">
          Overall Delhi-NCR Performance
        </h1>
      </div>

      <SummaryContent initiatives={INITIATIVES} />
    </div>
  );
}
