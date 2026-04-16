// FILE: app/dashboard/upload/page.tsx
// PURPOSE: Manual data upload screen — filters, action buttons, editable table, excel preview
// DESIGN REF: Wireframe pages 11–12 of 13

import TopBar from '@/components/layout/TopBar';
import UploadContent from './UploadContent';

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar activePage="upload" />
      <UploadContent />
    </div>
  );
}
