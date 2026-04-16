// FILE: components/layout/BottomBar.tsx
// PURPOSE: Bottom action bar with "Detailed view" and "Enter manual data field" buttons
// DESIGN REF: Wireframe pages 7–8 (summary bottom), page 10 (detail bottom)

import Link from 'next/link';
import { ChevronDown, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomBarProps {
  showDetailedView?: boolean;
  showManualData?: boolean;
  className?: string;
}

export default function BottomBar({
  showDetailedView = true,
  showManualData = true,
  className,
}: BottomBarProps) {
  return (
    <footer
      className={cn(
        'flex items-center justify-between border-t border-[var(--color-border)] bg-white px-6 py-4',
        className,
      )}
    >
      {showDetailedView ? (
        <Link
          href="/dashboard/detail"
          className={cn(
            'flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-navy)] px-5 py-2 text-sm font-medium text-[var(--color-text-white)] transition-colors',
            'hover:bg-[var(--color-navy-mid)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
          )}
        >
          <ArrowRight className="h-4 w-4" />
          <span>Detailed view</span>
          <ChevronDown className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}

      {showManualData && (
        <Link
          href="/dashboard/upload"
          className={cn(
            'flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-navy)] px-5 py-2 text-sm font-medium text-[var(--color-text-white)] transition-colors',
            'hover:bg-[var(--color-navy-mid)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
          )}
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Enter manual data field</span>
          <ChevronDown className="h-4 w-4" />
        </Link>
      )}
    </footer>
  );
}
