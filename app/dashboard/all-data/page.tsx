// FILE: app/dashboard/all-data/page.tsx
// PURPOSE: All-data view page shell with top navigation
// DESIGN REF: Wireframe page 10 of 13 (ALL DATA VIEW)

import TopBar from '@/components/layout/TopBar';
import { INITIATIVES } from '@/lib/constants';
import AllDataContent from './AllDataContent';

export default function AllDataPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar activePage="all-data" />
      <AllDataContent initiatives={INITIATIVES} />
    </div>
  );
}
