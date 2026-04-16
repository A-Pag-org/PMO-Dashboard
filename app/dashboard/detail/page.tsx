// FILE: app/dashboard/detail/page.tsx
// PURPOSE: Detailed view — filters, map + metrics (top), dual data tables (bottom)
// DESIGN REF: Wireframe pages 9–10 of 13 (Detailed View 1/2 + 2/2)

import TopBar from '@/components/layout/TopBar';
import { INITIATIVES } from '@/lib/constants';
import DetailContent from './DetailContent';

export default function DetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar activePage="detail" />
      <DetailContent initiatives={INITIATIVES} />
    </div>
  );
}
