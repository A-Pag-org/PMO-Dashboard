// FILE: app/dashboard/upload/page.tsx
// PURPOSE: Manual data upload page — uses shared layout components, content placeholder for Block 5
// DESIGN REF: Wireframe pages 11–12 of 13

import TopBar from '@/components/layout/TopBar';

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar title="MANUAL DATA UPLOAD SCREEN" showBackLink />

      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-lg text-[var(--color-text-muted)]">
          Filters, editable table, and upload controls will be built in Block 5.
        </p>
      </main>
    </div>
  );
}
