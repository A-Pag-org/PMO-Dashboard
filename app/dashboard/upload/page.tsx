// FILE: app/dashboard/upload/page.tsx
// PURPOSE: Manual data upload page — uses shared layout components, content coming in a future block
// DESIGN REF: Wireframe pages 11–12 of 13

import TopBar from '@/components/layout/TopBar';

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar title="MANUAL DATA UPLOAD SCREEN" showBackLink />

      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-lg text-[var(--color-text-muted)]">
          Upload page content (filters, editable table, upload controls) — coming soon.
        </p>
      </main>
    </div>
  );
}
