// FILE: components/layout/TopBar.tsx
// PURPOSE: Persistent top bar with back link, page title badge, and dashboard switchers
// DESIGN REF: Wireframe pages 7–11 (top bar present on all dashboard pages)

import Link from 'next/link';
import { Home } from 'lucide-react';
import DashboardSwitcher from './DashboardSwitcher';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title: string;
  showBackLink?: boolean;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export default function TopBar({
  title,
  showBackLink = false,
  backHref = '/dashboard/summary',
  backLabel = 'Back to Summary page',
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between bg-[var(--color-navy)] px-6 py-3',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBackLink ? (
          <Link
            href={backHref}
            className={cn(
              'flex min-h-[44px] items-center gap-2 text-sm text-[var(--color-text-white)] transition-colors hover:text-[var(--color-blue-light)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
            )}
          >
            <Home className="h-4 w-4" />
            <span>&larr; {backLabel}</span>
          </Link>
        ) : (
          <Link
            href="/home"
            className={cn(
              'flex min-h-[44px] items-center text-[var(--color-text-white)] transition-colors hover:text-[var(--color-blue-light)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
            )}
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
        )}
      </div>

      <span className="rounded-full bg-[var(--color-navy-mid)] px-5 py-1.5 text-sm font-semibold text-[var(--color-text-white)]">
        {title}
      </span>

      <DashboardSwitcher />
    </header>
  );
}
